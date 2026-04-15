import { getAllWorkSlugs, getWorkData } from '../../../../lib/works'
import styles from './page.module.css'

export async function generateStaticParams() {
  const slugs = getAllWorkSlugs()
  return slugs.map(slug => ({ slug: slug.params.slug }))
}

export async function generateMetadata({ params }) {
  const work = getWorkData(params.slug)
  return {
    title: work.title,
    description: work.description,
  }
}

export default function WorkDetailPage({ params }) {
  const work = getWorkData(params.slug)

  return (
    <div className={styles.playerPage}>
      <div className={styles.playerWrap}>
        <VideoPlayer url={work.videoUrl} title={work.title} />
      </div>

      <div className={styles.infoPanel}>
        <div className={styles.infoInner}>
          <span className={styles.tag}>{work.category || '视频作品'}</span>
          <h1 className={styles.title}>{work.title}</h1>
          {work.student && (
            <p className={styles.student}>
              <span className={styles.studentLabel}>学员</span>
              {work.student}
            </p>
          )}
          {work.description && (
            <p className={styles.desc}>{work.description}</p>
          )}
          <p className={styles.date}>{work.dateStr}</p>

          <a href="/works" className={styles.backLink}>
            ← 返回作品集
          </a>
        </div>
      </div>
    </div>
  )
}

function VideoPlayer({ url, title }) {
  const isEmbed = url.includes('bilibili.com') || url.includes('youtube.com') || url.includes('youtu.be')
  const isDirect = url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.mov')

  if (isEmbed) {
    let src = url
    if (url.includes('bilibili.com')) {
      const bv = url.split('/').pop().split('?')[0]
      src = `https://player.bilibili.com/player.html?bvid=${bv}`
    } else if (url.includes('youtube.com/watch')) {
      const v = url.split('v=')[1]?.split('&')[0]
      src = `https://www.youtube.com/embed/${v}`
    } else if (url.includes('youtu.be/')) {
      const v = url.split('youtu.be/')[1]?.split('?')[0]
      src = `https://www.youtube.com/embed/${v}`
    }
    return (
      <div className={styles.embedContainer}>
        <iframe src={src} scrolling="no" allowFullScreen title={title} />
      </div>
    )
  }

  if (isDirect) {
    return (
      <div className={styles.videoContainer}>
        <video controls autoPlay>
          <source src={url} />
          您的浏览器不支持视频播放。
        </video>
      </div>
    )
  }

  return (
    <div className={styles.noVideo}>
      <span>暂无视频</span>
    </div>
  )
}
