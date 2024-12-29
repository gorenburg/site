import { error } from '@sveltejs/kit'

import { getPosts } from '$lib/requests/posts'

export async function load({ params }) {
  const page = parseInt(params.slug)
  try {
    const posts = await getPosts({ page })
    return { posts }
  } catch (e) {
    error(404, `Could not find ${params.slug}`)
  }
}
