// Extracts H2 and H3 headings from markdown content for TOC
export function extractHeadings(content) {
  const lines = content.split('\n')
  const headings = []

  for (const line of lines) {
    const h2 = line.match(/^## (.+)/)
    const h3 = line.match(/^### (.+)/)

    if (h2) {
      const text = h2[1].trim()
      const id = text
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fff]+/g, '-')
        .replace(/^-+|-+$/g, '')
      headings.push({ level: 2, text, id })
    } else if (h3) {
      const text = h3[1].trim()
      const id = text
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fff]+/g, '-')
        .replace(/^-+|-+$/g, '')
      headings.push({ level: 3, text, id })
    }
  }

  return headings
}

// Slugify heading text to match IDs injected by react-markdown remark plugins
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
