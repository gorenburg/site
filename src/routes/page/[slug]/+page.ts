import { error } from '@sveltejs/kit'

import { getPosts } from '#lib/requests/posts.ts'

export async function load({ params }) {
  const page = parseInt(params.slug)
  try {
    const posts = await getPosts({ page })
    return { posts }
  } catch {
    error(404, `Could not find ${params.slug}`)
  }
}
