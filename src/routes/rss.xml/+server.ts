import * as config from '$lib/config'
import { getPosts } from "$lib/requests/posts"
import { error } from '@sveltejs/kit'

export const prerender = true

export async function GET({ fetch }) {
  try {
    const posts = await getPosts({ page: 1 })
    const body = `
      <rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
        <channel>
          <title>${config.title}</title>
          <description>${config.description}</description>
          <link>${config.url}</link>
          <atom:link href="${config.url}/rss.xml" rel="self" type="application/rss+xml"/>
          ${posts.items
            .map(
              (post) => `
              <item>
                <title>${post.title}</title>
                <description>${post.description}</description>
                <link>${config.url}/${post.slug}</link>
                <guid isPermaLink="true">${config.url}/${post.slug}</guid>
                <pubDate>${new Date(post.date).toUTCString()}</pubDate>
              </item>
            `
            )
            .join('')}
        </channel>
      </rss>
    `.trim()
    const response = new Response(body)
    response.headers.set('Content-Type', 'application/xml')
    return response
  } catch (e) {
    error(404, `Could not find sitemap.xml`)
  }
}
