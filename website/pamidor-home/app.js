const s = window.SITE;
const $ = (selector, root=document) => root.querySelector(selector);
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
$('[data-brand]').textContent=s.brand;
$('[data-name]').innerHTML=s.name.map(esc).join('<br>');
$('[data-tagline]').innerHTML=s.tagline.map(esc).join('<br>');
$('[data-tags]').innerHTML=s.tags.map(t=>`<span>${esc(t)}</span>`).join('');
const heroTags = document.querySelectorAll('[data-tags] span');
if (heroTags.length >= 4) {
  const matchTagWidth = () => { heroTags[3].style.width = `${heroTags[0].getBoundingClientRect().width}px`; };
  matchTagWidth();
  new ResizeObserver(matchTagWidth).observe(heroTags[0]);
}
$('.hero-bg').style.setProperty('--hero-image', `url("${s.heroImage}")`);
$('.hero-bg').style.setProperty('--hero-mobile-image', `url("${s.heroMobileImage || s.heroImage}")`);
const intro=$('[data-intro]');
intro.setAttribute('aria-label', s.intro);
intro.innerHTML=Array.from(s.intro).map(char=>char===' ' ? ' ' : `<span data-char aria-hidden="true">${esc(char)}</span>`).join('');
$('[data-about]').src=s.aboutImage;
$('[data-about-video]').src=s.aboutVideo;
const logos=s.logos;
// Fill each logo's url in config.js when its destination is ready.
const renderLogo=(logo,duplicate)=>{
  const label=esc(logo.name), inner=logo.image ? `<img src="${esc(logo.image)}" alt="" loading="lazy">` : `<span>${label}</span>`;
  const attrs=`class="brand-logo" aria-label="${label}" ${duplicate?'tabindex="-1"':''}`;
  return logo.url ? `<a ${attrs} href="${esc(logo.url)}">${inner}</a>` : `<button ${attrs} type="button">${inner}</button>`;
};
const logoGroup=(duplicate)=>Array.from({length:3},()=>logos).flat().map((logo,i)=>renderLogo(logo,duplicate||i>=logos.length)).join('');
$('[data-logos]').innerHTML=`<div class="marquee-group">${logoGroup(false)}</div><div class="marquee-group" aria-hidden="true">${logoGroup(true)}</div>`;
$('[data-projects]').innerHTML=s.projects.map((p,i)=>`<article class="project ${i===0?'active':''}"><div class="project-heading"><button class="project-select" type="button" aria-expanded="${i===0}" aria-controls="project-${i}">${esc(p.name)}</button><button class="button project-link" data-project-link="${i}">Jump To Project <span>→</span></button></div><div class="project-detail" id="project-${i}"><div class="project-meta">${[['INTRODUCTION',p.introduction],['TIMELINE',p.timeline],['YEAR',p.year]].map(([label,value])=>`<div><small>${label}</small><span>${esc(value)}</span></div>`).join('')}</div><img src="${esc(p.image)}" alt="${esc(p.name)} project" loading="lazy"></div></article>`).join('');
$('[data-art]').innerHTML=s.art.map((item,i)=>`<div><img src="${esc(item.image)}" alt="文章封面 ${i+1}" loading="lazy"><p>${esc(item.text)}</p></div>`).join('');
$('[data-skills]').innerHTML=s.skills.map((item,i)=>`<div class="skill" data-tool-index="${i}"><div class="skill-motion"><span class="skill-number">${String(i+1).padStart(2,'0')}</span><h3>${esc(item.name)}</h3><p>${esc(item.description)}</p></div><img class="skill-preview" src="${esc(item.image)}" alt="" aria-hidden="true" loading="lazy"><div class="skill-invert" aria-hidden="true"><span class="skill-number">${String(i+1).padStart(2,'0')}</span><h3>${esc(item.name)}</h3><p>${esc(item.description)}</p></div></div>`).join('');
document.querySelectorAll('.skill').forEach(row=>{
  row.addEventListener('pointermove',event=>{
    if(event.pointerType !== 'mouse') return;
    row.style.setProperty('--preview-x', `${event.clientX}px`);
    row.style.setProperty('--preview-y', `${event.clientY}px`);
    const rect=row.getBoundingClientRect();
    const width=Math.min(320, window.innerWidth*.25), height=width*11/16;
    const left=Math.max(0,event.clientX-width/2-rect.left);
    const top=Math.max(0,event.clientY-height/2-rect.top);
    const right=Math.max(0,rect.right-(event.clientX+width/2));
    const bottom=Math.max(0,rect.bottom-(event.clientY+height/2));
    row.style.setProperty('--preview-clip', `inset(${top}px ${right}px ${bottom}px ${left}px)`);
    row.classList.add('show-preview');
  });
  row.addEventListener('pointerleave',()=>row.classList.remove('show-preview'));
});
const resume=s.resume; $('[data-resume-title]').textContent=resume.title; $('[data-resume-intro]').textContent=resume.intro;
$('[data-resume-fields]').innerHTML=resume.fields.map(([label,value])=>`<div><p class="resume-label">${esc(label)}</p><p class="resume-value">${esc(value)}</p></div>`).join('');
$('[data-resume-experience]').innerHTML=resume.experience.map(item=>`<article class="resume-job"><p class="resume-period">${esc(item.period)}</p><div><h3>${esc(item.role)}</h3><p>${esc(item.company)}</p><p>${esc(item.description)}</p></div></article>`).join('');
$('[data-menu-email]').textContent=s.footerEmail;
$('[data-footer-line]').textContent=s.footerLine; $('[data-footer-email]').textContent=s.footerEmail;
let toastTimer; function openLink(url){if(url){window.location.href=url;return} const toast=$('.toast');toast.textContent='此入口暂未接入';toast.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('visible'),2400)}
document.querySelectorAll('[data-link]').forEach(el=>el.addEventListener('click',()=>openLink(s.links[el.dataset.link])));
document.querySelectorAll('[data-project-link]').forEach(el=>el.addEventListener('click',()=>openLink(s.projects[Number(el.dataset.projectLink)].url)));
document.querySelectorAll('.project-select').forEach(el=>{function activate(){document.querySelectorAll('.project').forEach(p=>{p.classList.remove('active');$('.project-select',p).setAttribute('aria-expanded','false')});el.closest('.project').classList.add('active');el.setAttribute('aria-expanded','true')}el.addEventListener('click',activate);el.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')activate()})});
const toggle=$('.menu-toggle'),menu=$('.menu');function closeMenu(){toggle.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open menu');menu.classList.remove('open');menu.setAttribute('aria-hidden','true');document.body.classList.remove('menu-open')};toggle.addEventListener('click',()=>{if(menu.classList.contains('open')){closeMenu();return}toggle.classList.add('open');toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','Close menu');menu.classList.add('open');menu.setAttribute('aria-hidden','false');document.body.classList.add('menu-open')});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});

