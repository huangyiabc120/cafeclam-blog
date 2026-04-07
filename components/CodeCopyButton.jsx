'use client'

import { useEffect, useRef } from 'react'

export default function CodeCopyButton() {
  useEffect(() => {
    const preElements = document.querySelectorAll('.post-body pre')

    preElements.forEach(pre => {
      if (pre.querySelector('.copy-btn')) return

      const btn = document.createElement('button')
      btn.className = 'copy-btn'
      btn.textContent = '复制'
      btn.setAttribute('aria-label', '复制代码')

      btn.addEventListener('click', async () => {
        const code = pre.querySelector('code')
        if (!code) return
        try {
          await navigator.clipboard.writeText(code.innerText)
          btn.textContent = '已复制!'
          setTimeout(() => { btn.textContent = '复制' }, 2000)
        } catch {}
      })

      pre.style.position = 'relative'
      pre.appendChild(btn)
    })
  }, [])

  return null
}
