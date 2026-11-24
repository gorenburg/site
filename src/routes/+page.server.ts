import { getPosts } from '#lib/requests/posts.ts'

export async function load() {
  const posts = await getPosts({ page: 1 })
  return { posts }
}
