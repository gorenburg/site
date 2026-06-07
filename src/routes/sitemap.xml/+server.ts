import { url } from "$lib/config"
import { getPosts } from "$lib/requests/posts"
import { error } from '@sveltejs/kit'
import type { Post } from '$lib/types'

export const prerender = true

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  try {
    const posts = await getPosts()
    const body = sitemap(posts.items)
    const response = new Response(body)
    response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600')
    response.headers.set('Content-Type', 'application/xml')
    return response
  } catch (e) {
    error(404, `Could not find sitemap.xml`)
  }
}

const sitemap = (pages: Post[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
  .map(
    (page) => {
      if (page.type === 'link') { return }

      return `
        <url>
          <loc>${url}${page.slug}</loc>
          <changefreq>monthly</changefreq>
          <lastmod>${new Date(page.date).toISOString().split('T')[0]}</lastmod>
          <priority>0.5</priority>
        </url>
      `
    }
  )
  .join('')}
</urlset>`