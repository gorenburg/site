import { error } from '@sveltejs/kit'
import { getExcerpt } from '$lib/functions/excerpt'

const rawPosts = import.meta.glob<string>('/src/posts/*.md', { query: '?raw', import: 'default' })

const slugRegExp = new RegExp(/^[0-9]{4}\/[0-9]{2}\/[0-9]{2}\//)

export async function load({ params }) {
  try {
    if (slugRegExp.test(params.slug)) {
      const slugDate = slugRegExp.exec(params.slug)![0]
      const formattedSlugDate = slugDate.split('/').join('-')
      params.slug = params.slug.replace(slugRegExp, formattedSlugDate)
    }

    const post = await import(`../../posts/${params.slug}.md`)
    const raw = await rawPosts[`/src/posts/${params.slug}.md`]?.()

    return {
      content: post.default,
      meta: post.metadata,
      excerpt: raw && getExcerpt(raw)
    }
  } catch (e) {
    error(404, `Could not find ${params.slug}`)
  }
}
