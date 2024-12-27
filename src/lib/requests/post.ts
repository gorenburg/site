import type { Post } from '$lib/types'
import { error } from '@sveltejs/kit'

const slugRegExp = new RegExp(/^[0-9]{4}\/[0-9]{2}\/[0-9]{2}\//)

export async function getPost(slug: string): Promise<{ content: ConstructorOfATypedSvelteComponent, meta: Post }> {
  try {
    if (slugRegExp.test(slug)) {
      const slugDate = slugRegExp.exec(slug)![0]
      const formattedSlugDate = slugDate.split('/').join('-')
      slug = slug.replace(slugRegExp, formattedSlugDate)
    }

    const post = await import(`../../posts/${slug}.md`)

    return {
      content: post.default,
      meta: post.metadata
    }
  } catch (e) {
    error(404, `Could not find ${slug}`)
  }
}
