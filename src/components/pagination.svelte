<script lang="ts">
	import { itemsPerPage } from "$lib/config";

  type Props = {
    page: number
    totalItemsCount: number
  }

  let { page, totalItemsCount }: Props = $props()

  const pageCount = Math.ceil(totalItemsCount / itemsPerPage)
</script>

<div class="pagination wrapper">
  {#if page === 1}
    <span class="visibility-hidden">Prev</span>
  {:else}
    <a href="/page/{page - 1}" class="prev">Prev</a>
  {/if}

  <ul class="pages-list">
    
    {#each Array.from({ length: pageCount }, (_, i) => i + 1) as i}
      <li>
        {#if i === 1 && page !== i}
          <a href="/">{i}</a>
        {:else if page === i}
          <span class="active">{i}</span>
        {:else}
          <a href="/page/{i}">{i}</a>
        {/if}
      </li>
    {/each}
  </ul>

  {#if page === pageCount}
    <span class="visibility-hidden">Next</span>
  {:else}
    <a href="/page/{page + 1}" class="next">Next</a>
  {/if}
</div>

<style>
  a {
    color: var(--text-secondary-color);
    text-decoration: none;
  }

  a:hover {
    color: var(--link-hover-color)
  }

  .pagination {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-secondary);
  }

  .pages-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: .5rem 1rem;
  }

  .prev:before {
    content: '\2190';
    margin-right: .25rem;
  }

  .next:after {
    content: '\2192';
    margin-left: .25rem;
  }
</style>
