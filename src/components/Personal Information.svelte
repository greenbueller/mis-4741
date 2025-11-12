<script>
  export let formData = {};
  export let curYear = new Date().getFullYear();
</script>

<h3>Please enter this information for yourself, or your dependant.</h3>

<div class="formRow twoCols">
  <div class="col">
    <label for="firstName">First Name<span class="req"> *</span></label>
    <input id="firstName" class="field" type="text" bind:value={formData.firstName} placeholder="John" required />
  </div>
  <div class="col">
    <label for="lastName">Last Name<span class="req"> *</span></label>
    <input id="lastName" class="field" type="text" bind:value={formData.lastName} placeholder="Doe" required />
  </div>
</div>

<div class="formRow full">
  <h4>Date of Birth<span class="req"> *</span></h4>
  <div class="dobRow">
    <div class="col">
      <label for="dayClient">Day</label>
      <input id="dayClient" type="number" class="field" min="1" max="31" bind:value={formData.dayClient} placeholder=01/>
    </div>

    <div class="col">
      <label for="monthClient">Month</label>
      <select id="monthClient" class="field" bind:value={formData.monthClient}>
        <option value="" disabled>Select month</option>
        {#each Array(12) as _, i}
          <option value={i+1}>{new Date(0,i).toLocaleString(undefined,{month: 'long'})}</option>
        {/each}
      </select>
    </div>

    <div class="col">
      <label for="yearClient">Year</label>
      <input id="yearClient" type="number" class="field" min="1900" max={curYear} bind:value={formData.yearClient} placeholder={curYear}/>
    </div>
  </div>
</div>

<h4>Address<span class="req"> *</span></h4>
<div class="formRow full">
  <div class="col">
    <label for="clientAddress">Street Address<span class="req"> *</span></label>
    <input id="clientAddress" type="text" class="field" bind:value={formData.clientAddress} placeholder="100 Institute Road" />
  </div>
</div>

<div class="formRow threeCols">
  <div class="col">
    <label for="clientCity">City<span class="req"> *</span></label>
    <input id="clientCity" type="text" class="field" bind:value={formData.clientCity} placeholder="Worcester"/>
  </div>
  <div class="col">
    <label for="clientState">State<span class="req"> *</span></label>
    <input id="clientState" type="text" class="field" bind:value={formData.clientState} placeholder="MA"/>
  </div>
  <div class="col">
    <label for="clientZip">Zip Code<span class="req"> *</span></label>
    <input id="clientZip" type="text" class="field" bind:value={formData.clientZip} placeholder="01609"/>
  </div>
</div>

<h4>Phone Number<span class="req"> *</span></h4>
<div class="formRow threeCols phoneRow">
  <div class="col">
    <div class="area-wrap">
      <span class="paren">(</span>
      <input id="areaCode" class="field area-input" type="text" bind:value={formData.areaCode} maxlength="3" placeholder="508"/>
      <span class="paren">)</span>
    </div>
  </div>
  <div class="col">
    <input id="phoneNumTwo" class="field" type="text" bind:value={formData.phoneNumTwo} maxlength="3" placeholder="123"/>
  </div>
  <div class="col">
    <input id="phoneNumThree" class="field" type="text" bind:value={formData.phoneNumThree} maxlength="4" placeholder="4567"/>
  </div>
</div>

<div class="formRow full">
  <div class="col">
    <label for="email">Email Address<span class="req"> *</span></label>
    <input id="email" type="email" class="field" bind:value={formData.email} placeholder="sample@sample.com" />
  </div>
</div>

<style>
  h3, h4 { color:var(--option); }
  h3 { text-align: center; }
  /* reuse same styles you already have in Home.svelte for consistent layout */
  .formRow { display:flex; gap:1rem; margin-bottom:1rem; align-items:flex-end; width:100%; }
  .formRow.full { flex-direction:column; align-items:stretch; }
  .formRow.twoCols .col, .formRow.threeCols .col, .dobRow .col { flex:1 1 0; display:flex; flex-direction:column; }
  .field { width:100%; box-sizing:border-box; padding:0.5rem; border-radius:4px; border:1px solid #ccc; background:var(--base); color:var(--option); }
  .dobRow { display:flex; gap:1rem; width:100%; }
  .phoneRow .area-wrap { display:inline-flex; align-items:center; gap:0.35rem; }
  .phoneRow .paren { color:var(--option); }
  .area-input { width:5rem; }
  label { margin-bottom:0.25rem; color:var(--option); }
</style>