import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale/zh-CN'

const worksDirectory = path.join(process.cwd(), 'works')

function calculateReadTime(content) {
  const chineseChars = (content.match(/[\u4e00-\u9fff]/g) || []).length
  const englishWords = (content.match(/[a-zA-Z]+/g) || []).length
  const minutes = Math.max(1, Math.ceil((chineseChars / 500) + (englishWords / 200)))
  return `${minutes} min read`
}

export function getSortedWorksData() {
  if (!fs.existsSync(worksDirectory)) return []
  
  const fileNames = fs.readdirSync(worksDirectory)
  const allWorksData = fileNames
    .filter(name => name.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(worksDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      const readTime = data.readTime || calculateReadTime(content)

      return {
        slug,
        ...(data),
        readTime,
        dateStr: data.date ? format(new Date(data.date), 'yyyy年MM月dd日', { locale: zhCN }) : '未知日期',
      }
    })

  return allWorksData.sort((a, b) => {
    if (!a.date) return 1
    if (!b.date) return -1
    return new Date(b.date) - new Date(a.date)
  })
}

export function getAllWorkSlugs() {
  if (!fs.existsSync(worksDirectory)) return []
  const fileNames = fs.readdirSync(worksDirectory)
  return fileNames
    .filter(name => name.endsWith('.md'))
    .map(fileName => ({ params: { slug: fileName.replace(/\.md$/, '') } }))
}

export function getWorkData(slug) {
  const fullPath = path.join(worksDirectory, `${slug}.md`)
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
