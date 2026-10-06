<script lang="ts">
  import SiteHeader from "../components/site_header.svelte"
  import SiteFooter from "../components/site_footer.svelte"
  import { page } from "$app/state"
  import { url } from "$lib/config"

  let { children } = $props()
</script>

<svelte:head>
  <link rel="canonical" href={new URL(page.url.pathname, url).href} />
</svelte:head>

<SiteHeader />

{@render children()}

<SiteFooter />
