import Link from 'next/link'
import { getAllPostSlugs, getPostData } from '../../../lib/posts'
import { extractHeadings } from '../../../lib/toc'
import ReactMarkdown from 'react-markdown'
import remarkSlug from 'remark-slug'
import rehypeSlug from 'rehype-slug'
import TableOfContents from '../../../components/Toc'
import Comments from '../../../components/Comments'
import ViewCounter from '../../../components/ViewCounter'
import SubscriptionForm from '../../../components/SubscriptionForm'

const SITE_URL = 'https://hyi-cafeclam.top'

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
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function PostPage({ params }) {
  const { slug } = await params
  const post = getPostData(slug)
  const headings = extractHeadings(post.content)

  return (
    <>
      {/* TOC floats on the right, passed via portal-like approach */}
      {headings.length > 0 && <TableOfContents headings={headings} />}

      <article className="post-page">
        <Link href="/" className="back-link">← 返回首页</Link>

        <header className="post-header">
          <span className="post-tag">{post.category || '文章'}</span>
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span>{post.dateStr}</span>
            <span>·</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <ViewCounter slug={slug} />
          </div>
        </header>

        {post.coverText && (
          <div className="post-cover">
            <span>{post.coverText}</span>
          </div>
        )}

        <div className="post-body">
          <ReactMarkdown
            remarkPlugins={[remarkSlug]}
            rehypePlugins={[rehypeSlug]}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {post.tags?.length > 0 && (
          <div className="tag-list">
            {post.tags.map(tag => (
              <span key={tag} className="tag-item">{tag}</span>
            ))}
          </div>
        )}

        {/* Author bio */}
        <div className="author-card">
          <div className="author-avatar">🧑‍💻</div>
          <div className="author-info">
            <div className="author-name">毅哥哥</div>
            <div className="author-bio">记录生活、观点与碎碎念。咖啡与蛤蜊，一个温暖一个坚硬。</div>
          </div>
        </div>

        <SubscriptionForm />

        <Comments />

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <Link href="/" className="back-link">← 返回首页</Link>
        </div>
      </article>
    </>
  )
}