// Scroll-linked motion mirrors the reference while preserving reduced-motion preferences.
const motionQuery=window.matchMedia('(prefers-reduced-motion: reduce)');
const introChars=Array.from(intro.querySelectorAll('[data-char]'));
const introStage=$('.about-reveal');
const skillRows=Array.from(document.querySelectorAll('.skill'));
const footer=$('.footer');
let scrollFrame=0;
const clamp=(value)=>Math.max(0,Math.min(1,value));
function updateMotion(){
  scrollFrame=0;
  if(motionQuery.matches){
    introChars.forEach(char=>char.classList.add('lit'));
    skillRows.forEach(row=>{row.style.removeProperty('--row-progress');row.style.removeProperty('--row-offset');row.style.removeProperty('--line-progress')});
    footer.style.removeProperty('clip-path');
    return;
  }
  const stage=introStage.getBoundingClientRect();
  const travel=stage.height-window.innerHeight;
  const introProgress=travel>0?clamp(-stage.top/travel):clamp((.85*window.innerHeight-stage.top)/(.6*window.innerHeight));
  const litCount=Math.round(introProgress*introChars.length);
  introChars.forEach((char,index)=>char.classList.toggle('lit',index<litCount));
  const list=$('[data-skills]').getBoundingClientRect();
  const progress=clamp((.78*window.innerHeight-list.top)/(.72*window.innerHeight));
  skillRows.forEach((row,index)=>{
    const eased=1-Math.pow(1-clamp(progress*skillRows.length-index),3);
    row.style.setProperty('--row-progress',eased.toFixed(3));
    row.style.setProperty('--row-offset',`${((1-eased)*28).toFixed(2)}%`);
    row.style.setProperty('--line-progress',eased.toFixed(3));
  });
  const rect=footer.getBoundingClientRect();
  const progressToFull=rect.bottom <= window.innerHeight + 1 ? 1 : clamp((window.innerHeight-rect.top)/(.6*window.innerHeight));
  const remaining=Math.pow(1-progressToFull,3);
  footer.style.clipPath=`inset(${(5*remaining).toFixed(2)}% ${(7*remaining).toFixed(2)}% 0)`;
}
function scheduleMotion(){if(!scrollFrame)scrollFrame=requestAnimationFrame(updateMotion)}
window.addEventListener('scroll',scheduleMotion,{passive:true});
window.addEventListener('resize',scheduleMotion,{passive:true});
motionQuery.addEventListener?.('change',scheduleMotion);
scheduleMotion();
const cloudVideo=$('.resume-clouds');
const cloudObserver=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting && !motionQuery.matches) cloudVideo.play().catch(()=>{});
  else cloudVideo.pause();
},{rootMargin:'300px 0px',threshold:.05});
cloudObserver.observe(cloudVideo);
motionQuery.addEventListener?.('change',()=>{if(motionQuery.matches)cloudVideo.pause();else if($('.resume').getBoundingClientRect().top<window.innerHeight+300)cloudVideo.play().catch(()=>{})});
