<script>
  export let formData = {};
  export let curYear = new Date().getFullYear();
</script>

<h3>I hereby certify that the information provided is true and accurate to the best of my knowledge.</h3>

<div class="formRow full">
  <div class="col">
    <label for="typedName">Typed Legal Name<span class="req"> *</span></label>
    <input id="typedName" class="field" type="text" bind:value={formData.typedName} placeholder="John Doe" />
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
  .formRow { display:flex; gap:1rem; margin-bottom:1rem; align-items:flex-start; width:100%; }
  .formRow.full { flex-direction:column; }
  .dobRow { display:flex; gap:1rem; width:100%; }
  .col { flex:1 1 0; display:flex; flex-direction:column; }
  label { margin-bottom:0.25rem; color:var(--option); }
  .field { padding:0.5rem; border-radius:4px; border:1px solid #ccc; background:var(--base); color:var(--option); width:100%; box-sizing:border-box; }
  .req { color:var(--highlight); margin-left:0.2em; }
</style>