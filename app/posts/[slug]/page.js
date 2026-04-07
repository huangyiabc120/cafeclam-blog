import Link from 'next/link'
import { getAllPostSlugs, getPostData } from '../../../lib/posts'
import ReactMarkdown from 'react-markdown'

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getPostData(slug)
  return {
    title: post.title,
    description: post.description,
  }
}

export default async function PostPage({ params }) {
  const { slug } = await params
  const post = getPostData(slug)

  return (
    <article className="post-page">
      <Link href="/" className="back-link">← 返回首页</Link>

      <header className="post-header">
        <span className="post-tag">{post.category || '文章'}</span>
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span>{post.dateStr}</span>
          <span>·</span>
          <span>{post.readTime || '5 min read'}</span>
        </div>
      </header>

      {post.coverText && (
        <div className="post-cover">
          <span>{post.coverText}</span>
        </div>
      )}

      <div className="post-body">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      <div className="tag-list">
        {(post.tags || []).map(tag => (
          <span key={tag} className="tag-item">{tag}</span>
        ))}
      </div>

      <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <Link href="/" className="back-link">← 返回首页</Link>
      </div>
    </article>
  )
}
