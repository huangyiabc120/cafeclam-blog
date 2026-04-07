import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale/zh-CN'

const postsDirectory = path.join(process.cwd(), 'posts')

// Auto-calculate reading time from word count (Chinese ~500 chars/min, English ~200 words/min)
function calculateReadTime(content) {
  const chineseChars = (content.match(/[\u4e00-\u9fff]/g) || []).length
  const englishWords = (content.match(/[a-zA-Z]+/g) || []).length
  const minutes = Math.max(1, Math.ceil((chineseChars / 500) + (englishWords / 200)))
  return `${minutes} min read`
}

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(name => name.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      // Auto-calculate readTime if not specified in frontmatter
      const readTime = data.readTime || calculateReadTime(content)

      return {
        slug,
        ...(data),
        readTime,
        dateStr: data.date ? format(new Date(data.date), 'yyyy年MM月dd日', { locale: zhCN }) : '未知日期',
      }
    })

  return allPostsData.sort((a, b) => {
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(b.date) - new Date(a.date)
  })
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(name => name.endsWith('.md'))
    .map(fileName => ({ params: { slug: fileName.replace(/\.md$/, '') } }))
}

export function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const readTime = data.readTime || calculateReadTime(content)

  return {
    slug,
    content,
    ...(data),
    readTime,
    dateStr: data.date ? format(new Date(data.date), 'yyyy年MM月dd日', { locale: zhCN }) : '未知日期',
  }
}
