<script lang="ts">
  import { slugify } from "$lib/functions/slugify"
	import type { PostType } from "$lib/types"
	import { formatDate } from "$lib/utils"
  import { base } from '$app/paths'

  import IconImage from '$lib/icons/image.svg?raw'
  import IconVideo from '$lib/icons/video.svg?raw'
  import IconQuote from '$lib/icons/quote.svg?raw'
  import IconGrid from '$lib/icons/grid.svg?raw'
  import IconExternal from '$lib/icons/external.svg?raw'
  import IconChat from '$lib/icons/chat.svg?raw'

  type Props = {
    date: string
    slug: string
    tags: string[]
    hasLinks: boolean
    type: PostType
  }

  let { date, slug, tags, hasLinks, type }: Props = $props()
</script>

<span class="post-meta">
  {#if hasLinks}
    <a href="{base}/{slug}">
      <time class="post-date" datetime={formatDate(date, 'long')}>{formatDate(date)}</time>
    </a>
  {:else}
    <time class="post-date" datetime={formatDate(date, 'long')}>{formatDate(date)}</time>
  {/if}
  •
  {#if type === 'photos'}
    {@html IconImage}
  {:else if type === 'video'}
    {@html IconVideo}
  {:else if type === 'quote'}
    {@html IconQuote}
  {:else if type === 'insta'}
    {@html IconGrid}
  {:else if type === 'link'}
    {@html IconExternal}
  {:else if type === 'talks'}
    {@html IconChat}
  {/if}
  •
  <ul class="post-tags">
    {#each tags as tag}
      <li class="post-tag">
        {#if hasLinks}
          <a href="{base}/tag/{slugify(tag)}">&num;{slugify(tag)}</a>
        {:else}
          &num;{slugify(tag)}
        {/if}
      </li>
    {/each}
  </ul>
</span>

<style>
  .post-meta, .post-meta a {
    color: var(--text-secondary-color);
  }

  .post-meta :global {
    svg {
      width: 1.25rem;
      height: 1.25rem;
      vertical-align: top;
      fill: currentColor;
    }
  }
</style>
