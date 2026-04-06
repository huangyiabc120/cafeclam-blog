import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'

export default function Home() {
  const allPosts = getSortedPostsData()
  const featured = allPosts[0]
  const rest = allPosts.slice(1)

  return (
    <>
      {/* Header */}
      <header className="site-header">
        <span className="header-eyebrow">CAFE CLAM · EST. 2026</span>
        <h1 className="header-title">
          记录生活<br /><em>真实的碎碎念</em>
        </h1>
        <p className="header-sub">
          咖啡是日常，蛤蜊是大海。一个温暖，一个坚硬，
          都是这个世界留给我们的东西。
        </p>
        <div className="header-divider" />
      </header>

      <main className="site-main">

        {/* Categories */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <a href="/" className="category-pill active">全部</a>
          <a href="/" className="category-pill">生活</a>
          <a href="/" className="category-pill">观点</a>
          <a href="/" className="category-pill">随笔</a>
          <a href="/" className="category-pill">生活软装</a>
          <a href="/" className="category-pill">作品</a>
        </div>

        {/* Featured Post */}
        {featured && (
          <article className="featured-post">
            <div className="featured-image">
              <span>{featured.coverText || 'COVER IMAGE'}</span>
            </div>
            <div className="featured-content">
              <span className="featured-tag">{featured.category || '文章'}</span>
              <h2 className="featured-title">
                <Link href={`/posts/${featured.slug}`}>{featured.title}</Link>
              </h2>
              <p className="featured-excerpt">{featured.description}</p>
              <div className="featured-meta">
                <span>{featured.dateStr}</span>
                <span>·</span>
                <span>{featured.readTime || '5 min read'}</span>
              </div>
              <Link href={`/posts/${featured.slug}`} className="featured-readmore">
                阅读全文 →
              </Link>
            </div>
          </article>
        )}

        {/* Recent Posts */}
        <div className="section-header">
          <span className="section-title">最近发布</span>
          <div className="section-line" />
        </div>

        <div className="posts-grid">
          {rest.slice(0, 6).map(post => (
            <article key={post.slug} className="post-card">
              <div className="post-card-image">
                <span>{post.coverText || 'IMAGE'}</span>
              </div>
              <div className="post-card-body">
                <span className="post-card-tag">{post.category || '文章'}</span>
                <h3 className="post-card-title">
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="post-card-excerpt">{post.description}</p>
                <div className="post-card-meta">{post.dateStr}</div>
              </div>
            </article>
          ))}
        </div>

        {/* About Card */}
        <div className="about-card">
          <h2>关于咖啡蛤蜊</h2>
          <p>
            这里是我的文字角落。写我所想，记我所见。
            没有固定的更新频率，但每一篇都是认真的。
            感谢你愿意在这里停留。
          </p>
          <br />
          <Link href="/about" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)' }}>
            了解更多 →
          </Link>
        </div>

      </main>
    </>
  )
}
