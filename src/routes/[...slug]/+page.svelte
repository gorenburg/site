<script lang="ts">
  import * as config from '$lib/config'
	import { slugify } from '$lib/functions/slugify'
	import { formatDate } from '$lib/utils'
  import { onMount } from 'svelte'
  import { base } from '$app/paths'

	import Toc from '../../components/toc.svelte'
	import Comments from '../../components/comments.svelte'
	import Video from '../../components/video.svelte'

  let { data } = $props()

  setLangAttr()

  function setLangAttr(): void {
    if (!data.meta.lang) { return }

    onMount(() => {
      const documentEl = document.body.parentElement
      documentEl?.setAttribute('lang', data.meta.lang)
    })
  }

  function getPreviewImageUrl(path: string): string {
    if (path.includes('/cover/')) {
      return base + '/' + path
    }

    return path
  }
</script>

<svelte:head>
  <title>{data.meta.title}{config.siteTitle}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
  <meta name="twitter:title" content={data.meta.title} />
  <meta name="twitter:card" content="summary_large_image" />
  {#if data.meta.preview}
    <meta property="og:image" content={getPreviewImageUrl(data.meta.preview)} />
    <meta name="twitter:image" content={getPreviewImageUrl(data.meta.preview)} />
  {/if}
</svelte:head>

{#if data.meta.preview_video}
  <div class="preview-video">
    <Video src={data.meta.preview_video} isBackground={true} />
    <div class="preview-video-inner">
      <h1>{data.meta.title}</h1>
      {#if data.meta.subtitle}
        <p>{data.meta.subtitle}</p>
      {/if}
    </div>
  </div>
{/if}

<article>
  <hgroup class="wrapper text-center">
    {#if !data.meta.preview_video}
      <h1>{data.meta.title}</h1>
    {/if}
    <span class="post-meta">
      <time class="post-date" datetime={formatDate(data.meta.date, 'long')}>{formatDate(data.meta.date)}</time>
      •
      <ul class="post-tags">
        {#each data.meta.tags as tag}
          <li class="post-tag">
            <a href="{base}/tag/{slugify(tag)}">&num;{slugify(tag)}</a>
          </li>
        {/each}
      </ul>
    </span>
  </hgroup>

  {#if data.meta.toc}
    <Toc />
  {/if}

  <data.content />

  <Comments />
</article>

<style>
  :global {
    article > * {
      margin-top: 0;
      margin-bottom: var(--content-block-margin);
    }
    article > *:not(p:has(img)) {
      width: 100%;
      max-width: var(--content-width);
      padding-left: var(--content-padding);
      padding-right: var(--content-padding);
      margin-left: auto;
      margin-right: auto;
    }

    article > p:has(img) {
      max-width: 100%;
      margin-left: var(--content-padding);
      margin-right: var(--content-padding);
    }

    article > p:has(img) em {
      text-align: center;
      display: block;
    }

    article > p:has(a):has(img) {
      text-align: center;
    }

    img {
      max-width: 100%;
      height: auto;
    }
  }

  hgroup {
    margin-bottom: var(--content-block-margin);
  }

  .preview-video {
    position: relative;
  }

  .preview-video-inner {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translate(0, -50%);
    text-align: center;
  }

  .preview-video h1 {
    font-family: var(--font-primary);
    font-weight: 700;
  }
</style>
