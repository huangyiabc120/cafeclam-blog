import Link from 'next/link'

export default function PostNavigation({ prev, next }) {
  if (!prev && !next) return null

  return (
    <nav className="post-nav" aria-label="文章导航">
      {prev ? (
        <Link href={`/posts/${prev.slug}`} className="post-nav-item post-nav-item--prev">
          <span className="post-nav-dir">← 上一篇</span>
          <span className="post-nav-title">{prev.title}</span>
        </Link>
      ) : <div />}

      {next ? (
        <Link href={`/posts/${next.slug}`} className="post-nav-item post-nav-item--next">
          <span className="post-nav-dir">下一篇 →</span>
          <span className="post-nav-title">{next.title}</span>
        </Link>
      ) : <div />}
    </nav>
  )
}
