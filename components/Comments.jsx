'use client'

import { useEffect, useRef } from 'react'

export default function Comments({ slug }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || !slug) return

    // Remove old giscus iframe if re-rendering
    ref.current.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'huangyiabc120/cafeclam-blog')
    script.setAttribute('data-repo-id', 'YOUR_REPO_ID')        // TODO: 替换
    script.setAttribute('data-category', '评论区')
    script.setAttribute('data-category-id', 'YOUR_CATEGORY_ID') // TODO: 替换
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', 'preferred_color_scheme')
    script.setAttribute('data-lang', 'zh-CN')
    script.setAttribute('data-loading', 'lazy')
    script.crossOrigin = 'anonymous'
    script.async = true
    ref.current.appendChild(script)
  }, [slug])

  return (
    <div className="comments-wrap">
      <div className="comments-header">
        <span className="comments-title">💬 评论区</span>
      </div>
      <div ref={ref} className="giscus" />
    </div>
  )
}
