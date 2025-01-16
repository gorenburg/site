import { getPosts } from '$lib/requests/posts'

export async function load({ fetch }) {
  const posts = await getPosts({ page: 1 })
  return { posts }
}
