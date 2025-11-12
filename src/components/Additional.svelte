<script>
  export let formData = {};
</script>

<div class="formRow twoCols">
  <div class="col">
    <div class="label-row">
      <label for="priorClaims">Have you submitted a claim for this before?<span class="req"> *</span></label>
    </div>
    <div class="radio-row" id="priorClaims">
      <label><input type="radio" name="priorClaim" value="Yes" bind:group={formData.priorClaim}> Yes</label>
      <label><input type="radio" name="priorClaim" value="No" bind:group={formData.priorClaim}> No</label>
    </div>
  </div>

  <div class="col">
    <div class="label-row">
      <label for="workplaceInjury">Was this a workplace injury?<span class="req"> *</span></label>
    </div>
    <div class="radio-row" id="workplaceInjury">
      <label><input type="radio" name="workplaceInj" value="Yes" bind:group={formData.workplaceInj}> Yes</label>
      <label><input type="radio" name="workplaceInj" value="No" bind:group={formData.workplaceInj}> No</label>
    </div>
  </div>
</div>

<div class="formRow full">
  <label for="workplaceInjDetails">If yes, please provide details:</label>
  <textarea id="workplaceInjDetails" name="workplaceInjDetails" rows="5" bind:value={formData.workplaceInjDetails}></textarea>
</div>

<style>
  .formRow { display:flex; gap:1rem; margin-bottom:1rem; align-items:flex-start; }
  .formRow.full { flex-direction:column; }
  .formRow.twoCols .col { flex:1; display:flex; flex-direction:column; }
  .radio-row { display:flex; gap:0.75rem; margin-top:0.5rem; align-items:center; }

  /* Strong overrides so theme/global rules can't hide radios */
  .radio-row input[type="radio"] {
    -webkit-appearance: radio !important;
    appearance: radio !important;
    display: inline-block !important;
    width: 1.05rem !important;
    height: 1.05rem !important;
    margin: 0 0.35rem 0 0 !important;
    vertical-align: middle !important;
    cursor: pointer !important;
    position: relative !important;
    z-index: 2 !important;
    accent-color: var(--highlight) !important;
    opacity: 1 !important;
    background: transparent !important;
    border: none !important;
  }

  .radio-row label {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    user-select: none;
  }

  label { color:var(--option); }
  .req { color:var(--highlight); margin-left:0.2em; }
  textarea { width:100%; box-sizing:border-box; padding:0.5rem; border-radius:4px; border:1px solid #ccc; background:var(--base); color:var(--option); }
</style>