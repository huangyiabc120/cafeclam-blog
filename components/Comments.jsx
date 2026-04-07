'use client'

import { useEffect, useRef } from 'react'

export default function Comments({ slug }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    // Remove old iframe if re-rendering
    ref.current.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://commentbox.io/commentbox.js?project=5635195189329920'
    script.async = true
    script.crossOrigin = 'anonymous'
    ref.current.appendChild(script)
  }, [slug])

  return (
    <div className="comments-wrap">
      <div className="comments-header">
        <span className="comments-title">💬 评论区</span>
      </div>
      <div
        ref={ref}
        className="commentbox"
        id="commentbox"
        data-page-id={slug}
      />
    </div>
  )
}
