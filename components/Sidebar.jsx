'use client'

import Link from 'next/link'

export default function Sidebar({ posts, allTags }) {
  const recentPosts = posts.slice(0, 5)

  return (
    <aside className="home-sidebar">
      {/* 最近文章 */}
      <div className="sidebar-widget">
        <div className="sidebar-widget-title">📖 最近文章</div>
        <ul className="sidebar-recent-list">
          {recentPosts.map(post => (
            <li key={post.slug} className="sidebar-recent-item">
              <Link href={`/posts/${post.slug}`} className="sidebar-recent-link">
                <span className="sidebar-recent-title">{post.title}</span>
                <span className="sidebar-recent-date">{post.dateStr}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 标签云 */}
      <div className="sidebar-widget">
        <div className="sidebar-widget-title">🏷️ 标签</div>
        <div className="sidebar-tag-cloud">
          {allTags.map(tag => (
            <Link key={tag} href={`/?tag=${encodeURIComponent(tag)}`} className="sidebar-tag">
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}
