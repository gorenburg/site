<script lang="ts">
  import * as config from '$lib/config'
  import { page } from '$app/state'
  import { formatDate } from '$lib/utils'
  let { data } = $props()
</script>

<svelte:head>
  <title>Tag: &num;{page.params.slug}{config.siteTitle}</title>
</svelte:head>

<div class="wrapper">
  <h1 class="text-center">&num;{page.params.slug}</h1>
  
  <ul class="tag-list">
    {#each data.posts.items as post}
      <li class="tag-list-item">
        <h2><a href="/{post.slug}" class="title">{post.title}</a></h2>
        <p class="date">{formatDate(post.date)}</p>
      </li>
    {/each}
  </ul>
</div>

<style>
  h2, p {
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
      margin-bottom: .25rem;
    }

    + .tag-list-item {
      margin-top: var(--content-block-margin);
    }
  }
</style>