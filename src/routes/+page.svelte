<script lang="ts">
  import * as config from '$lib/config'
  import Featured from '../components/featured.svelte'
	import Pagination from '../components/pagination.svelte'
	import PostsList from '../components/posts_list.svelte'

  let { data } = $props()
</script>

<svelte:head>
  <title>{config.title}{config.siteTitle}</title>
</svelte:head>

<section>
  <Featured />

  <PostsList items={data.posts.items} />

  <Pagination page={1} totalItemsCount={data.posts.totalCount} />
</section>
