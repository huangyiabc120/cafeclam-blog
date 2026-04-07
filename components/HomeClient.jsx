'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import PostCard from './PostCard'

function useCategoryFilter(posts) {
  const categories = useMemo(() => {
    const cats = [...new Set(posts.map(p => p.category).filter(Boolean))]
    return ['全部', ...cats]
  }, [posts])

  const [active, setActive] = useState('全部')
  const filtered = useMemo(
    () => active === '全部' ? posts : posts.filter(p => p.category === active),
    [posts, active]
  )
  return { categories, active, setActive, filtered }
}

export default function HomeClient({ posts }) {
  const { categories, active: activeCategory, setActive: setCategory, filtered } = useCategoryFilter(posts)
  const [query, setQuery] = useState('')

  const featured = filtered[0]
  const rest = filtered.slice(1)

  const displayPosts = query.trim()
    ? filtered.filter(p =>
        p.title?.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase()) ||
        p.tags?.some(t => t.toLowerCase().includes(query.toLowerCase()))
      )
    : rest

  const isSearching = query.trim().length > 0

  return (
    <>
      {/* Search Bar */}
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input
          type="search"
          className="search-input"
          placeholder="搜索文章标题、描述或标签..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {query && (
          <button className="search-clear" onClick={() => setQuery('')}>✕</button>
        )}
      </div>

      {/* Categories */}
      {!isSearching && (
        <div className="category-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Featured Post */}
      {featured && !isSearching && (
        <article className="featured-post featured-post--large">
          <Link href={`/posts/${featured.slug}`} className="featured-image-link">
            <img
              src={`https://picsum.photos/seed/${featured.slug}/800/600`}
              alt={featured.title}
              className="featured-img"
              loading="eager"
            />
            <div className="featured-img-overlay" />
          </Link>
          <div className="featured-content">
            <span className="featured-tag">{featured.category || '文章'}</span>
            <h2 className="featured-title">
              <Link href={`/posts/${featured.slug}`}>{featured.title}</Link>
            </h2>
            <p className="featured-excerpt">{featured.description}</p>
            <div className="featured-meta">
              <span>{featured.dateStr}</span>
              <span>·</span>
              <span>{featured.readTime}</span>
            </div>
            <Link href={`/posts/${featured.slug}`} className="featured-readmore">
              阅读全文 →
            </Link>
          </div>
        </article>
      )}

      {/* Section Header */}
      <div className="section-header">
        <span className="section-title">
          {isSearching ? `🔍 搜索结果: "${query}"` : '最近发布'}
        </span>
        <div className="section-line" />
        {!isSearching && <span className="section-count">{rest.length} 篇</span>}
      </div>

      {/* Posts Grid */}
      {displayPosts.length > 0 ? (
        <div className="posts-grid">
          {(isSearching ? displayPosts : rest.slice(0, 6)).map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-icon">🔍</span>
          <p>没有找到相关文章</p>
          <button onClick={() => { setQuery(''); setCategory('全部'); }} className="empty-reset">
            清除筛选
          </button>
        </div>
      )}

      {/* About Card */}
      {!isSearching && (
        <div className="about-card">
          <div className="about-card-inner">
            <div className="about-card-avatar">🧑‍💻</div>
            <div className="about-card-text">
              <h2>关于咖啡蛤蜊</h2>
              <p>
                这里是我的文字角落。写我所想，记我所见。
                没有固定的更新频率，但每一篇都是认真的。
                感谢你愿意在这里停留。
              </p>
              <Link href="/about" className="about-card-link">
                了解更多 →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
