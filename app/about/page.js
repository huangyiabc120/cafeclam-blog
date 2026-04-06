import Link from 'next/link'

export const metadata = {
  title: '关于',
  description: '关于咖啡蛤蜊博客',
}

export default function AboutPage() {
  return (
    <article className="post-page">
      <Link href="/" className="back-link">← 返回首页</Link>

      <header className="post-header">
        <span className="post-tag">ABOUT</span>
        <h1>咖啡蛤蜊</h1>
        <div className="post-meta">
          <span>始于 2026</span>
          <span>·</span>
          <span>记录真实</span>
        </div>
      </header>

      <div className="post-cover">
        <span>CAFE CLAM · COVER</span>
      </div>

      <div className="post-body">
        <p>
          你好，欢迎来到「咖啡蛤蜊」。
        </p>
        <p>
          名字听起来有点奇怪，但这就是我。
          咖啡是每天早上的仪式，温暖、清醒、不可或缺；
          蛤蜊是大海留下的礼物，坚硬、沉默、值得探索。
          两个东西放在一起，就像这个博客——一半是生活碎碎念，一半是认真思考的观点。
        </p>
        <p>
          没有固定的写作计划，没有特定的领域限制。
          想写的时候就写，想停的时候就停。
          但每一篇文字，都是认真的。
        </p>
        <h2>这个博客</h2>
        <p>
          用 Next.js 构建，托管在 Vercel。
          没有评论系统，没有数据分析，没有乱七八糟的追踪脚本。
          只写我想写的，你看你的。
        </p>
        <h2>联系我</h2>
        <p>
          如果你想交流、合作或者只是打个招呼：<br />
          邮箱：<a href="mailto:249618569@qq.com">249618569@qq.com</a><br />
          微信：blaxk120<br />
          Instagram：<a href="https://instagram.com/hyabc110" target="_blank">@hyabc110</a>
        </p>
        <blockquote>
          感谢你愿意在这里停留。期望这些文字对你有一点价值。
        </blockquote>
      </div>

      <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <Link href="/" className="back-link">← 返回首页</Link>
      </div>
    </article>
  )
}
