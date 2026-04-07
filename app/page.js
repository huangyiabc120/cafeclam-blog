import { getSortedPostsData } from '../lib/posts'
import HomeClient from '../components/HomeClient'

export default function Home() {
  const allPosts = getSortedPostsData()

  return (
    <>
      <header className="site-header">
        <span className="header-eyebrow">CAFE CLAM · EST. 2026</span>
        <h1 className="header-title">
          记录生活-让我静心<br /><em>暴躁的大毅哥</em>
        </h1>
        <p className="header-sub">
          咖啡是日常，蛤蜊是大海。一个温暖，一个坚硬，
          都是这个世界留给我们的东西。
        </p>
        <div className="header-divider" />
      </header>

      <main className="site-main">
        <HomeClient posts={allPosts} />
      </main>
    </>
  )
}
