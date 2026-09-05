<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  let isCommentsBlockLoaded = false;
  let commentsEl: HTMLElement;
  let observer: IntersectionObserver;

  const options: IntersectionObserverInit = {
    threshold: 1.0
  };

  onMount(() => {
    if (isCommentsBlockLoaded) {
      return;
    }
    observer = new IntersectionObserver(() => {}, options);
    observer.observe(commentsEl);
  });

  onDestroy(() => {
    if (observer) {
      observer.disconnect();
    }
  });
</script>

<div class="comments-section" bind:this={commentsEl}></div>
