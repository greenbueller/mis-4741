<script>
  export let formData = {};
  export let curYear = new Date().getFullYear();
</script>

<h4>Date of Treatment<span class="req"> *</span></h4>
<div class="dobRow">
    <div class="col">
        <label for="dayTreatment">Day</label>
        <input id="dayTreatment" type="number" class="field" required min="1" max="31" bind:value={formData.dayTreatment} placeholder="01" />
    </div>

    <div class="col">
        <label for="monthTreatment">Month</label>
        <select id="monthTreatment" class="field" required bind:value={formData.monthTreatment}>
            <option value="" disabled>Select month</option>
                {#each Array(12) as _, i}
                    <option value={i+1}>{new Date(0,i).toLocaleString(undefined,{month: 'long'})}</option>
                {/each}
        </select>
    </div>

    <div class="col">
        <label for="yearTreatment">Year</label>
        <input id="yearTreatment" type="number" class="field" required min="1900" max={curYear} bind:value={formData.yearTreatment} placeholder={curYear}/>
    </div>
</div>

<div class="formRow twoCols">
    <div class="col">
        <label for="reason">Reason for Treatment<span class="req"> *</span></label>
        <textarea id="reason" name="reason" rows="5" cols="75" required bind:value={formData.reason}></textarea>
    </div>
    <div class="col">
        <label for="services">Description of Services<span class="req"> *</span></label>
        <textarea id="services" name="services" rows="5" cols="75" required bind:value={formData.services}></textarea>
    </div>
</div>

<div class="formRow twoCols">
    <div class="col">
        <label for="serviceCode">Service Codes (CPT/ICD)<span class="req"> *</span></label>
        <input id="serviceCode" class="field" type="text" required placeholder="CPT-99214, I25.10" bind:value={formData.serviceCode}>
    </div>
    <div class="col">
        <label for="amountCharged">Amount Charged <span class="req"> *</span></label>
        <input id="amountCharged" class="field" type="number" required placeholder="1152.41" bind:value={formData.amountCharged}>
    </div>
</div>

<div class="formRow full">
    <div class="col">
        <label for="providerName">Provider Name<span class="req"> *</span></label>
        <input id="providerName" class="field" type="text" required placeholder="Jane Doe" bind:value={formData.providerName}>
    </div>
</div>

<div class="formRow full">
    <div class="col">
        <label for="providerAddress">Provider Address<span class="req"> *</span></label>
        <input id="providerAddress" class="field" type="text" required placeholder="51 South Main Street, Worcester MA, 01608" bind:value={formData.providerAddress}>
    </div>
</div>

<style>
  .formRow { display:flex; gap:1rem; margin-bottom:1rem; align-items:flex-end; width:100%; }
  .formRow.full { flex-direction:column; align-items:stretch; }
  .formRow.twoCols .col, .dobRow .col { flex:1 1 0; display:flex; flex-direction:column; }
  .field { width:100%; box-sizing:border-box; padding:0.5rem; border-radius:4px; border:1px solid #ccc; background:var(--base); color:var(--option); }
  textarea { width:100%; box-sizing:border-box; padding:0.5rem; border-radius:4px; border:1px solid #ccc; background:var(--base); color:var(--option); }
  .dobRow { display:flex; gap:1rem; width:100%; }
  label { margin-bottom:0.25rem; color:var(--option); }
</style>