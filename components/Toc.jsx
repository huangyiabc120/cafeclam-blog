'use client'

import { useState, useEffect } from 'react'
import { slugify } from '../lib/toc'

export default function TableOfContents({ headings }) {
  const [active, setActive] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!headings.length) return

    // Show TOC only after some scroll
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    setVisible(window.scrollY > 300)

    // Intersection observer for active heading
    const observers = []
    headings.forEach(h => {
      const el = document.getElementById(h.id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(h.id) },
        { rootMargin: '-20% 0px -70% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observers.forEach(o => o.disconnect())
    }
  }, [headings])

  if (!headings.length) return null

  return (
    <nav className={`toc ${visible ? 'toc--visible' : ''}`} aria-label="文章目录">
      <div className="toc-title">目录</div>
      <ol className="toc-list">
        {headings.map(h => (
          <li key={h.id} className={`toc-item toc-item--h${h.level} ${active === h.id ? 'toc-item--active' : ''}`}>
            <a
              href={`#${h.id}`}
              className="toc-link"
              onClick={e => {
                e.preventDefault()
                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                setActive(h.id)
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
