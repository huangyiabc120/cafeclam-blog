'use client'

import { useEffect, useState } from 'react'

function ThemeToggle({ theme, toggle }) {
  return (
    <button className="theme-toggle" onClick={toggle} aria-label="切换主题" title={theme === 'light' ? '深色模式' : '浅色模式'}>
      <span className="theme-toggle-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
    </button>
  )
}

function MobileMenu({ open, onClose }) {
  const navLinks = [
    { href: '/', label: '首页' },
    { href: '/about', label: '关于' },
  ]
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

export default function ThemeProvider({ children }) {
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

  const navLinks = [
    { href: '/', label: '首页' },
    { href: '/about', label: '关于' },
  ]

  return (
    <>
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
    </>
  )
}
