<script>
  import { onMount } from 'svelte';

  import Header from './Header.svelte';
  import Footer from './Footer.svelte';
  import swal from 'sweetalert';

  import PersonalInformation from './Personal Information.svelte';
  import Insurance from './Insurance.svelte';
  import MedicalTreatment from './Medical Treatment.svelte';
  import Additional from './Additional.svelte';
  import Signature from './Signature.svelte';

  export let navigateTo;

  const curYear = new Date().getFullYear();

  const pages = [
    { id: 'pi', label: 'Personal Information' },
    { id: 'insurance', label: 'Insurance Information' },
    { id: 'medical', label: 'Medical Treatment Information' },
    { id: 'additional', label: 'Additional Information' },
    { id: 'signature', label: 'Signature and Authorisation' }
  ];

  let page = 0;
  $: currentLabel = pages[page]?.label || '';

  let formData = {
    firstName: '', lastName: '', dayClient: '', monthClient: '', yearClient: '',
    clientAddress: '', clientCity: '', clientState: '', clientZip: '',
    areaCode: '', phoneNumTwo: '', phoneNumThree: '', email: '',
    insurer: '', policyNumber: '', groupNumber: '', primaryName: '',
    dayPrimary: '', monthPrimary: '', yearPrimary: '',
    dayTreatment: '', monthTreatment: '', yearTreatment: '',
    reason: '', services: '', serviceCode: '', amountCharged: '',
    providerName: '', providerAddress: '',
    priorClaim: '', workplaceInj: '', workplaceInjDetails: '',
    signerName: '', signatureDate: '', signatureDataUrl: '', typedName: ''
  };

  // DOM update helper (fallback when Svelte updates don't reflect visually)
  function applyDomActivePage(idx) {
    // update title
    const title = document.getElementById('wizard-title') || document.querySelector('.pageTitle');
    if (title) title.textContent = pages[idx]?.label || '';

    // update steps active class
    const stepButtons = Array.from(document.querySelectorAll('.stepIndicator .step'));
    stepButtons.forEach((b, i) => {
      if (i === idx) b.classList.add('active');
      else b.classList.remove('active');
    });

    // update page containers (.pages > div)
    const pagesRoot = document.querySelector('.pages');
    if (pagesRoot) {
      Array.from(pagesRoot.children).forEach((child, i) => {
        if (i === idx) {
          child.classList.remove('hidden');
          child.style.display = '';
          child.setAttribute('aria-hidden', 'false');
          child.style.pointerEvents = '';
          child.style.opacity = '1';
        } else {
          child.classList.add('hidden');
          child.style.display = 'none';
          child.setAttribute('aria-hidden', 'true');
          child.style.pointerEvents = 'none';
          child.style.opacity = '0';
        }
      });
    }
  }

  // central navigation: update reactive state then force DOM sync
  function goTo(idx, evt) {
    if (evt && evt.preventDefault) evt.preventDefault();
    page = Math.max(0, Math.min(pages.length - 1, idx));
    requestAnimationFrame(() => applyDomActivePage(page));
  }

  // explicit next/back so logic is simple and reliable
  function next(evt) {
    if (evt && evt.preventDefault) evt.preventDefault();
    if (page < pages.length - 1) {
      page += 1;
      requestAnimationFrame(() => applyDomActivePage(page));
    } else {
      submitFinal();
    }
  }

  function back(evt) {
    if (evt && evt.preventDefault) evt.preventDefault();
    if (page > 0) {
      page -= 1;
      requestAnimationFrame(() => applyDomActivePage(page));
    }
  }
  function submitFinal() {
    console.debug('FINAL SUBMIT', formData);
    swal({ title: 'Success', text: 'Claim filed successfully!', icon: 'success' });
  }

  onMount(() => {
    // initial DOM sync in case Svelte binding didn't render visibly
    requestAnimationFrame(() => applyDomActivePage(page));
    console.debug('Home mounted, current page', page);
  });

  // add handler to accept field events from children
  function handleFieldEvent(e) {
    const { key, value } = e.detail;
    formData[key] = value;
    // reassign so Svelte reacts across bindings
    formData = { ...formData };
    console.debug('Home: field updated', key, value, formData);
  }
