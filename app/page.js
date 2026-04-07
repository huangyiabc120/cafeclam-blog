import { getSortedPostsData } from '../lib/posts'
import HomeClient from '../components/HomeClient'

export default function Home() {
  const allPosts = getSortedPostsData()

  return (
    <>
      <header className="site-header">
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

      <main className="site-main">
        <HomeClient posts={allPosts} />
      </main>
    </>
  )
}
