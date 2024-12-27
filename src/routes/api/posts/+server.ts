import { json } from '@sveltejs/kit'
import { getPosts } from '$lib/requests/posts'

export async function GET(): Promise<Response> {
  const posts = await getPosts()
  return json(posts)
}
