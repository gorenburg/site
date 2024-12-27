<script lang="ts">
  import { onDestroy, onMount } from "svelte"
  import BiggerPicture, { type BiggerPictureInstance } from 'bigger-picture'
	import Slot from "./slot.svelte"
  import { getPost } from "$lib/requests/post"

  type Props = {
    slug: string
  }

  let { slug }: Props = $props()

  let instaElement: HTMLElement
  let imgCollection: NodeListOf<HTMLAnchorElement>
  let biggerPicture: BiggerPictureInstance

  onMount(() => {
    biggerPicture = BiggerPicture({
      target: instaElement
    })
  })

  onDestroy(() => {
    if (imgCollection && imgCollection.length) {
      for (let link of imgCollection) {
        link.removeEventListener("click", openGallery)
      }
    }
  })

  function initBiggerPicture(): void {
    imgCollection = instaElement.querySelectorAll('a')

    for (let link of imgCollection) {
      link.addEventListener("click", openGallery)
    }
  }

  function openGallery(event: MouseEvent): void {
    event.preventDefault()
    biggerPicture.open({
      items: imgCollection,
      el: event.currentTarget as HTMLAnchorElement,
      intro: 'fadeup'
    })
  }
</script>

<style>
  :global {
    @import "bigger-picture/css";
  }
</style>

<div class="insta-grid" bind:this={instaElement}>
  {#await getPost(slug) then data}
    {@const Component = data.content}
    <Slot onMounted={initBiggerPicture}>
      <Component />
    </Slot>
  {/await}
</div>
