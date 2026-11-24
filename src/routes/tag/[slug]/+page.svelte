<script lang="ts">
  import * as config from '#lib/config.ts';
  import { page } from '$app/state';
  import { formatDate } from '#lib/utils.ts';
  import { resolve } from '$app/paths';

  let { data } = $props();
</script>

<svelte:head><title>Tag: #{page.params.slug}{config.siteTitle}</title></svelte:head>

<div class="wrapper">
  <h1 class="text-center">#{page.params.slug}</h1>

  <ul class="tag-list">
    {#each data.posts.items as post}
      <li class="tag-list-item">
        <h2><a href={resolve(post.slug)} class="title">{post.title}</a></h2>
        <time class="date" datetime={formatDate(post.date)}>{formatDate(post.date)}</time>
      </li>
    {/each}
  </ul>
</div>

<style>
  h2 {
    margin-top: 0;
    margin-bottom: 0;
  }

  .tag-list {
    list-style: none;
    margin: var(--content-block-margin) 0 0;
    padding: 0;
  }

  .tag-list-item {
    h2 {
      margin-bottom: 0.25rem;
    }

    + .tag-list-item {
      margin-top: var(--content-block-margin);
    }
  }
</style>
