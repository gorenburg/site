<script lang="ts">
  import * as config from '$lib/config'
	import Frame from "../../components/frame.svelte"
</script>

<svelte:head>
  <title>Map of posts{config.siteTitle}</title>
</svelte:head>

<article class="wrapper">
  <h1 class="text-center">Map of posts</h1>
  <Frame src="https://www.google.com/maps/d/u/0/embed?mid=165sF4VKeOlwCln6A06BSI-YSgFui2evV" />
</article>

<style>
  h1 {
    margin-bottom: 2rem;
  }
</style>
