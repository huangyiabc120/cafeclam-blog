import { getSortedPostsData } from '../lib/posts'
import HomeClient from '../components/HomeClient'
import Sidebar from '../components/Sidebar'

export default function Home() {
  const allPosts = getSortedPostsData()

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

      <main className="site-main home-layout">
        <div className="home-content">
          <HomeClient posts={allPosts} />
        </div>
        <Sidebar posts={allPosts} allTags={allTags} />
      </main>
    </>
  )
}
