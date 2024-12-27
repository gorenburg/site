<script lang="ts">
  import SiteFooter from "../components/site_footer.svelte";
  import SiteHeader from "../components/site_header.svelte";

  let { children } = $props()
</script>

<SiteHeader />

{@render children()}

<SiteFooter />
