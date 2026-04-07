'use client'

import { useState } from 'react'

export default function SubscriptionForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setError('')

    try {
      // TODO: 替换为你的 Buttondown API Token
      // 在 https://buttondown.email/settings 上获取
      const res = await fetch('https://buttondown.email/api/emails/embed-subscribe/YOUR_USERNAME', {
        method: 'POST',
        body: new URLSearchParams({ email }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || '订阅失败，请重试')
      }
    } catch (err) {
      setStatus('error')
      setError(err.message)
    }
  }

  return (
    <div className="subscribe-wrap">
      <div className="subscribe-inner">
        <div className="subscribe-icon">📬</div>
        <h3 className="subscribe-title">订阅更新</h3>
        <p className="subscribe-desc">
          新文章发布时邮件通知你，不错过任何一篇。随时退订。
        </p>

        {status === 'success' ? (
          <div className="subscribe-success">
            ✅ 订阅成功！期待与你更多交流。
          </div>
        ) : (
          <form className="subscribe-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="subscribe-input"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              className="subscribe-btn"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? '订阅中...' : '订阅'}
            </button>
          </form>
        )}

        {error && <p className="subscribe-error">{error}</p>}
      </div>
    </div>
  )
}
