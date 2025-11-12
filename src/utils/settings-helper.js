export function initSettingsDelegate({ currentTheme, setTheme, setFontSize }) {
    const sizes = [
        { key: 'tiny', px: 13},
        { key: 'small', px: 14},
        { key: 'default', px: 15},
        { key: 'plus', px: 16},
        { key: 'large', px: 18},
        { key: 'xlarge', px: 20},
        { key: 'huge', px: 22}
    ]
    
    function findNearestIndex(px) {
        const n = Number(px) || 0;
        let bestIdx = 0;
        let bestDist = Math.abs(px - sizes[0].px);
        for (let i = 1; i < sizes.length; i++) {
            const d = Math.abs(px - sizes[i].px)
            if (d < bestDist) {
                bestDist = d;
                bestIdx = i;
            }
        }
        return bestIdx;
    }

  function updateDomForRoot(root, visible) {
    if (!root) return;
    const menu = root.querySelector('#settingsMenu');
    const btn = root.querySelector('#btn');
    const badge = root.querySelector('.settings-debug-badge');
    if (menu) menu.style.display = visible ? 'block' : 'none';
    if (btn) btn.setAttribute('aria-expanded', visible ? 'true' : 'false');
    if (badge) badge.textContent = visible ? 'true' : 'false';

    // update active class from store
     const current = typeof currentTheme === 'function' ? currentTheme() : currentTheme;
    const rootStyle = getComputedStyle(document.documentElement);
    const highlight = (rootStyle.getPropertyValue('--highlight') || '').trim();
    const base = (rootStyle.getPropertyValue('--base') || '').trim();

    if (menu) {
      menu.querySelectorAll('.theme-option').forEach(o => {
        const isActive = o.dataset.key === current;
        o.classList.toggle('active', isActive);
        if (isActive) {
          if (highlight) o.style.background = highlight;
          if (base) o.style.color = base;
          if (highlight) o.style.borderColor = highlight;
          o.style.fontWeight = '600';
        } else {
          // clear inline overrides for non-active
          o.style.background = '';
          o.style.color = '';
          o.style.borderColor = '';
          o.style.fontWeight = '';
        }
      });

        const fv = menu.querySelector('.font-value');
        if (fv) {
            const applied = (getComputedStyle(document.documentElement).getPropertyValue('--base-font-size') || '').trim();
            fv.textContent = applied || '';
        }
    }
  }

  function closeAll() {
    document.querySelectorAll('#settings').forEach(root => updateDomForRoot(root, false));
  }

  function onDocClick(e) {
    // gear button clicked
    const btn = e.target?.closest?.('#btn');
    if (btn) {
      e.stopPropagation();
      const root = btn.closest('#settings');
      const menu = root?.querySelector('#settingsMenu');
      const visible = menu && menu.style.display === 'block' ? false : true;
      updateDomForRoot(root, visible);
      return;
    }

    // theme option clicked
    const opt = e.target?.closest?.('.theme-option');
    if (opt) {
      const root = opt.closest('#settings');
      const key = opt.dataset.key;
      if (typeof setTheme === 'function') setTheme(key);
      updateDomForRoot(root, false);
      return;
    }

    const arrow = e.target?.closest?.('.font-arrow');
    if (arrow) {
        const action = arrow.dataset.action;
        const appliedPxStr = (getComputedStyle(document.documentElement).getPropertyValue('--base-font-size') || '15px').trim();
        const appliedPx = parseInt(appliedPxStr, 10) || 15;
        const idx = findNearestIndex(appliedPx);
        let newIdx = idx;
        if (action === 'decrease') {
            newIdx = Math.max(0, idx - 1);
        }
        if (action === 'increase') {
            newIdx = Math.min(sizes.length - 1, idx + 1);
        }
        const newKey = sizes[newIdx].key;
        if (typeof setFontSize === 'function' && newKey) {
            setFontSize(newKey);
        }
        // update UI for the specific settings root
        const root = arrow.closest('#settings');
        updateDomForRoot(root, true);
        return;
      }
    // outside click -> close all menus
    const insideSettings = !!e.target?.closest?.('#settings');
    if (!insideSettings) closeAll();
  }

  document.addEventListener('click', onDocClick);
  return () => document.removeEventListener('click', onDocClick);
}