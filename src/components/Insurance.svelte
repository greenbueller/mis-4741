<script>
  export let formData = {};
  export let curYear = new Date().getFullYear();
</script>

<div class="formRow full">
  <div class="col">
    <label for="insurer">Insurance Provider<span class="req"> *</span></label>
    <input id="insurer" class="field" type="text" bind:value={formData.insurer} placeholder="Blue Cross Blue Shield, Always, United"/>
  </div>
</div>

<div class="formRow twoCols">
  <div class="col">
    <label for="policyNumber">Policy Number<span class="req"> *</span></label>
    <input id="policyNumber" class="field" type="text" bind:value={formData.policyNumber} placeholder="POL-123456"/>
  </div>
  <div class="col">
    <label for="groupNumber">Group Number<span class="req"> *</span></label>
    <input id="groupNumber" class="field" type="text" bind:value={formData.groupNumber} placeholder="GR-123456"/>
  </div>
</div>

<h4>Primary Insured</h4>
<h5>This is only if the person who this form is for is not the primary insured.</h5>
<div class="formRow full">
    <div class="col">
        <label for="primaryName">Primary Insured Name - If Different</label>
        <input id="primaryName" class="field" type="text" bind:value={formData.primaryName} placeholder="John Doe"/>
    </div>
</div>

<div class="formRow threeCols">
    <div class="dobRow">
        <div class="col">
            <label for="dayPrimary">Day</label>
            <input id="dayPrimary" type="number" class="field" min="1" max="31" bind:value={formData.dayPrimary} placeholder=01/>
        </div>

        <div class="col">
            <label for="monthPrimary">Month</label>
            <select id="monthPrimary" class="field" bind:value={formData.monthPrimary}>
                <option value="" disabled>Select month</option>
                    {#each Array(12) as _, i}
                        <option value={i+1}>{new Date(0,i).toLocaleString(undefined,{month: 'long'})}</option>
                    {/each}
            </select>
        </div>

        <div class="col">
            <label for="yearPrimary">Year</label>
            <input id="yearPrimary" type="number" class="field" min="1900" max={curYear} bind:value={formData.yearPrimary} placeholder={curYear}/>
        </div>
      </div>
    </div> 
<style>
  .formRow { display:flex; gap:1rem; margin-bottom:1rem; align-items:flex-end; width:100%; }
  .formRow.full { flex-direction:column; align-items:stretch; }
  .formRow.twoCols .col, .formRow.threeCols .col, .dobRow .col { flex:1 1 0; display:flex; flex-direction:column; }
  .field { width:100%; box-sizing:border-box; padding:0.5rem; border-radius:4px; border:1px solid #ccc; background:var(--base); color:var(--option); }
  .dobRow { display:flex; gap:1rem; width:100%; }
  label { margin-bottom:0.25rem; color:var(--option); }
</style>