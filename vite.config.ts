import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { createHighlighter } from 'shiki';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type Plugin } from 'vite';
// @ts-expect-error package ships no types
import autoImport from 'sveltekit-autoimport';

// mdsvex 1.0 highlighters must be synchronous, so create shiki up front
const shiki = await createHighlighter({ themes: ['dark-plus'], langs: ['javascript', 'typescript'] });

// mdsvex 1.0 has no remark plugins, so turn kramdown-style `![alt](src){: k="v"}` / `[text](url){: k="v"}`
// (formerly remark-attr) into plain HTML before mdsvex parses the document
const escapeAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const markdownAttrs = (): Plugin => ({
  name: 'markdown-attrs',
  enforce: 'pre',
  transform(code, id) {
    if (!id.endsWith('.md')) return;
    return {
      map: null,
      code: code.replace(
        /(!?)\[([^\]]*)\]\(([^)\s]+)\)\{:\s*([^}]*?)\s*\}/g,
        (_, img, text, url, attrs) =>
          img
            ? `<img src="${escapeAttr(url)}" alt="${escapeAttr(text)}" ${attrs}>`
            : `<a href="${escapeAttr(url)}" ${attrs}>${text}</a>`
      )
    };
  }
});

export default defineConfig({
  plugins: [
    markdownAttrs(),
    mdsvex({
      extensions: ['.md'],
      heading_ids: true,
      highlight: (code, { lang, inline }) =>
        inline || !shiki.getLoadedLanguages().includes(lang)
          ? null
          : shiki.codeToHtml(code, { lang, theme: 'dark-plus' })
    }),
    autoImport({
      include: ['**/*.(svelte|md)'],
      components: ['./src/components'],
      module: {
        svelte: ['onMount']
      },
    }),
    sveltekit({
      extensions: ['.svelte', '.md'],
      adapter: adapter({
        pages: 'build',
        assets: 'build',
        strict: false,
        fallback: '404.html'
      }),
      prerender: {
        entries: ['*', '/sitemap.xml', '/rss.xml'],
        handleHttpError: 'warn'
      }
    })
  ]
});
