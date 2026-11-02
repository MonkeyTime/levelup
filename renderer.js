const paths = {
 overview:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
 cpus:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v5m6-5v5M9 18v5m6-5v5M1 9h5m-5 6h5m12-6h5m-5 6h5"/><rect x="9" y="9" width="6" height="6"/>',
 ram:'<rect x="2" y="6" width="20" height="11" rx="2"/><path d="M6 10v3m4-3v3m4-3v3m4-3v3M5 17v3m5-3v3m4-3v3m5-3v3"/>',
 disks:'<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="12" cy="11" r="4"/><path d="m12 11 5 5M6 17h1"/>',
 graphics:'<rect x="2" y="5" width="20" height="13" rx="2"/><circle cx="10" cy="11.5" r="4"/><path d="M17 9h2m-2 5h2M6 18v3m4-3v3m4-3v3"/>',
 system:'<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4M6 7h6m-6 4h10"/>',
 battery:'<rect x="2" y="6" width="18" height="12" rx="2"/><path d="M23 10v4M6 10v4m4-4v4m4-4v4"/>',
 networks:'<path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0m-11 4a6 6 0 0 1 8 0"/><circle cx="12" cy="20" r="1"/>',
 benchmarks:'<path d="m13 2-9 12h7l-1 8 10-13h-7z"/>'
};
const sections = {
 overview:['Vue d’ensemble','L’essentiel de votre configuration, au même endroit.'],
 cpus:['Processeur','Les capacités de calcul au cœur de votre ordinateur.'],
 ram:['Mémoire vive','Vos modules de mémoire et leurs caractéristiques.'],
 graphics:['Graphiques','Vos cartes graphiques, leur mémoire et leurs pilotes.'],
 disks:['Stockage','Vos disques physiques et leurs caractéristiques.'],
 system:['Système','Les informations de votre système d’exploitation.'],
 battery:['Batterie','La charge et la capacité de votre batterie.'],
 networks:['Réseau','Les interfaces et les adresses de votre connexion.'],
 benchmarks:['Tests de performance','Explorez les performances de votre configuration.']
};
const state = {data:{},errors:{},loading:true,current:'overview',tests:{}};
const content = document.getElementById('content');
const esc = v => String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const available = v => v !== undefined && v !== null && v !== '' && v !== -1;
const value = v => available(v) ? esc(typeof v === 'boolean' ? (v ? 'Oui' : 'Non') : v) : 'Non renseigné';
const unit = (v,s) => Number(v)>0 ? `${new Intl.NumberFormat('fr-FR',{maximumFractionDigits:1}).format(Number(v))} ${s}` : null;
const bytes = (v,base=1024) => Number(v)>0 ? `${new Intl.NumberFormat('fr-FR',{maximumFractionDigits:1}).format(v/base**3)} ${base===1024?'Gio':'Go'}` : null;
const sum = items => items.reduce((n,item)=>n+(Number(item.size)||0),0);
const icon = key => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[key]}</svg>`;
document.getElementById('navigation').innerHTML=Object.entries(sections).map(([key,[label]])=>`${key==='benchmarks'?'<div class="nav-divider"></div>':''}<button class="nav-item" data-section="${key}" title="${label}" aria-label="${label}">${icon(key)}<span class="nav-label">${label}</span></button>`).join('');
document.getElementById('navigation').addEventListener('click',event=>{const b=event.target.closest('[data-section]');if(b)navigate(b.dataset.section);});
document.querySelector('.brand').addEventListener('click',event=>{event.preventDefault();navigate('overview');});
function navigate(key){
 state.current=key;
 document.querySelectorAll('.nav-item').forEach(b=>{const active=b.dataset.section===key;b.classList.toggle('active',active);if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
 document.getElementById('page-title').textContent=sections[key][0];
 document.getElementById('breadcrumb-current').textContent=sections[key][0];
 document.getElementById('page-description').textContent=sections[key][1];render();
}
function syncTheme(){const dark=document.documentElement.dataset.theme==='dark';document.getElementById('theme-toggle').setAttribute('aria-checked',String(dark));document.getElementById('theme-icon').textContent=dark?'☼':'☾';}
document.getElementById('theme-toggle').addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;try{localStorage.setItem('levelup-theme',theme);}catch{}syncTheme();});
syncTheme();
function empty(title,description){return `<div class="empty-state"><h2>${esc(title)}</h2><p>${esc(description)}</p></div>`;}
function detail(key,title,rows,subtitle=''){return `<article class="detail-card"><div class="detail-header"><span class="card-icon">${icon(key)}</span><div><h2>${value(title)}</h2>${subtitle?`<p>${esc(subtitle)}</p>`:''}</div></div><dl class="specs">${rows.map(([label,v])=>`<div class="spec-row"><dt>${label}</dt><dd>${value(v)}</dd></div>`).join('')}</dl></article>`;}
function card(key,title,meta,foot){const pending=state.loading&&!(key in state.data)&&!state.errors[key];return `<button class="component-card" data-open="${key}"><span class="card-top"><span class="card-icon">${icon(key)}</span>${sections[key][0]}<span class="card-arrow">↗</span></span><span class="component-value">${pending?'Lecture en cours…':value(state.errors[key]?'Lecture indisponible':title)}</span><span class="component-meta">${esc(meta)}</span><span class="component-foot"><span>${esc(foot)}</span><strong>Voir les détails →</strong></span></button>`;}
function overview(){
 const {cpus:c={},system:s={},ram:r=[],graphics:g={},disks:d=[],networks:n=[],battery:b={}}=state.data;
 const gpu=(g.controllers||[])[0]||{};const net=n.find(x=>x.operstate==='up'&&!x.internal)||n.find(x=>!x.internal)||{};
 content.innerHTML=`<section class="overview-hero"><div class="machine-title"><div class="machine-icon">${icon('system')}</div><div><div class="small-label">VOTRE ORDINATEUR</div><h2>${value(s.hostname||s.fqdn||'Mon ordinateur')}</h2><p>${value(s.distro||(state.loading?'Détection du système…':null))}${s.arch?` · ${value(s.arch)}`:''}</p></div></div><span class="hero-tag">● Configuration locale</span></section><div class="section-heading"><h2>Votre configuration en un coup d’œil</h2><span>Les composants essentiels</span></div><section class="component-grid" aria-label="Résumé des composants">
 ${card('cpus',c.brand,[unit(c.physicalCores,'cœurs'),unit(c.cores,'threads')].filter(Boolean).join(' · ')||'Caractéristiques du processeur',unit(c.speedMax||c.speed,'GHz')||'Processeur')}
 ${card('ram',bytes(sum(r)),`${r.length} module${r.length>1?'s':''} de mémoire${r[0]?.type?` · ${r[0].type}`:''}`,unit(r[0]?.clockSpeed,'MHz')||'Mémoire installée')}
 ${card('graphics',gpu.model,unit(gpu.vram,'Mo de mémoire vidéo')||'Informations graphiques',gpu.vendor||'Carte graphique')}
 ${card('disks',bytes(sum(d),1000),`${d.length} disque${d.length>1?'s':''} physique${d.length>1?'s':''} détecté${d.length>1?'s':''}`,d[0]?.type||'Stockage installé')}
 ${card('networks',net.iface||net.ifaceName||'Aucune interface détectée',net.operstate==='up'?'Interface connectée':'État de la connexion',({wireless:'Sans fil',wired:'Ethernet'})[net.type]||net.type||'Réseau')}
 ${card('battery',b.hasBattery?(available(b.percent)?`${b.percent} % de charge`:'Batterie détectée'):'Sur secteur',b.hasBattery?(b.isCharging?'Recharge en cours':'Batterie détectée'):'Aucune batterie détectée','Alimentation')}
 </section><section class="benchmark-banner"><span class="card-icon">${icon('benchmarks')}</span><div><h2>Et si vous testiez votre PC ?</h2><p>Mesurez les performances du processeur et de votre connexion.</p></div><button class="button" data-open="benchmarks">Explorer les tests <span aria-hidden="true">→</span></button></section>`;
}
function renderDetails(key){
 const d=state.data[key];
 if(state.errors[key]){content.innerHTML=empty('Impossible de lire ces informations','Cliquez sur Actualiser pour réessayer. Les autres rubriques restent accessibles.');return;}
 if(d===undefined){content.innerHTML='<div class="skeleton" aria-label="Lecture des informations en cours"></div>';return;}
 switch(key){
 case 'cpus':content.innerHTML=detail(key,d.brand||'Processeur',[['Fabricant',d.manufacturer],['Identifiant fournisseur',d.vendor],['Processeurs',d.processors],['Cœurs physiques',d.physicalCores],['Threads logiques',d.cores],['Cœurs de performance',d.performanceCores],['Cœurs à haute efficacité',d.efficiencyCores],['Fréquence de base',unit(d.speed,'GHz')],['Fréquence maximale',unit(d.speedMax,'GHz')]]);break;
 case 'system':content.innerHTML=detail(key,d.distro||'Système d’exploitation',[['Nom de l’ordinateur',d.hostname||d.fqdn],['Architecture',d.arch],['Version',d.release],['Noyau',d.kernel],['Plateforme',d.platform],['Démarrage UEFI',d.uefi],['Numéro de série',d.serial]]);break;
 case 'disks':content.innerHTML=d.map((x,i)=>detail(key,x.name||`Disque ${i+1}`,[['Fabricant',x.vendor],['Type',x.type],['Interface',x.interfaceType],['Capacité',bytes(x.size,1000)],['État SMART',x.smartStatus]],`Disque physique ${i+1}`)).join('');break;
 case 'ram':content.innerHTML=d.map((x,i)=>detail(key,`Module ${i+1} · ${bytes(x.size)||'Capacité inconnue'}`,[['Emplacement',x.bank],['Fabricant',x.manufacturer],['Référence',x.partNum],['Capacité',bytes(x.size)],['Type',x.type],['Format',x.formFactor],['Fréquence',unit(x.clockSpeed,'MHz')]])).join('');break;
 case 'graphics':content.innerHTML=(d.controllers||[]).map((x,i)=>detail(key,x.model||`Carte graphique ${i+1}`,[['Fabricant',x.vendor],['Mémoire vidéo',unit(x.vram,'Mo')],['Mémoire partagée',x.vramDynamic],['Pilote',x.driverVersion],['Température',unit(x.temperatureGpu,'°C')]])).join('');break;
 case 'networks':content.innerHTML=d.map((x,i)=>detail(key,x.ifaceName||x.iface||`Interface ${i+1}`,[['Interface',x.iface],['État',({up:'Connectée',down:'Déconnectée',unknown:'Inconnu'})[x.operstate]||x.operstate],['Type',x.type],['Adresse MAC',x.mac],['IPv4',x.ip4],['IPv6',x.ip6],['Interface interne',x.internal]])).join('');break;
 case 'battery':content.innerHTML=d.hasBattery?detail(key,d.model||'Batterie',[['Fabricant',d.manufacturer],['Charge',available(d.percent)?`${d.percent} %`:null],['Recharge en cours',d.isCharging],['Capacité d’origine',unit(d.designedCapacity,d.capacityUnit||'mWh')],['Capacité maximale actuelle',unit(d.maxCapacity,d.capacityUnit||'mWh')],['Capacité conservée',d.designedCapacity>0&&d.maxCapacity>0?`${Math.min(100,Math.round(d.maxCapacity/d.designedCapacity*100))} %`:null],['Cycles',d.cycleCount]],'Capacité maximale actuelle comparée à la capacité d’origine.'):empty('Aucune batterie détectée','Cet ordinateur fonctionne sur secteur ou ne communique pas d’informations de batterie.');break;
 }
 if(!content.innerHTML)content.innerHTML=empty('Aucun composant détecté','Le système ne fournit pas d’informations pour cette catégorie.');
}
const tests={cpu:{title:'Processeur',icon:'cpus',description:'Un calcul local pour évaluer la vitesse d’un cœur. L’interface reste disponible pendant le test.',method:'cpuScore'},download:{title:'Téléchargement',icon:'networks',description:'Estimation du débit descendant avec un transfert allant jusqu’à 500 Ko depuis httpbin.org.',method:'downloadScore'},upload:{title:'Envoi',icon:'networks',description:'Estimation du débit montant avec un envoi de 500 Ko vers httpbin.org.',method:'uploadScore'}};
function renderTests(){content.innerHTML=`<div class="test-grid">${Object.entries(tests).map(([key,t])=>{const r=state.tests[key]||{};return `<article class="test-card"><span class="card-icon">${icon(t.icon)}</span><h2>${t.title}</h2><p>${t.description}</p><button class="button secondary" data-test="${key}" ${r.running?'disabled':''}>${r.running?'Test en cours…':r.text?'Relancer le test':'Lancer le test'} <span aria-hidden="true">→</span></button><div class="test-result${r.error?' error':''}" role="status" aria-live="polite">${r.running?'<span class="loader"></span>Mesure en cours…':esc(r.text||'Prêt à démarrer')}</div></article>`;}).join('')}</div><p class="test-note">Les résultats varient selon l’activité du PC et du réseau. Les tests réseau utilisent Internet et donnent une estimation sur un transfert court. L’indice CPU est local, sans classement comparatif.</p>`;}
function render(){content.setAttribute('aria-busy',String(state.loading));if(state.current==='overview')overview();else if(state.current==='benchmarks')renderTests();else renderDetails(state.current);}
content.addEventListener('click',e=>{const open=e.target.closest('[data-open]');if(open){navigate(open.dataset.open);window.scrollTo({top:0});const h=document.getElementById('page-title');h.setAttribute('tabindex','-1');h.focus();}const t=e.target.closest('[data-test]');if(t)runTest(t.dataset.test);});
async function runTest(key){
 if(state.tests[key]?.running)return;
 state.tests[key]={running:true};renderTests();
 try{const result=await window.systeminfos[tests[key].method]();const score=key==='cpu'?Number(result):Number(result?.mbps);if(!Number.isFinite(score)||score<=0)throw new Error('Invalid measurement');state.tests[key]={text:key==='cpu'?`Indice CPU : ${score.toLocaleString('fr-FR')} points`:`${key==='download'?'Téléchargement':'Envoi'} : ${score.toLocaleString('fr-FR',{maximumFractionDigits:2})} Mbit/s`};}
 catch{state.tests[key]={error:true,text:key==='cpu'?'Le test a échoué. Réessayez.':'Mesure indisponible. Vérifiez la connexion ou réessayez plus tard.'};}
 if(state.current==='benchmarks')renderTests();
}
async function loadData(){
 if(state.loading&&state.started)return;state.started=true;state.loading=true;state.errors={};
 const refresh=document.getElementById('refresh');refresh.disabled=true;document.getElementById('data-status').textContent='Lecture de votre configuration…';render();
 await Promise.all(['cpus','ram','graphics','disks','system','battery','networks'].map(async key=>{try{state.data[key]=await window.systeminfos[key]();}catch{state.errors[key]=true;delete state.data[key];}render();}));
 state.loading=false;refresh.disabled=false;const failures=Object.keys(state.errors).length;
 document.getElementById('data-status').textContent=failures?`${failures} rubrique(s) indisponible(s) · Actualisez pour réessayer.`:`Mis à jour à ${new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})} · Informations lues sur cet ordinateur`;render();
}
document.getElementById('refresh').addEventListener('click',loadData);navigate('overview');loadData();
