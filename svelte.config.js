import { mdsvex, escapeSvelte } from 'mdsvex'
import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import remarkAttr from 'remark-attr'
import rehypeSlug from 'rehype-slug'
import { createHighlighter } from 'shiki'

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: ['.md'],
  remarkPlugins: [remarkAttr],
  rehypePlugins: [rehypeSlug],
  highlight: {
    highlighter: async (code, lang = 'text') => {
      const highlighter = await createHighlighter({
        themes: ['dark-plus'],
        langs: ['javascript', 'typescript']
      })
      await highlighter.loadLanguage('javascript', 'typescript')
      const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'dark-plus' }))
      return `{@html \`${html}\` }`
    }
  },
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      strict: false,
      fallback: '404.html'
    }),
    prerender: {
      entries: [
        '*',
        '/sitemap.xml',
        '/rss.xml'
      ],
      handleHttpError: 'warn'
    },
    paths: {
			base: ''
		}
  },

  extensions: ['.svelte', '.md']
};

export default config;
