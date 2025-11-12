import './app.css';
import App from './App.svelte';
import { currentTheme, setTheme, currentFontSize, setFontSize } from './utils/appearance.js';
import { initSettingsDelegate } from './utils/settings-helper.js';

const app = new App({
  target: typeof document !== 'undefined' ? document.body : null,
  props: {}
});

const getCurrent = () => {
  let val;
  const unsub = currentTheme.subscribe(v => (val = v));
  unsub();
  return val;
}

initSettingsDelegate({ currentTheme: getCurrent, setTheme, setFontSize })

export default app;