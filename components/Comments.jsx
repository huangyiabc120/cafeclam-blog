'use client'

import { useEffect, useRef } from 'react'

export default function Comments() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || ref.current.querySelector('.giscus')) return

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'huangyiabc120/cafeclam-blog')
    script.setAttribute('data-repo-id', 'R_kgDOXXXXXXXX') // TODO: 从 giscus.app 获取
    script.setAttribute('data-category', 'Announcements')
    script.setAttribute('data-category-id', 'DIC_xxxxxxxxxxxxxxxx') // TODO: 从 giscus.app 获取
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', 'preferred_color_scheme')
    script.setAttribute('data-lang', 'zh-CN')
    script.setAttribute('data-loading', 'lazy')
    script.crossOrigin = 'anonymous'
    script.async = true

    ref.current.appendChild(script)
  }, [])

  return (
    <div className="comments-wrap">
      <div className="comments-header">
        <span className="comments-title">💬 评论区</span>
        <span className="comments-hint">使用 GitHub 账号登录后留言</span>
      </div>
      <div ref={ref} className="giscus" />
    </div>
  )
}
