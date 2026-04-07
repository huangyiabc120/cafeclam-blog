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
      {theme === 'light' ? '🌙' : '☀️'}
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
              </ul>
              <ThemeToggle theme={theme} toggle={toggleTheme} />
              <button
                className="hamburger"
                onClick={() => setMenuOpen(true)}
                aria-label="打开菜单"
              >
                <span /><span /><span />
              </button>
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

        <script defer src="https://plausible.io/js/script.js" data-domain="hyi-cafeclam.top" />
      </body>
    </html>
  )
}
