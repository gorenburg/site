<script lang="ts">
  type Props = {
    src: string
  }

  let { src }: Props = $props()
</script>

<div class="iframe-wrapper">
  <iframe
    {src} 
    width="600"
    height="450"
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    allowfullscreen
  ></iframe>
</div>

<style>
  .iframe-wrapper {
    position: relative;
    padding-bottom: 56.25%;
  }

  .iframe-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
