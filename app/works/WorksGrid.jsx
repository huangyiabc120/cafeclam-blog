'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'

export default function WorksGrid({ works }) {
  const [visibleCards, setVisibleCards] = useState(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, entry.target.dataset.slug]))
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    document.querySelectorAll('[data-slug]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  if (works.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🎥</div>
        <p>暂无作品</p>
        <span>学员作品即将上线，敬请期待！</span>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {works.map((work, index) => (
        <article
          key={work.slug}
          data-slug={work.slug}
          className={styles.card}
          style={{
            opacity: visibleCards.has(work.slug) ? 1 : 0,
            transform: visibleCards.has(work.slug) ? 'translateY(0)' : 'translateY(32px)',
            transition: `opacity 0.65s ease ${index * 0.08}s, transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.08}s, box-shadow 0.35s, border-color 0.3s`,
          }}
        >
          <div className={styles.video}>
            {work.videoUrl ? (
              <>
                <VideoPlayer url={work.videoUrl} title={work.title} />
                <div className={styles.videoOverlay}>
                  <div className={styles.videoOverlayIcon}>▶</div>
                </div>
              </>
            ) : (
              <div className={styles.noVideo}>
                <div className={styles.noVideoIcon}>🎬</div>
                <span>暂无视频</span>
              </div>
            )}
          </div>

          <div className={styles.info}>
            <div className={styles.infoTop}>
              <span className={styles.tag}>{work.category || '视频作品'}</span>
            </div>
            <h2 className={styles.title}>{work.title}</h2>
            {work.student && (
              <p className={styles.student}>{work.student}</p>
            )}
            {work.description && (
              <p className={styles.desc}>{work.description}</p>
            )}
            <div className={styles.meta}>
              <span className={styles.metaDate}>{work.dateStr}</span>
              <span className={styles.watchBtn}>▶ 观看作品</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

function VideoPlayer({ url, title }) {
  const isEmbed = url.includes('bilibili.com') || url.includes('youtube.com') || url.includes('youtu.be')
  const isDirect = url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov')

  if (isEmbed) {
    let src = url
    if (url.includes('bilibili.com')) {
      const bv = url.split('/').pop().split('?')[0]
      src = `https://player.bilibili.com/player.html?bvid=${bv}`
    } else if (url.includes('youtube.com/watch')) {
      const v = url.split('v=')[1]?.split('&')[0]
      src = `https://www.youtube.com/embed/${v}`
    } else if (url.includes('youtu.be/')) {
      const v = url.split('youtu.be/')[1]?.split('?')[0]
      src = `https://www.youtube.com/embed/${v}`
    }
    return <iframe src={src} scrolling="no" allowFullScreen title={title} />
  }

  if (isDirect) {
    return (
      <video controls>
        <source src={url} />
        您的浏览器不支持视频播放。
      </video>
    )
  }

  return null
}
