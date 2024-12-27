<script lang="ts">
  import IconX from '$lib/icons/x.svg?raw'
  import IconFacebook from '$lib/icons/facebook.svg?raw'
  import IconGithub from '$lib/icons/github.svg?raw'
  import IconLinkedIn from '$lib/icons/linkedin.svg?raw'
</script>

<footer class="footer-page wrapper">
  <nav>
    <ul class="footer-icons">
      <li>
        <a href="https://x.com/gorenburg" target="_blank" rel="noindex nofollow">{@html IconX}</a>
      </li>
      <li>
        <a href="https://facebook.com/ilya.gorenburg" target="_blank" rel="noindex nofollow">{@html IconFacebook}</a>
      </li>
      <li>
        <a href="https://linkedin.com/in/gorenburg" target="_blank" rel="noindex nofollow">{@html IconLinkedIn}</a>
      </li>
      <li>
        <a href="https://github.com/gorenburg" target="_blank" rel="noindex nofollow">{@html IconGithub}</a>
      </li>
    </ul>
  </nav>
</footer>

<style>
  .footer-page nav {
    border-top: .0625rem solid var(--border-color);
    margin-top: 3rem;
    padding-top: 3rem;
  }

  .footer-icons {
    list-style: none;
    display: flex;
    gap: .5rem 1rem;
    justify-content: center;
    padding: 0;
    margin: 0 0 3rem;
  }

  .footer-icons a :global {
    svg {
      width: 1.5rem;
      height: 1.5rem;
      vertical-align: top;
      fill: var(--text-secondary-color);
      transition: fill .15s linear;
    }
  }
  .footer-icons a:hover :global {
    svg {
      fill: var(--link-color);
    }
  }
</style>