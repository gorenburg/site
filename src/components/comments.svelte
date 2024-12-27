<script lang="ts">
	import { onDestroy, onMount } from "svelte"

  let commentsEl: HTMLElement
  let observer: IntersectionObserver

  const options: IntersectionObserverInit = {
    threshold: 1.0,
  }

  onMount(() => {
    observer = new IntersectionObserver(loadCommentsLibrary, options)
    observer.observe(commentsEl)
  })

  onDestroy(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  function loadCommentsLibrary(): void {
    const scriptEl = Object.assign(document.createElement('script'), {
      src: 'https://chirpy.dev/bootstrapper.js'
    })

    scriptEl.setAttribute('data-chirpy-domain', 'ilya.gorenburg.com')
    document.body.appendChild(scriptEl)
  }
</script>

<div class="comments-section" bind:this={commentsEl}>
  <div
    data-chirpy-theme="system"
    data-chirpy-comment="true"
    id="chirpy-comment"
  ></div>
</div>
