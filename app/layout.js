import './globals.css'

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

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <nav className="site-nav">
          <div className="nav-inner">
            <a href="/" className="nav-logo">
              咖啡<span>蛤蜊</span>
            </a>
            <ul className="nav-links">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        {children}
        <footer className="site-footer">
          <div className="footer-logo">咖啡<span>蛤蜊</span></div>
          <div className="footer-tagline">CAFE & CLAM · 记录真实</div>
          <div className="footer-links">
            <a href="mailto:249618569@qq.com">邮箱</a>
            <span>·</span>
            <a href="https://instagram.com/Dayige120" target="_blank">Instagram</a>
          </div>
          <div className="footer-copy">© {new Date().getFullYear()} CafeClam · All rights reserved</div>
        </footer>
      </body>
    </html>
  )
}
