const page = document.querySelector('#page');
const panels = [...document.querySelectorAll('.panel')];
const progressBar = document.querySelector('#progressBar');
let currentIndex = 0;
let isAnimating = false;
let wheelAccum = 0;
let wheelReset;

function clamp(i){return Math.max(0,Math.min(panels.length-1,i));}
function detectCurrent(){
  const mid = page.scrollTop + page.clientHeight/2;
  let best=0,dist=Infinity;
  panels.forEach((p,i)=>{const d=Math.abs((p.offsetTop+p.offsetHeight/2)-mid);if(d<dist){dist=d;best=i;}});
  currentIndex=best;
}
function goTo(index){
  currentIndex = clamp(index);
  isAnimating=true;
  panels[currentIndex].scrollIntoView({behavior:'smooth',block:'start'});
  setTimeout(()=>{isAnimating=false;wheelAccum=0;detectCurrent();},700);
}

const saasSteps = [...document.querySelectorAll('#saasNav .saas-step')];
const saasImage = document.querySelector('#saasImage');
const saasImages = ['assets/saas-dashboard.png','assets/saas-tournois.png','assets/saas-paiements.png','assets/saas-partenaires.png'];
let saasIndex = 0;
function setSaas(i){
  if(!saasSteps.length || !saasImage) return;
  saasIndex=((i%saasSteps.length)+saasSteps.length)%saasSteps.length;
  saasSteps.forEach((s,idx)=>s.classList.toggle('active',idx===saasIndex));
  saasImage.src = saasImages[saasIndex];
}
saasSteps.forEach((s,i)=>s.addEventListener('click',()=>setSaas(i)));

function handleSaasWheel(direction){
  const active = panels[currentIndex];
  if(!active || active.id!=='fonctionnement') return false;
  const next = saasIndex + direction;
  if(next>=0 && next<saasSteps.length){setSaas(next);return true;}
  return false;
}

page.addEventListener('wheel',(e)=>{
  if(window.innerWidth<=980 || isAnimating) return;
  e.preventDefault();
  wheelAccum += e.deltaY;
  clearTimeout(wheelReset);
  wheelReset = setTimeout(()=>wheelAccum=0,120);
  if(Math.abs(wheelAccum)<70) return;
  const direction = wheelAccum>0?1:-1;
  wheelAccum=0;
  if(handleSaasWheel(direction)) return;
  goTo(currentIndex+direction);
},{passive:false});

const valueSlides = [...document.querySelectorAll('.value-slide')];
const dots = [...document.querySelectorAll('.dot')];
let valueIndex=0;
function setValue(i){
  valueIndex=((i%valueSlides.length)+valueSlides.length)%valueSlides.length;
  valueSlides.forEach((s,idx)=>s.classList.toggle('active',idx===valueIndex));
  dots.forEach((d,idx)=>d.classList.toggle('active',idx===valueIndex));
}
dots.forEach((d,i)=>d.addEventListener('click',()=>setValue(i)));
setInterval(()=>{if(valueSlides.length) setValue(valueIndex+1);},3500);

const reveal = new IntersectionObserver((entries)=>{
  entries.forEach((e)=>{if(e.isIntersecting)e.target.classList.add('visible');});
},{threshold:.2});
document.querySelectorAll('.fade-in').forEach((el)=>reveal.observe(el));

function animateCount(el){
  const target = Number(el.dataset.count||0);
  let cur=0; const step=Math.max(1,Math.floor(target/35));
  const t=setInterval(()=>{cur+=step;if(cur>=target){cur=target;clearInterval(t);}el.textContent=cur;},24);
}
const counterObs = new IntersectionObserver((entries)=>{
  entries.forEach((e)=>{if(!e.isIntersecting||e.target.dataset.done)return; e.target.dataset.done='1';animateCount(e.target);});
},{threshold:.45});
document.querySelectorAll('[data-count]').forEach((el)=>counterObs.observe(el));

const openPrototypeBtn = document.querySelector('#openPrototype');
const closePrototypeBtn = document.querySelector('#closePrototype');
const prototypeOverlay = document.querySelector('#prototypeOverlay');
if(openPrototypeBtn && closePrototypeBtn && prototypeOverlay){
  openPrototypeBtn.addEventListener('click',()=>{prototypeOverlay.classList.add('open');prototypeOverlay.setAttribute('aria-hidden','false');});
  closePrototypeBtn.addEventListener('click',()=>{prototypeOverlay.classList.remove('open');prototypeOverlay.setAttribute('aria-hidden','true');});
}

page.addEventListener('scroll',()=>{
  const max = page.scrollHeight-page.clientHeight;
  progressBar.style.width = `${max<=0?0:(page.scrollTop/max)*100}%`;
  if(!isAnimating) detectCurrent();
});

detectCurrent();
setSaas(0);
setValue(0);
