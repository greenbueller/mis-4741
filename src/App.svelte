<script>
  import { onMount } from 'svelte';
  import Home from './components/Home.svelte';

  let currentRoute = 'home';
  let authWatchInterval = null;

  // On mounting the app, determine the current route and start auth watching
  onMount(() => {
    const path = window.location.pathname;
    currentRoute = path === '/' ? 'home' : path;
    window.addEventListener('popstate', () => {
      const p = window.location.pathname.replace(/^\/+|\/+$/g, '');
      currentRoute = p === '' ? 'home' : p;
    });
  });

  // Function to navigate to a specific route
  function navigateTo(route) {
    const url = route === 'home' ? '/' : `/${route}`;
    history.pushState({}, '', url);
    currentRoute = route;
  }
</script>

<!-- Route Navigation Tree -->
{#if currentRoute === 'home'}
  <Home {navigateTo} />
{:else}
  <Home {navigateTo} />
{/if}