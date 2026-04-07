'use client'

import { useState } from 'react'

export default function ShareButtons({ title, url }) {
  const [copied, setCopied] = useState(false)

  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  const shareItems = [
    {
      label: '微信',
      icon: '💬',
      href: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedUrl}`,
      isQR: true,
    },
    {
      label: '微博',
      icon: '🔺',
      href: `https://service.weibo.com/share/share.php?title=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      label: 'Twitter',
      icon: '🐦',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
  ]

  return (
    <div className="share-wrap">
      <span className="share-label">分享这篇文章</span>
      <div className="share-buttons">
        {shareItems.map(item => (
          item.isQR ? (
            <button
              key={item.label}
              className="share-btn"
              title={item.label}
              onClick={() => window.open(item.href, '_blank', 'width=260,height=260')}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ) : (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="share-btn"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </a>
          )
        ))}
        <button className="share-btn" onClick={copyLink} title="复制链接">
          <span>{copied ? '✅' : '🔗'}</span>
          <span>{copied ? '已复制' : '复制'}</span>
        </button>
      </div>
    </div>
  )
}
