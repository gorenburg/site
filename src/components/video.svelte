<script lang="ts">
	import { onMount } from "svelte";

  type Props = {
    src: string
    isBackground?: boolean
  }

  let { src, isBackground }: Props = $props()

  let videoEl: HTMLVideoElement

  onMount(() => {
    if (!videoEl) { return }

    if (isBackground) {
      videoEl.setAttribute('preload', 'auto')
      videoEl.muted = true
      videoEl.playsInline = true
      videoEl.controls = false
      videoEl.loop = true
      videoEl.autoplay = true
    } else {
      videoEl.setAttribute('preload', 'metadata')
      videoEl.controls = true
    }
  })
</script>

<div class="video">
  <video width="800" height="450" bind:this={videoEl}>
    <source src={src} type="video/mp4">
  </video>
</div>

<style>
  .video video {
    width: 100%;
    height: auto;
  }
</style>
