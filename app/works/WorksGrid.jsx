'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
        <Link
          key={work.slug}
          href={`/works/${work.slug}`}
          className={styles.cardLink}
          data-slug={work.slug}
          style={{
            opacity: visibleCards.has(work.slug) ? 1 : 0,
            transform: visibleCards.has(work.slug) ? 'translateY(0)' : 'translateY(32px)',
            transition: `opacity 0.65s ease ${index * 0.08}s, transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.08}s, box-shadow 0.35s, border-color 0.3s`,
          }}
        >
          <article className={styles.card}>
            {/* ===== POSTER / COVER ===== */}
            <div className={styles.poster}>
              {/* CSS-generated cinematic poster */}
              <div className={styles.posterBg} style={{ '--hue': index * 47 + 15 } as React.CSSProperties}>
                <div className={styles.posterOverlay} />
                <div className={styles.posterContent}>
                  <span className={styles.posterEyebrow}>{work.category || '视频作品'}</span>
                  <h2 className={styles.posterTitle}>{work.title}</h2>
                  {work.student && (
                    <span className={styles.posterStudent}>
                      <span className={styles.posterStudentDot} />
                      {work.student}
                    </span>
                  )}
                </div>
                {/* Film frame corners */}
                <div className={`${styles.frameCorner} ${styles.tl}`} />
                <div className={`${styles.frameCorner} ${styles.tr}`} />
                <div className={`${styles.frameCorner} ${styles.bl}`} />
                <div className={`${styles.frameCorner} ${styles.br}`} />
              </div>

              {/* Play button */}
              <div className={styles.playBtn}>
                <div className={styles.playIcon}>▶</div>
                <span className={styles.playText}>观看作品</span>
              </div>
            </div>

            {/* ===== CARD INFO ===== */}
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
                <span className={styles.watchBtn}>▶ 播放</span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}
