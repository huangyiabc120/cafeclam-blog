import { getSortedPostsData } from '../lib/posts'
import { getSortedWorksData } from '../lib/works'
import HomeClient from '../components/HomeClient'
import Sidebar from '../components/Sidebar'
import Link from 'next/link'
import styles from './home-works.module.css'

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

export default function Home() {
  const allPosts = getSortedPostsData()
  const recentWorks = getSortedWorksData().slice(0, 3)

  // 收集所有标签
  const tagSet = new Set()
  allPosts.forEach(post => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach(tag => tagSet.add(tag))
    }
  })
  const allTags = Array.from(tagSet)

  return (
    <>
      {/* 顶部横幅 */}
      <div className="home-banner">
        <img src="/images/header.jpg" alt="博客横幅" className="home-banner-img" />
      </div>

      <header className="site-header hero-animate">
        <span className="header-eyebrow">☕ CAFE CLAM · EST. 2026</span>
        <h1 className="header-title">
          记录生活<br /><em>让思考留下痕迹</em>
        </h1>
        <p className="header-sub">
          写我所想，记我所见。咖啡是日常的仪式，蛤蜊是大海留下的坚硬礼物。
          一个温暖，一个沉默，都是真实。
        </p>
        <div className="header-divider" />
      </header>

      {/* 学员作品专区 */}
      {recentWorks.length > 0 && (
        <section className={styles.worksSection}>
          <div className={styles.worksHeader}>
            <div className={styles.worksTitle}>
              <span className={styles.worksEyebrow}>🎬 学员作品</span>
              <h2>优秀作品展示</h2>
            </div>
            <Link href="/works" className={styles.worksMore}>
              查看全部 →
            </Link>
          </div>
          <div className={styles.worksGrid}>
            {recentWorks.map(work => {
              const embedUrl = getEmbedUrl(work.videoUrl)
              return (
                <article key={work.slug} className={styles.workCard}>
                  <Link href="/works" className={styles.workThumb}>
                    {embedUrl ? (
                      <iframe
                        src={embedUrl}
                        scrolling="no"
                        allowFullScreen
                        title={work.title}
                      />
                    ) : (
                      <div className={styles.workNoVideo}>暂无视频</div>
                    )}
                  </Link>
                  <div className={styles.workInfo}>
                    <h3 className={styles.workTitle}>
                      <Link href="/works">{work.title}</Link>
                    </h3>
                    {work.student && (
                      <p className={styles.workStudent}>{work.student}</p>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      )}

      <main className="site-main home-layout">
        <div className="home-content">
          <HomeClient posts={allPosts} />
        </div>
        <Sidebar posts={allPosts} allTags={allTags} />
      </main>
    </>
  )
}
