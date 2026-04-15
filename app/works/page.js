import { getSortedWorksData } from '../../lib/works'
import WorksGrid from './WorksGrid'

export const metadata = {
  title: '学员作品',
  description: '学员作品展示',
}

export default function WorksPage() {
  const works = getSortedWorksData()

  return (
    <>
      <header className="site-header hero-animate">
        <span className="header-eyebrow">🎬 STUDENT WORKS</span>
        <h1 className="header-title">学员<em>作品</em></h1>
        <p className="header-sub">记录每一位学员的成长与创作，用镜头讲述故事。</p>
        <div className="header-divider" />
      </header>

      <main className="site-main">
        <WorksGrid works={works} />
      </main>
    </>
  )
}
