<script>
  import { onMount, onDestroy } from 'svelte';
  export let formData = {};
  export let curYear = new Date().getFullYear();

  let canvas;
  let ctx;
  let drawing = false;
  let last = { x: 0, y: 0 };
  let hasStroke = false;
  let savedData = null;
  let interactive = false; // true once canvas is initialized and pointer handlers attached

  function setCanvasSize(preserve = true) {
    if (!canvas) return;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const width = Math.min(880, Math.floor(window.innerWidth * 0.8));
    const height = 160;

    // preserve image
    const data = preserve && hasStroke ? canvas.toDataURL() : null;

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);

    ctx = canvas.getContext('2d');
    // reset transforms before scaling to avoid double-scaling
    ctx.setTransform(1,0,0,1,0,0);
    ctx.scale(ratio, ratio);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2.8; // CSS px width (will be scaled by ctx.scale)

    if (data) {
      const img = new Image();
      img.onload = () => {
        // draw image into canvas at CSS size (scaling handled by canvas pixel size)
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        hasStroke = true;
      };
      img.src = data;
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hasStroke = false;
    }
  }

  function getPointerPos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  function pointerDown(e) {
    drawing = true;
    const p = getPointerPos(e);
    last.x = p.x;
    last.y = p.y;
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    // capture pointer for touch/mouse continuity
    canvas.setPointerCapture?.(e.pointerId);
  }

  function pointerMove(e) {
    if (!drawing) return;
    const p = getPointerPos(e);
    const midX = (last.x + p.x) / 2;
    const midY = (last.y + p.y) / 2;
    ctx.quadraticCurveTo(last.x, last.y, midX, midY);
    ctx.stroke();
    last.x = p.x;
    last.y = p.y;
    hasStroke = true;
  }

  function pointerUp(e) {
    if (!drawing) return;
    drawing = false;
    ctx.closePath();
    try { canvas.releasePointerCapture?.(e.pointerId); } catch (err) {}
  }

  function clearSig() {
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    hasStroke = false;
    formData.signatureDataUrl = '';
  }

  function saveSig() {
    if (!canvas) return;
    if (!hasStroke) {
      window.alert('Please sign before saving.');
      return;
    }
    // save CSS-sized image (toDataURL uses full pixel buffer)
    formData.signatureDataUrl = canvas.toDataURL('image/png');
  }

  onMount(() => {
    // ensure canvas sizing and then attach listeners to canvas itself
    setCanvasSize(false);

    // pointer events on canvas for reliable capture (works across browsers)
    canvas.addEventListener('pointerdown', pointerDown);
    canvas.addEventListener('pointermove', pointerMove);
    canvas.addEventListener('pointerup', pointerUp);
    canvas.addEventListener('pointercancel', pointerUp);

    // make canvas focusable (optional) so accessibility tools can reach it
    canvas.tabIndex = 0;

    interactive = true;

    // resize handling
    const onResize = () => {
      // preserve drawing across resize
      setCanvasSize(true);
    };
    window.addEventListener('resize', onResize);

    onDestroy(() => {
      canvas.removeEventListener('pointerdown', pointerDown);
      canvas.removeEventListener('pointermove', pointerMove);
      canvas.removeEventListener('pointerup', pointerUp);
      canvas.removeEventListener('pointercancel', pointerUp);
      window.removeEventListener('resize', onResize);
    });
  });
</script>

<h3>I hereby certify that the information provided is true and accurate to the best of my knowledge.</h3>

<div class="formRow full">
  <div class="col">

    {#if formData.signatureDataUrl}
      <div style="margin-top:0.5rem;">
        <img src={formData.signatureDataUrl} alt="Saved Signature" style="max-width:100%; border-radius:4px; border:1px solid #ddd;" />
      </div>
    {:else}
      {#if !interactive}
        <div style="color:var(--option); margin-top:0.5rem;"><em>Provide print your name to confirm</em></div>

        <div class="col" style="margin-top:0.5rem;">
          <label for="typedName">Typed Name<span class="req"> *</span></label>
          <input id="typedName" class="field" type="text" bind:value={formData.typedName} placeholder="John Doe" />
        </div>
      {/if}
    {/if}
  </div>
</div>

<div class="formRow full">
  <h4>Date<span class="req"> *</span></h4>
  <div class="dobRow">
    <div class="col">
      <label for="dayForm">Day</label>
      <input id="dayForm" type="number" class="field" min="1" max="31" bind:value={formData.dayForm} />
    </div>

    <div class="col">
      <label for="monthForm">Month</label>
      <select id="monthForm" class="field" bind:value={formData.monthForm}>
        <option value="" disabled>Select month</option>
        {#each Array(12) as _, i}
          <option value={i+1}>{new Date(0,i).toLocaleString(undefined,{month: 'long'})}</option>
        {/each}
      </select>
    </div>

    <div class="col">
      <label for="yearForm">Year</label>
      <input id="yearForm" type="number" class="field" min="1900" max={curYear} bind:value={formData.yearForm} />
    </div>
  </div>
</div>

<style>
  .sig-canvas { border:1px solid rgba(0,0,0,0.06); border-radius:6px; display:block; width:100%; height:160px; touch-action: none; background: #fff; }
  .formRow { display:flex; gap:1rem; margin-bottom:1rem; align-items:flex-start; width:100%; }
  .formRow.full { flex-direction:column; }
  .dobRow { display:flex; gap:1rem; width:100%; }
  .col { flex:1 1 0; display:flex; flex-direction:column; }
  label { margin-bottom:0.25rem; color:var(--option); }
  .field { padding:0.5rem; border-radius:4px; border:1px solid #ccc; background:var(--base); color:var(--option); width:100%; box-sizing:border-box; }
  .btn { padding:0.4rem 0.75rem; border-radius:6px; margin-right:0.5rem; cursor:pointer; }
  .btn.primary { background:var(--highlight); color:var(--base); border:none; }
  .req { color:var(--highlight); margin-left:0.2em; }
</style>