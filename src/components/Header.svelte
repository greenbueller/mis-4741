<script>
    import Settings from './Settings.svelte';

    export let showSettings = true;

    let currentGreeting = '';
    let settingsComponent;
</script>

<!-- Header of the page -->
<header class="app-header">
  <div class="header-top">
    <div class="header-logo" style="display: flex; align-items: center;">
      <h1>Fictional Company</h1>
    </div>

    <!-- Settings Menu -->
    {#if showSettings}
      <div class="settings-container">
        <Settings bind:this={settingsComponent}/>
      </div>
    {/if}
  </div>

  <!-- Greetings -->
  <div class="header-greeting" style="display: flex; align-items: center;">
    <span class="greeting">
      {currentGreeting}
    </span>
  </div>
</header>
<hr class="header-divider">

<!-- CSS -->
<style>
  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .settings-container {
    flex-shrink: 0;
    margin-left: 1rem;
  }

  .header-greeting {
    margin-top: 0.5rem;
    width: 100%;
  }

  .greeting {
    color: var(--option);
    font-size: 1rem;
    line-height: 1.4;
    display: block;
  }

  .header-divider {
    border: none;
    height: 1px;
    background-color: var(--option);
    margin: 0;
    opacity: 0.3;
  }

  /* Desktop layout - greeting on the same line */
  @media (min-width: 768px) {
    .app-header {
      padding: 1rem 0;
    }
    
    .header-top {
      align-items: center;
    }
    
    .header-greeting {
      margin-top: 0;
      flex: 1;
      display: flex;
      justify-content: center;
    }
    
    .greeting {
      font-size: 1rem;
    }
    
    .header-logo h1 {
      font-size: 1.8rem;
    }
  }

  /* Large desktop layout - more spacing */
  @media (min-width: 1024px) {
    
    .greeting {
      font-size: 1.1rem;
    }
    
    .header-logo h1 {
      font-size: 2rem;
    }
  }

  /* Small mobile devices */
  @media (max-width: 480px) {
    .app-header {
      padding: 0.75rem;
    }
    
    .header-logo h1 {
      font-size: 1.5rem;
      margin-left: 8px;
    }
    
    .greeting {
      font-size: 0.9rem;
    }
    
    .header-greeting {
      margin-top: 0.75rem;
    }
  }

  /* Very small devices */
  @media (max-width: 320px) {
    .header-logo h1 {
      font-size: 1.3rem;
      margin-left: 6px;
    }
    
    .greeting {
      font-size: 0.85rem;
    }
  }
</style>