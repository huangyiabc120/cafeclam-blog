import './globals.css'
import { useEffect, useState } from 'react'

const SITE_URL = 'https://hyi-cafeclam.top'
const SITE_TITLE = '咖啡蛤蜊 · CafeClam'
const SITE_DESC = '记录生活、观点与碎碎念。咖啡与蛤蜊，一个温暖一个坚硬，都是真实。'

export const metadata = {
  metadataBase: SITE_URL,
  title: {
    default: SITE_TITLE,
    template: '%s · 咖啡蛤蜊',
  },
  description: SITE_DESC,
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: SITE_URL,
    siteName: '咖啡蛤蜊',
    title: SITE_TITLE,
    description: SITE_DESC,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESC,
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

const navLinks = [
  { href: '/', label: '首页' },
  { href: '/about', label: '关于' },
]

function ThemeToggle({ theme, toggle }) {
  return (
    <button className="theme-toggle" onClick={toggle} aria-label="切换主题" title={theme === 'light' ? '深色模式' : '浅色模式'}>
      <span className="theme-toggle-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
    </button>
  )
}

function MobileMenu({ open, onClose }) {
  return (
    <div className={`mobile-menu ${open ? 'mobile-menu--open' : ''}`} aria-hidden={!open}>
      <div className="mobile-menu-inner">
        <button className="mobile-menu-close" onClick={onClose} aria-label="关闭菜单">✕</button>
        <nav className="mobile-nav">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="mobile-nav-link" onClick={onClose}>
              {link.label}
            </a>
          ))}
          <a href="/feed.xml" className="mobile-nav-link" onClick={onClose}>RSS 订阅</a>
        </nav>
      </div>
      {open && <div className="mobile-menu-overlay" onClick={onClose} />}
    </div>
  )
}

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState('light')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light'
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://picsum.photos" />
      </head>
      <body>
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

        <nav className="site-nav">
          <div className="nav-inner">
            <a href="/" className="nav-logo">咖啡<span>蛤蜊</span></a>
            <div className="nav-right">
              <ul className="nav-links">
                {navLinks.map(link => (
                  <li key={link.href}><a href={link.href}>{link.label}</a></li>
                ))}
                <li><a href="/feed.xml" className="nav-rss" title="RSS 订阅">📡</a></li>
              </ul>
              <ThemeToggle theme={theme} toggle={toggleTheme} />
              <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="打开菜单">
                <span /><span /><span />
              </button>
            </div>
          </div>
        </nav>

        {children}

        <footer className="site-footer">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-logo">咖啡<span>蛤蜊</span></div>
              <p className="footer-desc">记录生活、观点与碎碎念。<br />咖啡与蛤蜊，一个温暖一个坚硬。</p>
              <div className="footer-social">
                <a href="mailto:249618569@qq.com" className="footer-social-link" title="邮箱" aria-label="邮箱">✉️</a>
                <a href="https://instagram.com/hyabc110" target="_blank" rel="noopener noreferrer" className="footer-social-link" title="Instagram" aria-label="Instagram">📷</a>
                <a href="https://github.com/huangyiabc120" target="_blank" rel="noopener noreferrer" className="footer-social-link" title="GitHub" aria-label="GitHub">🐙</a>
                <a href="/feed.xml" className="footer-social-link" title="RSS 订阅" aria-label="RSS">📡</a>
              </div>
            </div>
            <div className="footer-nav">
              <div className="footer-nav-col">
                <div className="footer-nav-title">导航</div>
                <a href="/" className="footer-nav-link">首页</a>
                <a href="/about" className="footer-nav-link">关于</a>
                <a href="/feed.xml" className="footer-nav-link">RSS 订阅</a>
              </div>
              <div className="footer-nav-col">
                <div className="footer-nav-title">联系</div>
                <a href="mailto:249618569@qq.com" className="footer-nav-link">邮箱</a>
                <a href="https://instagram.com/hyabc110" target="_blank" rel="noopener noreferrer" className="footer-nav-link">Instagram</a>
                <a href="https://github.com/huangyiabc120" target="_blank" rel="noopener noreferrer" className="footer-nav-link">GitHub</a>
              </div>
            </div>
          </div>
          <div className="footer-divider" />
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} CafeClam · All rights reserved</span>
            <span className="footer-stats">📝 7 篇文章 · 持续更新中</span>
          </div>
        </footer>

        <script defer src="https://plausible.io/js/script.js" data-domain="hyi-cafeclam.top" />
      </body>
    </html>
  )
}
