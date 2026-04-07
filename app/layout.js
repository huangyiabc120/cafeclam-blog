import './globals.css'
import { useEffect, useState } from 'react'

export const metadata = {
  title: {
    default: '咖啡蛤蜊 · CafeClam',
    template: '%s · 咖啡蛤蜊',
  },
  description: '记录生活、观点与碎碎念。咖啡与蛤蜊，一个温暖一个坚硬，都是真实。',
}

const navLinks = [
  { href: '/', label: '首页' },
  { href: '/about', label: '关于' },
]

function ThemeToggle() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light'
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="切换主题" title={theme === 'light' ? '深色模式' : '浅色模式'}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <nav className="site-nav">
          <div className="nav-inner">
            <a href="/" className="nav-logo">
              咖啡<span>蛤蜊</span>
            </a>
            <div className="nav-right">
              <ul className="nav-links">
                {navLinks.map(link => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
              <ThemeToggle />
            </div>
          </div>
        </nav>
        {children}
        <footer className="site-footer">
          <div className="footer-logo">咖啡<span>蛤蜊</span></div>
          <div className="footer-tagline">CAFE & CLAM · 记录真实</div>
          <div className="footer-links">
            <a href="/feed.xml" title="RSS 订阅">RSS</a>
            <span>·</span>
            <a href="mailto:249618569@qq.com">邮箱</a>
            <span>·</span>
            <a href="https://instagram.com/hyabc110" target="_blank" rel="noopener">Instagram</a>
          </div>
          <div className="footer-copy">© {new Date().getFullYear()} CafeClam · All rights reserved</div>
        </footer>
      </body>
    </html>
  )
}
