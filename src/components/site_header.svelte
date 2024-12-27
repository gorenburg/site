<script lang="ts">
  import * as config from '$lib/config'
  import { base } from '$app/paths'
  import IconCode from '$lib/icons/code.svg?raw'
  import IconImage from '$lib/icons/image.svg?raw'
  import IconMap from '$lib/icons/map.svg?raw'
</script>

<header class="wrapper page-header">
  <section class="header-profile">
    <a href="{base}/" class="header-logo">
      <img src="/images/avatar.jpg" width="64" height="64" class="header-avatar" alt={config.title}>
    </a>
    <div class="header-profile-inner">
      <a href="{base}/" class="header-profile-link">{config.title}</a>
      <section class="header-description">{config.description}</section>
    </div>
  </section>
  <nav>
    <ul class="header-menu">
      <li>
        <a href="{base}/map">
          {@html IconMap}
          <br>map
        </a>
      </li>
      <li>
        <a href="{base}/tag/photos">
          {@html IconImage}
          <br>photos
        </a>
      </li>
      <li>
        <a href="{base}/tag/code">
          {@html IconCode}
          <br>code
        </a>
      </li>
    </ul>
  </nav>
</header>

<style>
  a {
    text-decoration: none;
  }

  .page-header {
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    font-family: var(--font-secondary);
  }

  @media (min-width: 48rem) {
    .page-header {
      padding-top: 3rem;
      padding-bottom: 3rem;
      flex-direction: row;
    }
  }

  .header-profile {
    display: flex;
    align-items: center;
    line-height: 1.33;
    gap: 1rem;
  }

  .header-avatar {
    border-radius: .375rem;
  }

  .header-profile-link {
    font-weight: 700;
    font-size: 1.125rem;
    text-decoration: none;
    color: var(--text-color);
  }

  .header-profile-link:hover {
    color: var(--link-hover-color);
    text-decoration: underline;
  }

  .header-description {
    color: var(--text-secondary-color);
    line-height: 1.2;
  }

  .header-menu {
    display: flex;
    gap: .5rem 1.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: center;
  }

  .header-menu :global {
    svg {
      width: 1.5rem;
      height: 1.5rem;
      fill: var(--text-color);
      vertical-align: top;
      transition: fill .15s linear;
    }
  }

  .header-menu a:hover :global {
    svg {
      fill: var(--link-color);
    }
  }
</style>