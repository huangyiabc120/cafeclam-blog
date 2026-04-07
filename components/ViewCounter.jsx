'use client'

import { useEffect, useState } from 'react'

const NAMESPACE = 'cafeclam-blog'

export default function ViewCounter({ slug }) {
  const [views, setViews] = useState(null)

  useEffect(() => {
    if (!slug) return

    // Get current views
    fetch(`https://api.countapi.xyz/get/${NAMESPACE}/${slug}`)
      .then(r => r.json())
      .then(data => { if (data.value) setViews(data.value) })
      .catch(() => {})

    // Increment (fire & forget)
    fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${slug}`)
      .catch(() => {})
  }, [slug])

  if (views === null) return null

  return (
    <span className="view-counter" title="阅读量">
      👁 {views.toLocaleString()}
    </span>
  )
}
