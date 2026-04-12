'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false })

export default function Comments({ slug }) {
  const ref = useRef(null)
  const [showPicker, setShowPicker] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!ref.current || !slug) return

    ref.current.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'huangyiabc120/cafeclam-blog')
    script.setAttribute('data-repo-id', 'R_kgDOR7MlhQ')
    script.setAttribute('data-category', 'General')
    script.setAttribute('data-category-id', 'DIC_kwDOR7Mlhc4C6sLE')
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

  const handleEmojiClick = async (emojiObject) => {
    try {
      await navigator.clipboard.writeText(emojiObject.emoji)
      setCopied(true)
      setShowPicker(false)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: just close picker, user can use keyboard emoji input
      setShowPicker(false)
    }
  }

  return (
    <div className="comments-wrap">
      <div className="comments-header">
        <span className="comments-title">💬 评论区</span>
        <div className="emoji-picker-wrapper" style={{ position: 'relative' }}>
          <button
            onClick={() => setShowPicker(!showPicker)}
            style={{
              background: 'none',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              padding: '4px 10px',
              cursor: 'pointer',
              fontSize: '16px',
              marginLeft: '12px',
            }}
            title="插入表情"
          >
            😊 表情
          </button>
          {copied && (
            <span style={{
              position: 'absolute',
              right: 0,
              top: '36px',
              background: '#333',
              color: '#fff',
              fontSize: '12px',
              padding: '4px 8px',
              borderRadius: '6px',
              whiteSpace: 'nowrap',
              zIndex: 100,
            }}>
              ✅ 已复制，去评论框粘贴！
            </span>
          )}
          {showPicker && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '40px',
              zIndex: 999,
            }}>
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                autoFocusSearch={false}
                height={320}
              />
            </div>
          )}
        </div>
      </div>
      <div ref={ref} className="giscus" />
    </div>
  )
}
