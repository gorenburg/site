import { error } from '@sveltejs/kit'

import { getPosts } from '#lib/requests/posts.ts'

export async function load({ params }) {
  const tag = params.slug
  try {
    const posts = await getPosts({ tag })
    return { posts }
  } catch {
    error(404, `Could not find ${params.slug}`)
  }
}

