import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import autoImport from 'sveltekit-autoimport';

export default defineConfig({
  plugins: [
    autoImport({
      include: ['**/*.(svelte|md)'],
      components: ['./src/components'],
      module: {
        svelte: ['onMount']
      },
    }),
    sveltekit(),
  ]
});
