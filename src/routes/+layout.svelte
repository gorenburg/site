<script lang="ts">
  import SiteHeader from "../components/site_header.svelte"
  import SiteFooter from "../components/site_footer.svelte"

  let { children } = $props()
</script>

<SiteHeader />

{@render children()}

<SiteFooter />
