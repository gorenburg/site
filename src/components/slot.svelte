<script lang="ts">
	import { onMount } from "svelte"

  export let onMounted: () => void

  onMount(() => {
    if (onMounted) {
      onMounted()
    }
  })
</script>

<slot />
