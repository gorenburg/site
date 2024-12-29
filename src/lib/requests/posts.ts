import { itemsPerPage } from '$lib/config'
import type { GetPostsParams, GetPostsResponse, Post } from '$lib/types'

const slugRegExp = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}-/)

export async function getPosts(params?: GetPostsParams): Promise<GetPostsResponse> {
  let posts: Post[] = []

  const paths = import.meta.glob('/src/posts/*.md', { eager: true })

  for (const path in paths) {
    const file = paths[path]
    let slug = path.split('/').at(-1)?.replace('.md', '')

    if (slug && slugRegExp.test(slug)) {
      const slugDate = slugRegExp.exec(slug)![0]
      const formattedSlugDate = slugDate.split('-').join('/')
      slug = slug.replace(slugRegExp, formattedSlugDate)
    }

    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      const metadata = file.metadata as Omit<Post, 'slug'>
      const post = { ...metadata, slug } satisfies Post
      post.date = new Date(post.date).toUTCString()
      posts.push(post)
    }
  }

  posts = posts.sort((first, second) =>
    new Date(second.date).getTime() - new Date(first.date).getTime()
  )

  const totalCount = posts.length

  if (params && params.slugList) {
    posts = posts.filter(i => params.slugList?.includes(i.slug))
  }

  if (params && params.tag) {
    posts = posts.filter(i => i.tags && i.tags.includes(params.tag!))
  }

  if (params && params.page) {
    const startIndex = (params.page - 1) * itemsPerPage
    posts = posts.slice(startIndex, startIndex + itemsPerPage)
  }

  return { items: posts, totalCount }
}
