import Link from 'next/link'
import { getAllPostSlugs, getSortedPostsData, getPostData } from '../../../lib/posts'
import { extractHeadings } from '../../../lib/toc'
import ReactMarkdown from 'react-markdown'
import remarkSlug from 'remark-slug'
import rehypeSlug from 'rehype-slug'
import TableOfContents from '../../../components/Toc'
import Comments from '../../../components/Comments'
import ViewCounter from '../../../components/ViewCounter'
import PostNavigation from '../../../components/PostNavigation'
import ShareButtons from '../../../components/ShareButtons'

const SITE_URL = 'https://hyi-cafeclam.top'

export async function generateStaticParams() {
  return getAllPostSlugs()
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
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  }
}

export default async function PostPage({ params }) {
  const { slug } = await params
  const post = getPostData(slug)
  const headings = extractHeadings(post.content)
  const allPosts = getSortedPostsData()

  // Find prev / next
  const index = allPosts.findIndex(p => p.slug === slug)
  const prev = index < allPosts.length - 1 ? allPosts[index + 1] : null
  const next = index > 0 ? allPosts[index - 1] : null

  const postUrl = `${SITE_URL}/posts/${slug}`

  return (
    <>
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
          <div className="post-cover"><span>{post.coverText}</span></div>
        )}

        <div className="post-body">
          <ReactMarkdown remarkPlugins={[remarkSlug]} rehypePlugins={[rehypeSlug]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {post.tags?.length > 0 && (
          <div className="tag-list">
            {post.tags.map(tag => (
              <Link key={tag} href={`/?tag=${encodeURIComponent(tag)}`} className="tag-item">{tag}</Link>
            ))}
          </div>
        )}

        {/* Share */}
        <ShareButtons title={post.title} url={postUrl} />

        {/* Author */}
        <div className="author-card">
          <div className="author-avatar">🧑‍💻</div>
          <div>
            <div className="author-name">毅哥哥</div>
            <div className="author-bio">记录生活、观点与碎碎念。咖啡与蛤蜊，一个温暖一个坚硬。</div>
          </div>
        </div>

        {/* Subscribe */}
        <SubscriptionForm />

        <PostNavigation prev={prev} next={next} />

        <Comments slug={slug} />

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <Link href="/" className="back-link">← 返回首页</Link>
        </div>
      </article>
    </>
  )
}

// Inline SubscriptionForm — simple version without external dependency
function SubscriptionForm() {
  return (
    <div className="subscribe-wrap">
      <div className="subscribe-inner">
        <div className="subscribe-icon">📬</div>
        <h3 className="subscribe-title">订阅更新</h3>
        <p className="subscribe-desc">新文章发布时通知你，不错过任何一篇。</p>
        <a
          href="https://buttondown.email"
          target="_blank"
          rel="noopener noreferrer"
          className="subscribe-btn"
          style={{ display: 'inline-block', textDecoration: 'none' }}
        >
          前往订阅 →
        </a>
      </div>
    </div>
  )
}
