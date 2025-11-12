import { writable } from 'svelte/store';
import themesData from './themes.json';

export const themes = themesData.themes;

// Gets the current theme from the user's local storage or defaults to 'cream'
function getStoredTheme() {
  if (typeof window !== 'undefined') {
    try {
      const t = localStorage.getItem('theme');
      if (t && themes[t]) return t;
    } catch (e) { /* ignore */ }
  }
  return 'cream';
}

export const currentTheme = writable(getStoredTheme());

// Apply theme colors to CSS variables and toggle theme class on documentElement
function applyThemeVars(themeKey) {
  if (typeof window === 'undefined') return;
  const theme = themes[themeKey];
  if (!theme) return;
  const root = document.documentElement;
  const cols = theme.colors || {};
  root.style.setProperty('--base', cols.base ?? '');
  root.style.setProperty('--option', cols.option ?? '');
  root.style.setProperty('--highlight', cols.highlight ?? '');
  root.style.setProperty('--links', cols.links ?? '');

  // remove other theme classes and add this theme's class (if defined)
  Object.values(themes).forEach(t => {
    if (t.class) root.classList.remove(t.class);
  });
  if (theme.class) root.classList.add(theme.class);
}

// Initialize the theme when the app loads
export function initTheme() {
  if (typeof window === 'undefined') return;
  const storedTheme = getStoredTheme();
  currentTheme.set(storedTheme);
  applyThemeVars(storedTheme);
}

// This function will set the theme based on the theme name provided
export function setTheme(themeName) {
  if (typeof window === 'undefined') return;
  if (!themes[themeName]) return;
  try {
    localStorage.setItem('theme', themeName);
  } catch (e) {}
  currentTheme.set(themeName);
  applyThemeVars(themeName);
}

// ensure theme applied immediately if running in browser
if (typeof window !== 'undefined') {
  initTheme();  initTheme();
}

export const fontSizes = {
    tiny: 13,
    small: 14,
    default: 15,
    plus: 16,
    large: 18,
    xlarge: 20,
    huge: 22
};

function getStoredFontSize() {
    if (typeof window === 'undefined' ) return;
    try {
        const v = localStorage.getItem('fontSize');
        if (v && fontSizes[v]) return v;
    } catch (e) {}
    return 'default';
}

export const currentFontSize = writable(getStoredFontSize());

function applyFontSize(key) {
  if (typeof window === 'undefined') return;
  const px = fontSizes[key] ?? fontSizes.default;
  document.documentElement.style.setProperty('--base-font-size', px + 'px');
}

export function setFontSize(key) {
  if (typeof window === 'undefined') return;
  if (!fontSizes[key]) return;
  try { localStorage.setItem('fontSize', key); } catch (e) {}
  currentFontSize.set(key);
  applyFontSize(key);
}

if (typeof window !== 'undefined') {
  applyFontSize(getStoredFontSize());
}