</script>

<Header />

<div class="wizard">
  <div class="stepIndicator" role="tablist" aria-label="Current Page in Form">
    {#each pages as p, i}
      <button
        type="button"
        class="step {i === page ? 'active' : ''}"
        aria-current={i === page ? 'step' : undefined}
        aria-label={`Go to step ${i+1}: ${p.label}`}
        on:click={(e) => goTo(i, e)}
      >
        <span class="stepDot" aria-hidden="true">{i + 1}</span>
      </button>
    {/each}
  </div>

  <h1 id="wizard-title" class="pageTitle" aria-live="polite">{currentLabel}</h1>

  <!-- Render every page but hide non-active ones (keeps components mounted and reactive) -->
  <div class="pages">
    <div class:hidden={page !== 0} aria-hidden={page !== 0}>
      <PersonalInformation bind:formData curYear={curYear} />
    </div>

    <div class:hidden={page !== 1} aria-hidden={page !== 1}>
      <Insurance bind:formData curYear={curYear} />
    </div>

    <div class:hidden={page !== 2} aria-hidden={page !== 2}>
      <MedicalTreatment bind:formData curYear={curYear} />
    </div>

    <div class:hidden={page !== 3} aria-hidden={page !== 3}>
      <Additional bind:formData on:field={handleFieldEvent} />
    </div>

    <div class:hidden={page !== 4} aria-hidden={page !== 4}>
      <Signature bind:formData curYear={curYear} />
    </div>
  </div>

  <div class="wizard-nav">
    <!-- Back always present, disabled on first page -->
    <button type="button" class="btn secondary" on:click={(e) => back(e)} disabled={page === 0}>Back</button>

    <!-- Next always present but hidden when on last page -->
    <button
      type="button"
      class="btn primary"
      on:click={(e) => next(e)}
      style:display={page === pages.length - 1 ? 'none' : 'inline-block'}
      aria-hidden={page === pages.length - 1}
      disabled={page === pages.length - 1}
    >
      Next
    </button>

    <button
      type="button"
      class="btn primary"
      on:click={submitFinal}
      style:display={page === pages.length - 1 ? 'inline-block' : 'none'}
      aria-hidden={page !== pages.length - 1}
      disabled={page !== pages.length - 1}
    >
      Submit
    </button>
  </div>
</div>

<Footer {navigateTo} />

<style>
  .wizard { padding:1rem 1.5rem; max-width:980px; margin:0 auto; }
  .stepIndicator { display:flex; gap:0.5rem; justify-content:center; margin-bottom:0.75rem; position: relative; z-index: 99999; pointer-events: auto; }
  .step { width:36px; height:36px; border-radius:50%; background:transparent; border:1px solid rgba(255,255,255,0.18); display:inline-flex; align-items:center; justify-content:center; cursor:pointer; position: relative; z-index: 100000; pointer-events: auto; }
  .step.active { background:var(--highlight); border-color:var(--highlight); }
  .stepDot { font-weight:700; color:var(--option); }
  .step.active .stepDot { color:var(--base); }
  .pageTitle { text-align:center; margin:0.25rem 0 0.75rem 0; color:var(--option); }
  .pages > div { transition: opacity 150ms ease; }
  .hidden { display:none !important; opacity:0; pointer-events:none; }
  .wizard-nav { display:flex; gap:0.75rem; justify-content:flex-end; margin-top:0.75rem; }
  .btn { padding:0.5rem 1rem; border-radius:20px; cursor:pointer; }
  .btn.primary { background:var(--highlight); color:var(--base); border:none; }
  .btn.secondary { background:transparent; color:var(--option); border:1px solid rgba(255,255,255,0.06); }
</style>