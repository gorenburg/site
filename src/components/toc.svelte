<script lang="ts">
	import { onMount } from "svelte"
  import { page } from '$app/state'

  let titleList: HTMLHeadingElement[] = []

  onMount(() => {
    titleList = Array.from<HTMLHeadingElement>(document.body.querySelectorAll('h2, h3, h4, h5, h6'))
  })

  function scrollToSection(event: MouseEvent, id: string): void {
    const el = document.getElementById(id)
    if (!el) { return }

    event.preventDefault()
    el.scrollIntoView({ behavior: "smooth" })
  }
</script>

{#if titleList.length}
  <nav>
    <ol class="toc">
      {#each titleList as title}
        {#if title.id}
          <li>
            <a href="#{title.id}" on:click={(event) => scrollToSection(event, title.id)}>{title.textContent}</a>
          </li>
        {/if}
      {/each}
    </ol>
  </nav>
{/if}
