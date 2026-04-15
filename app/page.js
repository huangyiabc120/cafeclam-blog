import { getSortedPostsData } from '../lib/posts'
import { getSortedWorksData } from '../lib/works'
import HomeClient from '../components/HomeClient'
import Sidebar from '../components/Sidebar'
import Link from 'next/link'
import styles from './home-works.module.css'

export default function Home() {
  const allPosts = getSortedPostsData()
  const works = getSortedWorksData()
  const featuredWork = works[0]

  const tagSet = new Set()
  allPosts.forEach(post => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach(tag => tagSet.add(tag))
    }
  })
  const allTags = Array.from(tagSet)

  return (
    <>
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

      {/* 学员作品入口 — 一张大封面 */}
      {featuredWork && (
        <section className={styles.worksSection}>
          <div className={styles.worksHeader}>
            <div className={styles.worksTitle}>
              <span className={styles.worksEyebrow}>🎬 学员作品</span>
              <h2>往期作品</h2>
            </div>
          </div>

          <Link href="/works" className={styles.featuredCard}>
            <div className={styles.featuredThumb}>
              {featuredWork.coverImage ? (
                <img
                  src={featuredWork.coverImage}
                  alt={featuredWork.title}
                  className={styles.featuredImg}
                />
              ) : (
                <div className={styles.featuredPlaceholder}>
                  <span>🎬</span>
                </div>
              )}

              <div className={styles.playOverlay}>
                <div className={styles.playBtn}>
                  <span className={styles.playIcon}>▶</span>
                  <span className={styles.playLabel}>观看作品</span>
                </div>
              </div>
            </div>

            <div className={styles.featuredInfo}>
              <div>
                <span className={styles.featuredTag}>
                  {featuredWork.category || '视频作品'}
                </span>
                <h3 className={styles.featuredTitle}>{featuredWork.title}</h3>
                {featuredWork.student && (
                  <p className={styles.featuredStudent}>
                    <span className={styles.dot} />
                    {featuredWork.student}
                  </p>
                )}
                {featuredWork.description && (
                  <p className={styles.featuredDesc}>{featuredWork.description}</p>
                )}
              </div>
              <div className={styles.featuredMeta}>
                <span>{featuredWork.dateStr}</span>
                <span className={styles.cta}>点击观看 →</span>
              </div>
            </div>
          </Link>
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
