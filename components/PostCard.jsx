'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

function useIntersectionObserver(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, isVisible]
}

export default function PostCard({ post, index }) {
  const [ref, visible] = useIntersectionObserver({ threshold: 0.1 })
  const delay = (index % 3) * 80

  return (
    <article
      ref={ref}
      className={`post-card ${visible ? 'post-card--visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Link href={`/posts/${post.slug}`} className="post-card-image-link">
        <img
          src={`https://picsum.photos/seed/${post.slug}/400/250`}
          alt={post.title}
          className="post-card-img"
          loading="lazy"
        />
      </Link>
      <div className="post-card-body">
        <span className="post-card-tag">{post.category || '文章'}</span>
        <h3 className="post-card-title">
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="post-card-excerpt">{post.description}</p>
        <div className="post-card-meta">{post.dateStr}</div>
      </div>
    </article>
  )
}
