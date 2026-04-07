import Link from 'next/link'
import { getAllPostSlugs, getSortedPostsData, getPostData } from '../../../lib/posts'
import { extractHeadings } from '../../../lib/toc'
import ReactMarkdown from 'react-markdown'
import remarkSlug from 'remark-slug'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import TableOfContents from '../../../components/Toc'
import Comments from '../../../components/Comments'
import ViewCounter from '../../../components/ViewCounter'
import PostNavigation from '../../../components/PostNavigation'
import ShareButtons from '../../../components/ShareButtons'
import ReadingProgress from '../../../components/ReadingProgress'
import BackToTop from '../../../components/BackToTop'
import CodeCopyButton from '../../../components/CodeCopyButton'
import ImageLightbox from '../../../components/ImageLightbox'

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

  const index = allPosts.findIndex(p => p.slug === slug)
  const prev = index < allPosts.length - 1 ? allPosts[index + 1] : null
  const next = index > 0 ? allPosts[index - 1] : null

  const postUrl = `${SITE_URL}/posts/${slug}`

  return (
    <>
      <ReadingProgress />
      <BackToTop />
      <ImageLightbox />
      <CodeCopyButton />

      {headings.length > 0 && <TableOfContents headings={headings} />}

      <article className="post-page">
        <Link href="/" className="back-link">← 返回首页</Link>

        <header className="post-header">
          <nav className="breadcrumb" aria-label="面包屑">
            <a href="/">首页</a>
            <span> / </span>
            <span>{post.category || '文章'}</span>
            <span> / </span>
            <span>{post.title}</span>
          </nav>
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
          <ReactMarkdown
            remarkPlugins={[remarkSlug, remarkGfm]}
            rehypePlugins={[rehypeSlug]}
          >
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

        <ShareButtons title={post.title} url={postUrl} />

        <div className="author-card">
          <div className="author-avatar">🧑‍💻</div>
          <div>
            <div className="author-name">毅哥哥</div>
            <div className="author-bio">记录生活、观点与碎碎念。咖啡与蛤蜊，一个温暖一个坚硬。</div>
          </div>
        </div>

        <PostNavigation prev={prev} next={next} />

        <Comments slug={slug} />

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <Link href="/" className="back-link">← 返回首页</Link>
        </div>
      </article>
    </>
  )
}
