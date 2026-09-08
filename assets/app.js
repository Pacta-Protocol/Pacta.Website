(() => {
  'use strict';
  const root = document.documentElement;
  const langButtons = [...document.querySelectorAll('[data-language] button, button[data-language]')].filter(el => el.dataset.language);
  let language = 'en';
  const params = new URLSearchParams(location.search);
  const browserLanguage = ((navigator.language || 'en').toLowerCase().startsWith('es')) ? 'es' : 'en';
  try { language = params.get('lang') || localStorage.getItem('pacta-language') || browserLanguage; } catch (_) { language = params.get('lang') || browserLanguage; }
  const tr = (en, es) => language === 'es' ? es : en;
  const check = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4 10-10"/></svg>';
  const receipt = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3h14v18l-3-2-4 2-4-2-3 2V3Zm4 5h6m-6 4h6"/></svg>';
  const lock = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>';
  const escapeHtml = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
  function setLanguage(lang) {
    language = lang === 'es' ? 'es' : 'en';
    root.dataset.language = language; root.lang = language;
    langButtons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.language === language)));
    try { localStorage.setItem('pacta-language', language); } catch (_) {}
    if (document.body.dataset.page !== 'why' && document.body.dataset.page !== 'home') return;
    document.title = document.body.dataset.page === 'why'
      ? tr('Why Pacta · An open economy needs open trust', 'Por qué Pacta · Una economía abierta necesita confianza abierta')
      : tr('Pacta Protocol · The trust layer for agentic commerce', 'Pacta Protocol · La capa de confianza para el comercio de agentes');
    document.querySelector('meta[name="description"]').content = document.body.dataset.page === 'why'
      ? tr('Why AI agents need verifiable trust to do business with the real world. An open path for small businesses into the agentic economy.', 'Por qué los agentes de IA necesitan confianza verificable para hacer negocios reales. Un camino abierto para las pymes en la economía de agentes.')
      : tr('Open trust infrastructure for AI agents and real businesses. Agreements, escrow, collateral, and independently verifiable proof.', 'Infraestructura de confianza abierta para agentes de IA y negocios reales. Acuerdos, custodia, colateral y evidencia verificable.');
    document.querySelector('meta[property="og:title"]').content = document.title;
    document.querySelector('meta[property="og:description"]').content = document.querySelector('meta[name="description"]').content;
    const diagram = document.querySelector('.trust-diagram');
    if (diagram) diagram.setAttribute('aria-label', tr('Pacta connects AI agents and businesses through agreements, escrow, collateral and proof','Pacta conecta agentes de IA y negocios mediante acuerdos, custodia, colateral y pruebas'));
    if (document.getElementById('step-content')) { renderStep(); renderCode(); }
  }
  langButtons.forEach(b => b.addEventListener('click', () => setLanguage(b.dataset.language)));
  const menu = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  function closeMenu() { menu.setAttribute('aria-expanded','false'); nav.classList.remove('is-open'); }
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded',String(open)); nav.classList.toggle('is-open', open); });
  nav.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
  document.addEventListener('click', e => { if (!e.target.closest('.site-header')) closeMenu(); });
  const wideScreen = window.matchMedia('(min-width:1081px)');
  wideScreen.addEventListener('change', e => { if(e.matches) closeMenu(); });

  let activeStep = 3;
  let settlement = 'accepted';
  let codeTab = 'session';
  const steps = [...document.querySelectorAll('[data-step]')];
  const stepContent = document.getElementById('step-content');
  const heading = (text, badge='') => `<div class="step-content-heading"><h4>${text}</h4>${badge ? `<span class="count-badge">${badge}</span>` : ''}</div>`;
  const line = (label,value) => `<div class="info-line"><span>${label}</span><strong>${value}</strong></div>`;
  const highlight = (text, symbol=check) => `<div class="stage-highlight">${symbol}<span>${text}</span></div>`;
  function renderStep() {
    if (!stepContent) return;
    steps.forEach((tab,i) => { tab.setAttribute('aria-selected', String(i===activeStep)); tab.tabIndex = i===activeStep ? 0 : -1; });
    document.getElementById('step-panel').setAttribute('aria-labelledby',`step-tab-${activeStep}`);
    document.getElementById('step-counter').textContent = `0${activeStep+1} / 05`;
    if(activeStep === 0) {
      stepContent.innerHTML = heading(tr('A service that matches the goal','Un servicio que responde a la meta'),tr('Matched','Encontrado'))
        + line(tr('Scope','Alcance'),tr('Company formation · 4 milestones','Constitución de sociedad · 4 etapas'))
        + line(tr('Provider collateral','Colateral del proveedor'),'$1,500')
        + line(tr('Evidence required','Evidencia requerida'),tr('Registry references','Referencias registrales'))
        + highlight(tr('The agent reviews terms and backing before choosing.','El agente revisa términos y garantías antes de elegir.'));
    } else if(activeStep === 1) {
      stepContent.innerHTML = heading(tr('An agreement both parties can check','Un acuerdo que ambas partes pueden comprobar'),tr('Signed','Firmado'))
        + line(tr('Agreed deposit · 20%','Anticipo acordado · 20%'),'$1,000')
        + line(tr('Remaining at acceptance','Restante al aceptar'),'$4,000')
        + line(tr('Milestones & acceptance terms','Etapas y criterios de aceptación'),tr('Signed by both parties','Firmados por ambas partes'))
        + highlight(tr('The agreed deposit is held in escrow.','El anticipo acordado se retiene en custodia.'),lock);
    } else if(activeStep === 2) {
      stepContent.innerHTML = heading(tr('The provider submits delivery evidence','El proveedor presenta evidencia de entrega'),tr('Submitted','Entregado'))
        + line(tr('Milestones submitted','Etapas entregadas'),'4 / 4')
        + line(tr('References to check','Referencias por comprobar'),'4')
        + line(tr('Payment status','Estado del pago'),tr('Deposit remains in escrow','Anticipo en custodia'))
        + highlight(tr('Delivery is ready for the agent’s independent review.','La entrega está lista para revisión independiente.'),receipt);
    } else if(activeStep === 3) {
      const proofs = [[tr('Company registration','Inscripción de sociedad'),'REG-01'],[tr('Municipal permit','Permiso municipal'),'REG-02'],[tr('Tax registration','Inscripción tributaria'),'REG-03'],[tr('Operating permit','Permiso de operación'),'REG-04']];
      stepContent.innerHTML = heading(tr('Independently checked evidence','Evidencia comprobada independientemente'),'4 / 4')
        + proofs.map(([label,ref]) => `<div class="proof-row"><div><span class="check-dot">${check}</span><span>${label}</span></div><span class="proof-tag">${tr('Verified · demo','Verificado · demo')}</span></div>`).join('');
    } else {
      stepContent.innerHTML = `<div class="outcome-switch" role="group" aria-label="${tr('Demo outcome','Resultado del demo')}"><button data-outcome="accepted" aria-pressed="${settlement==='accepted'}">${tr('Proof accepted','Prueba aceptada')}</button><button data-outcome="rejected" aria-pressed="${settlement==='rejected'}">${tr('Proof rejected','Prueba rechazada')}</button></div>`
        + (settlement === 'accepted' ? `<div class="settled-state">${check}<div><strong>${tr('Payment released','Pago liberado')}</strong><p>$5,000 USD · ${tr('Simulated settlement','Liquidación simulada')}</p></div></div><p class="step-note">${tr('The remaining $4,000 joins the $1,000 deposit. The provider receives the full price, and both parties keep a signed record.','Los $4,000 restantes se suman al anticipo de $1,000. El proveedor recibe el precio completo y ambas partes conservan un registro firmado.')}</p>`
        : `<div class="settled-state disputed">${lock}<div><strong>${tr('Dispute opened','Disputa abierta')}</strong><p>${tr('The $1,000 deposit stays in escrow','El anticipo de $1,000 sigue en custodia')}</p></div></div><p class="step-note">${tr('An arbiter reviews the terms and evidence. The outcome may be payment, refund, or a split. Provider collateral is at risk.','Un árbitro revisa los términos y la evidencia. Puede decidir pago, reembolso o división. El proveedor arriesga su colateral.')}</p>`);
      stepContent.querySelectorAll('[data-outcome]').forEach(b=>b.addEventListener('click',()=>{settlement=b.dataset.outcome;renderStep();stepContent.querySelector(`[data-outcome="${settlement}"]`).focus();}));
    }
    document.getElementById('next-step').innerHTML = `${tr(activeStep===4?'Start again':'Next step',activeStep===4?'Volver al inicio':'Siguiente paso')}<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>`;
  }
  const flow = document.querySelector('.flow-tabs');
  function syncTabDirection() { if (flow) flow.setAttribute('aria-orientation', window.innerWidth <= 800 ? 'horizontal' : 'vertical'); }
  syncTabDirection(); window.addEventListener('resize', syncTabDirection);
  function selectStep(i,focus=false) { activeStep = (i+steps.length)%steps.length; renderStep(); if(focus) steps[activeStep].focus(); }
  steps.forEach((tab,i) => {
    tab.addEventListener('click',()=>selectStep(i));
    tab.addEventListener('keydown',e=>{let next=i; if(['ArrowDown','ArrowRight'].includes(e.key))next=i+1;else if(['ArrowUp','ArrowLeft'].includes(e.key))next=i-1;else if(e.key==='Home')next=0;else if(e.key==='End')next=4;else return; e.preventDefault();selectStep(next,true);});
  });
  document.getElementById('next-step')?.addEventListener('click',()=>selectStep(activeStep+1));
  const configCode = '{\n  "mcpServers": {\n    "marketplace": {\n      "command": "node",\n      "args": ["mcp/server.js"],\n      "env": {\n        "MARKETPLACE_URL": "http://localhost:3220",\n        "AGENT_ID": "1"\n      }\n    }\n  }\n}';
  function getSessionCode() {
    return tr('// 1. Discover and agree','// 1. Descubre y acuerda')+'\nsearch_offers({ query: "Costa Rica company" })\ncreate_engagement({ offer_id: 7 })\nagree_to_contract({ engagement_id: 12 })\nfund_escrow({ engagement_id: 12 })\n\n'+tr('// 2. Wait for delivery; verify every proof','// 2. Espera la entrega; verifica cada prueba')+'\nwait_for_provider_submission({ engagement_id: 12 })\nverify_registry_reference({ ref: "CR-RN-2026-104512" })\n\n'+tr('// 3. Only after ALL required proofs pass','// 3. Solo si TODAS las pruebas son válidas')+'\napprove_and_release_payment({ engagement_id: 12 })';
  }
  function renderCode() {
    const code = document.getElementById('code-content'); if(!code)return;
    const raw = codeTab==='config'?configCode:getSessionCode();
    code.innerHTML = raw.split('\n').map(line => {
      if(line.trim().startsWith('//'))return '<span class="code-comment">'+escapeHtml(line)+'</span>';
      return escapeHtml(line).replace(/(&quot;.*?&quot;)/g,'<span class="code-string">$1</span>').replace(/^([a-z_]+)(?=\()/,'<span class="code-fn">$1</span>');
    }).join('\n');
    document.querySelectorAll('[data-code]').forEach(b => { b.setAttribute('aria-selected',String(b.dataset.code===codeTab)); b.tabIndex=b.dataset.code===codeTab?0:-1; });
    document.getElementById('code-panel').setAttribute('aria-labelledby',`code-tab-${codeTab}`);
    document.getElementById('code-caption').textContent = codeTab==='config'
      ?tr('Run from the Pacta repository with a local marketplace.','Ejecuta desde el repositorio Pacta con un marketplace local.')
      :tr('Illustrative tool sequence · See docs for a runnable setup','Secuencia ilustrativa · Consulta la configuración en Docs');
  }
  const codeTabs = [...document.querySelectorAll('[data-code]')];
  codeTabs.forEach((b,i)=> {
    b.addEventListener('click',()=>{codeTab=b.dataset.code;renderCode();});
    b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?1:1-i;codeTab=codeTabs[next].dataset.code;renderCode();codeTabs[next].focus();});
  });
  let copyTimer;
  document.getElementById('copy-code')?.addEventListener('click', async e => {
    const b=e.currentTarget;
    try {
      await navigator.clipboard.writeText(codeTab==='config'?configCode:getSessionCode());
      b.innerHTML=check+`<span>${tr('Copied','Copiado')}</span>`;
      b.setAttribute('aria-label',tr('Code copied','Código copiado'));
    } catch (_) {
      const range=document.createRange();range.selectNodeContents(document.getElementById('code-content'));
      const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);
      b.innerHTML=`<span>${tr('Press Ctrl/Cmd+C','Usa Ctrl/Cmd+C')}</span>`;
      b.setAttribute('aria-label',tr('Code selected. Press Control or Command C to copy.','Código seleccionado. Pulsa Control o Comando C para copiar.'));
    }
    clearTimeout(copyTimer);
    copyTimer=setTimeout(()=>{b.innerHTML='<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V3H3v13h5"/></svg>'+`<span>${tr('Copy','Copiar')}</span>`;b.setAttribute('aria-label',tr('Copy code','Copiar código'));},2200);
  });
  setLanguage(language);
})();
