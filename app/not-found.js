import Link from 'next/link'

export default function NotFound() {
  return (
    <article className="post-page" style={{ textAlign: 'center' }}>
      <div style={{ marginTop: 80 }}>
        <div style={{ fontSize: '5rem', marginBottom: 24 }}>🔍</div>
        <h1 style={{ fontFamily: 'var(--font-title)', fontSize: 'clamp(2rem, 6vw, 3.5rem)', marginBottom: 16 }}>
          404
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--ink-light)', marginBottom: 32 }}>
          这篇文章不存在或已被删除
        </p>
        <Link href="/" className="back-link" style={{ display: 'inline-flex' }}>
          ← 返回首页
        </Link>
      </div>
    </article>
  )
}
