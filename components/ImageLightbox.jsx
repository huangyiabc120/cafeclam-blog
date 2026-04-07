'use client'

import { useEffect, useState } from 'react'

export default function ImageLightbox() {
  const [src, setSrc] = useState(null)
  const [alt, setAlt] = useState('')

  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'IMG' && e.target.closest('.post-body')) {
        setSrc(e.target.src)
        setAlt(e.target.alt || '')
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const close = () => {
    setSrc(null)
    setAlt('')
  }

  if (!src) return null

  return (
    <div className="lightbox" onClick={close} aria-modal="true" role="dialog">
      <button className="lightbox-close" onClick={close} aria-label="关闭">✕</button>
      <img
        src={src}
        alt={alt}
        className="lightbox-img"
        onClick={e => e.stopPropagation()}
      />
      {alt && <div className="lightbox-caption">{alt}</div>}
    </div>
  )
}
