<script lang="ts">
  type Props = {
    src: string
    title?: string
    height?: number
  }

  let { src, title, height }: Props = $props()
</script>

<div class="iframe">
  <div class="iframe-wrapper">
    <iframe
      {src} 
      title={title ? title : 'iframe'}
      width="800"
      height={height ? height: 450 }
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      allowfullscreen
    ></iframe>
  </div>
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
