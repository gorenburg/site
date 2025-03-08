<div class="audio-player">
  <div class="audio-player-controls">
    <button class="audio-player-btn js-audio-play" type="button" aria-label="Play audio">
      <i class="fas fa-fw fa-play"></i>
    </button>
    <button class="audio-player-btn js-audio-pause hide" type="button" aria-label="Pause audio">
      <i class="fas fa-fw fa-pause"></i>
    </button>
  </div>
  <div class="audio-player-waveform">
    <button type="button" class="audio-player-placeholder audio-player-preloader js-audio-load">
      <span>
        <i class="fas fa-music fa-pad-right"></i>
        Load audio
      </span>
    </button>
    <div class="audio-player-placeholder audio-player-loading js-audio-loading hide">
      <i class="fas fa-spinner fa-spin"></i>
    </div>
    <div id="waveform"></div>
  </div>
</div>

<script lang="ts">
  type Props = {
    src: string
  }

  let { src }: Props = $props()

  import { onDestroy, onMount } from 'svelte'
	import { loadScript } from '$lib/functions/load_library'

  onMount(async () => {
    const audioLoaderEl = document.querySelector('.js-audio-loading')
    const preloadBtn = document.querySelector('.js-audio-load')
    const audioPlayEl = document.querySelector('.js-audio-play')
    const audioPauseEl = document.querySelector('.js-audio-pause')

    function createPlayer(): void {
      let isAudioReady = false
      let isPlayOnLoad = false

      const wavesurfer = WaveSurfer.create({
        container: '#waveform',
        barWidth: 2,
        height: 60
      })

      wavesurfer.on('ready', () => {
        audioLoaderEl!.classList.add('hide')
        isAudioReady = true
        if (isPlayOnLoad) {
          wavesurfer.play()
        }
      })

      wavesurfer.on('pause', () => {
        audioPlayEl!.classList.remove('hide')
        audioPauseEl!.classList.add('hide')
      })

      wavesurfer.on('play', () => {
        audioPlayEl!.classList.add('hide')
        audioPauseEl!.classList.remove('hide')
      })
      
      preloadBtn!.addEventListener('click', () => {
        loadAudio()
      })

      audioPlayEl!.addEventListener('click', () => {
        if (isAudioReady) {
          wavesurfer.play()
        } else {
          isPlayOnLoad = true
          loadAudio()
        }
      })

      audioPauseEl!.addEventListener('click', () => {
        wavesurfer.pause()
      })

      function loadAudio() {
        preloadBtn!.classList.add('hide')
        audioLoaderEl!.classList.remove('hide')
        wavesurfer.load(src)
      }
    }

    loadScript('https://unpkg.com/wavesurfer.js').then(() => {
      createPlayer()
    })

  })

  onDestroy(() => {
    
  })

</script>

<style>
  .audio-player {
    display: flex;
    align-items: stretch;
    background: var(--accent-color);
    border: .25rem solid transparent;
  }

  .audio-player-controls {
    padding-left: .25rem;
  }

  .audio-player-btn {
    background: transparent;
    border: 0;
    padding: 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: .25rem;
    outline: none;
  }

  .audio-player-waveform {
    flex-grow: 1;
    height: 3.75rem;
    position: relative;
    background: #fff;
  }

  .audio-player-preloader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 0;
    font-family: var(--font-secondary);
    font-size: 1rem;
    cursor: pointer;
    padding: 0;
    z-index: 3;
    outline: none;
  }
</style>
