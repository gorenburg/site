<script lang="ts">
  import * as config from '$lib/config'
  import { page } from '$app/state'
	import Pagination from '../../../components/pagination.svelte'
	import PostsList from '../../../components/posts_list.svelte'
  let { data } = $props()
</script>

<svelte:head>
  <title>Page {page.params.slug}{config.siteTitle}</title>
</svelte:head>

<PostsList items={data.posts.items}></PostsList>

<Pagination page={parseInt(page.params.slug, 10)} totalItemsCount={data.posts.totalCount} />
