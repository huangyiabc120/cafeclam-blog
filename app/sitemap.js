import { getSortedPostsData } from './lib/posts'

const SITE_URL = 'https://hyi-cafeclam.top'

export default function sitemap() {
  const posts = getSortedPostsData()

  const postEntries = posts.map(post => ({
    url: `${SITE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: post.featured ? 0.8 : 0.6,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    ...postEntries,
  ]
}
