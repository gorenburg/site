<script lang="ts">
  import { base } from '$app/paths'
  import { getPosts } from '$lib/requests/posts'

  const slugList: string[] = [
    '2024/10/21/journey-to-six-lighthouses-in-quebec',
    '2021/03/06/abandoned-village',
    '2018/11/25/nikolskoe',
    '2017/09/25/burakovo',
  ]
</script>

{#await getPosts({ slugList }) then data}
  <div class="wrapper items-list">
    {#each data.items as item}
      <a href="{base}{item.slug}" class="item">
        <div class="square">
          <img class="img" src={item.preview} width="400" height="400" alt={item.title}>
        </div>
        <ul class="tags">
          {#each item.tags as tag}
            <li>&num;{tag}</li>
          {/each}
        </ul>
        <p class="title">{item.title}</p>
      </a>
    {/each}
  </div>
{/await}

<style>
  .items-list {
    display: none;
  }

  @media (min-width: 64rem) {
    .items-list {
      display: flex;
      gap: 1rem 1.5rem;
      margin-bottom: 2.5rem;
    }
  }

  .item {
    width: 100%;
    min-width: 0;
    font-size: .875rem;
    color: var(--text-color);
    text-decoration: none;
  }

  .square {
    width: 100%;
    padding-bottom: 100%;
    position: relative;
  }

  .square:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    opacity: 1;
    z-index: 1;
    transition: opacity .15s linear;
    background: var(--background-overlay);
  }

  .item:hover .square:before {
    opacity: .5;
  }

  .item:hover .title {
    text-decoration: underline;
  }

  .img {
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 1rem;
  }

  .tags {
    list-style: none;
    padding: 0;
    margin: .5rem 0 .25rem;
    display: flex;
    gap: .5rem;
  }

  .title {
    margin: 0;
  }
</style>