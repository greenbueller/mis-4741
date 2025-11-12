<script>
  import { onMount, onDestroy } from 'svelte';
  import { get } from 'svelte/store';
  import { themes, currentTheme, setTheme } from '../utils/appearance.js';

  export let showSettings = true;
  let settingsVisible = false;
  let rootEl;
  let unsubscribe;
  let rootClickHandler;

  function updateDom(visible) {
    const menu = rootEl?.querySelector('#settingsMenu');
    const current = get(currentTheme);
    if (menu) menu.style.display = visible ? 'block' : 'none';
    if (menu) {
      menu.querySelectorAll('.theme-option').forEach(o => {
        o.classList.toggle('active', o.dataset.key === current);
      });
      const fv = menu.querySelector('.font-value');
      if (fv) {
        const applied = (getComputedStyle(document.documentElement).getPropertyValue('--base-font-size') || '').trim();
        fv.textContent = applied || '';
      }
    }
  }

  function nativeToggle() {
    settingsVisible = !settingsVisible;
    console.debug('[Settings] nativeToggle ->', settingsVisible);
    requestAnimationFrame(() => updateDom(settingsVisible));
  }

  function nativeChangeTheme(key) {
    setTheme(key);
    settingsVisible = false;
    requestAnimationFrame(() => updateDom(false));
  }

  function handleWindowClick(e) {
    if (!rootEl) return;
    const menu = rootEl.querySelector('#settingsMenu');
    if (!menu) return;
    const btn = rootEl.querySelector('#btn');
    if (!menu.contains(e.target) && !btn.contains(e.target) && settingsVisible) {
      settingsVisible = false;
      requestAnimationFrame(() => updateDom(false));
    }
  }

  onMount(() => {
    // --- CHANGED: attach delegated listener to document (survives HMR / DOM replacement) ---
    rootClickHandler = (e) => {
      // prefer closest for robustness
      const btn = e.target?.closest ? e.target.closest('#btn') : null;
      if (btn && rootEl && rootEl.contains(btn)) {
        e.stopPropagation();
        nativeToggle();
        return;
      }
      const opt = e.target?.closest ? e.target.closest('.theme-option') : null;
      if (opt && rootEl && rootEl.contains(opt)) {
        const key = opt.dataset.key;
        nativeChangeTheme(key);
      }
    };

    // attach delegated listener to the document so it remains active across HMR
    document.addEventListener('click', rootClickHandler);

    // keep highlight in sync with store
    unsubscribe = currentTheme.subscribe(() => {
      requestAnimationFrame(() => updateDom(settingsVisible));
    });

    // close on outside click (keep it; it's separate from delegated handler)
    window.addEventListener('click', handleWindowClick);

    // initial DOM sync
    updateDom(settingsVisible);
    console.debug('[Settings] mounted (document delegated listener attached)');
  });

  onDestroy(() => {
    // remove the document listener and other cleanup
    if (rootClickHandler) document.removeEventListener('click', rootClickHandler);
    unsubscribe?.();
    window.removeEventListener('click', handleWindowClick);
  });
</script>

{#if showSettings}
<div id="settings" bind:this={rootEl} style="position:relative;">
    <button id="btn" type="button" aria-haspopup="true" aria-expanded="false" title="Settings" style="z-index:2000; position:relative;">
        <span role="img" aria-label="Settings" style="font-size: 24px; display:inline-block;">⚙</span>
    </button>

    <div id="settingsMenu" role="menu" tabindex="-1" style="display: none; position: absolute; right: 0; top: calc(100% + 6px); z-index:1999;">
        <div class="theme-selector">
            <div class="theme-label">Theme:</div>
            {#each Object.entries(themes) as [key, theme]}
                <button type="button" class="theme-option" data-key={key}>
                    {theme.name}
                </button>
            {/each}
        </div>
        <hr>
        <div class="font-selector">
            <button class="font-arrow" data-action="decrease" aria-label="Decrease text size" type="button" style="padding:4px 8px;">&larr;</button>
            <div class="font-display" style="min-width:56px; text-align:center;">
                <div style="font-size:0.8rem; color:var(--option)">Text size</div>
                <div class="font-value" style="font-weight:600; margin-top:3px;">15px</div>
            </div>
            <button class="font-arrow" data-action="increase" aria-label="Increase text size" type="button" style="padding:4px 8px;">&rarr;</button>
        </div>
    </div>
 </div>
{/if}

<style>
  #btn { 
    background: none; 
    border: none; 
    cursor: pointer; 
    padding: 0.25rem; 
    display: inline-flex; 
    align-items: center; 
    justify-content: center; 
}

#settingsMenu { 
    background: var(--base); 
    color: var(--option); 
    border: 1px solid rgba(0,0,0,0.08); 
    padding: 0.5rem; 
    border-radius: 6px; 
    box-shadow: 0 6px 18px rgba(0,0,0,0.08); 
    min-width: 180px; 
    pointer-events: auto; 
}

.theme-selector { 
    display:flex; 
    flex-direction:column; 
    gap:0.4rem; 
}

.theme-option { 
    border: 1px solid var(--links); 
    background: var(--base); 
    color: var(--option); 
    padding: 0.25rem 0.5rem; 
    border-radius: 4px; 
    cursor: pointer; 
    text-align: center; 
}

.font-selector {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

/* override global rule that made #settingsMenu buttons 100% wide */
#settingsMenu .font-arrow {
  width: auto !important;
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  padding: 4px 8px !important;
}

/* keep theme-option buttons full width but not arrows */
#settingsMenu .theme-option {
  width: 100% !important;
  text-align: left;
}

/* font display styling */
.font-display { min-width: 64px; text-align: center; }
.font-value { font-weight: 600; margin-top: 3px; }

.font-arrow {
    background: none;
    border: 1px solid rgba(0,0,0,0.08);
    color: var(--option);
    border-radius: 4px;
    cursor: pointer;
}
</style>