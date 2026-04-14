import './globals.css'
import ThemeProvider from '../components/ThemeProvider'
import { getSortedPostsData } from '../lib/posts'

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

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://picsum.photos" />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>

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
                <a href="/works" className="footer-nav-link">学员作品</a>
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
            <span className="footer-stats">📝 {getSortedPostsData().length} 篇文章 · 持续更新中</span>
          </div>
        </footer>

        <script defer src="https://plausible.io/js/script.js" data-domain="hyi-cafeclam.top" />
      </body>
    </html>
  )
}
