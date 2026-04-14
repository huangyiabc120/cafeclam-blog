import Link from 'next/link'
import { getSortedWorksData } from '../../lib/works'
import styles from './page.module.css'

export const metadata = {
  title: '学员作品',
  description: '学员作品展示',
}

function getEmbedUrl(url) {
  if (!url) return null
  if (url.includes('bilibili.com')) {
    const bv = url.split('/').pop().split('?')[0]
    return `https://player.bilibili.com/player.html?bvid=${bv}`
  }
  if (url.includes('youtube.com/watch')) {
    const v = url.split('v=')[1]?.split('&')[0]
    return `https://www.youtube.com/embed/${v}`
  }
  if (url.includes('youtu.be/')) {
    const v = url.split('youtu.be/')[1]?.split('?')[0]
    return `https://www.youtube.com/embed/${v}`
  }
  if (url.includes('youtube.com/embed/')) return url
  return null
}

export default function WorksPage() {
  const works = getSortedWorksData()

  return (
    <>
      <header className="site-header hero-animate">
        <span className="header-eyebrow">🎬 STUDENT WORKS</span>
        <h1 className="header-title">学员作品</h1>
        <p className="header-sub">记录每一位学员的成长与创作。</p>
        <div className="header-divider" />
      </header>

      <main className="site-main">
        <div className={styles.container}>
          {works.length === 0 ? (
            <div className={styles.empty}>
              <p>暂无作品</p>
              <p>学员作品即将上线，敬请期待！</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {works.map(work => {
                const embedUrl = getEmbedUrl(work.videoUrl)
                return (
                  <article key={work.slug} className={styles.card}>
                    <div className={styles.video}>
                      {embedUrl ? (
                        <iframe
                          src={embedUrl}
                          scrolling="no"
                          allowFullScreen
                          title={work.title}
                        />
                      ) : (
                        <div className={styles.noVideo}>暂无视频</div>
                      )}
                    </div>
                    <div className={styles.info}>
                      <span className={styles.tag}>{work.category || '作品'}</span>
                      <h2 className={styles.title}>{work.title}</h2>
                      {work.student && (
                        <p className={styles.student}>学员：{work.student}</p>
                      )}
                      {work.description && (
                        <p className={styles.desc}>{work.description}</p>
                      )}
                      <div className={styles.meta}>{work.dateStr}</div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
