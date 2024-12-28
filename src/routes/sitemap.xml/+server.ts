import { url } from "$lib/config"
import { getPosts } from "$lib/requests/posts"
import { error } from '@sveltejs/kit'
import type { Post } from '$lib/types'

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
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  ${pages
  .map(
    (page) => {
      if (page.type === 'link') { return }

      return `
        <url>
          <loc>${url}${page.slug}</loc>
          <changefreq>monthly</changefreq>
          <priority>0.5</priority>
        </url>
      `
    }
  )
  .join('')}
</urlset>`