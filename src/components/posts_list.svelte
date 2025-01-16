<script lang="ts">
	import { getPost } from "$lib/requests/post"
	import type { Post } from "$lib/types"
  import { base } from '$app/paths'
  import { getPreviewImageUrl } from "$lib/functions/base_path"

  import PostListItemMeta from "./post_list_item_meta.svelte"
	import Insta from "./insta.svelte"

  type Props = {
    items: Post[]
  }

  let { items }: Props = $props()
</script>

<ul class="posts wrapper">
  {#each items as post}
    <li class="post">
      {#if post.type === 'video' || post.type === 'quote'}
        {#await getPost(post.slug) then data}
          {@const Component = data.content}
          <Component />
        {/await}
        <PostListItemMeta slug={post.slug} date={post.date} type={post.type} tags={post.tags} hasLinks={true} />
      {:else if post.type === 'link' && post.link}
        <a href={post.link} target="_blank" class="h2">{post.title}</a>
        <PostListItemMeta slug={post.slug} date={post.date} type={post.type} tags={post.tags} hasLinks={true} />
      {:else if post.type === 'insta'}
        <Insta slug={post.slug} />
        {#if post.description}
          <p>{post.description}</p>
        {/if}
        <PostListItemMeta slug={post.slug} date={post.date} type={post.type} tags={post.tags} hasLinks={true} />
      {:else}
        <a href="{base}/{post.slug}" class="post-link">
          <h2 class="h3 post-title {post.tags.includes('talks') ? 'visibility-hidden' : ''}">{post.title}</h2>
          <PostListItemMeta slug={post.slug} date={post.date} type={post.type} tags={post.tags} hasLinks={false} />
          <img class="post-img" src={getPreviewImageUrl(post.preview)} alt={post.title} width="2048" height="1536" loading="lazy" />
        </a>
      {/if}
    </li>
  {/each}
</ul>

<style>
  .posts {
    list-style: none;
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
    font-family: var(--font-secondary);
  }

  .post {
    text-align: center;
    margin-bottom: 3rem;
  }

  .post-link {
    width: 100%;
    text-decoration: none;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding-top: 2rem;
    padding-bottom: 2rem;
    min-height: 30vh;
    color: var(--text-color);
  }

  :global {
    .post-link .post-meta {
      color: var(--text-color);
    }
  }

  .post-link:hover {
    color: var(--text-color);
  }

  .post-link:hover .post-title {
    text-decoration: underline;
  }

  .post-link:hover:before {
    opacity: .7;
  }

  .post-link:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 1.5rem;
    z-index: -1;
    opacity: 1;
    transition: opacity .15s linear;
    background: var(--background-overlay);
  }

  .post-img {
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 1.5rem;
    z-index: -2;
  }
</style>
