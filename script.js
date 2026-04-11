const page = document.querySelector('#page');
const panels = [...document.querySelectorAll('.panel')];
const progressBar = document.querySelector('#progressBar');
let isAnimating = false;
let currentIndex = 0;
let wheelAccum = 0;
let wheelResetTimer;
let lastWheelTrigger = 0;

function clampIndex(i) {
  return Math.max(0, Math.min(panels.length - 1, i));
}

function detectCurrentIndex() {
  const mid = page.scrollTop + page.clientHeight / 2;
  let idx = 0;
  let dist = Infinity;
  panels.forEach((panel, i) => {
    const center = panel.offsetTop + panel.offsetHeight / 2;
    const d = Math.abs(center - mid);
    if (d < dist) {
      dist = d;
      idx = i;
    }
  });
  currentIndex = idx;
}

function goToIndex(targetIndex) {
  currentIndex = clampIndex(targetIndex);
  isAnimating = true;
  panels[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => {
    isAnimating = false;
    wheelAccum = 0;
    detectCurrentIndex();
  }, 900);
}

page.addEventListener('wheel', (event) => {
  if (window.innerWidth <= 980 || isAnimating) return;
  event.preventDefault();

  const now = Date.now();
  if (now - lastWheelTrigger < 420) return;

  wheelAccum += event.deltaY;
  clearTimeout(wheelResetTimer);
  wheelResetTimer = setTimeout(() => {
    wheelAccum = 0;
  }, 110);

  if (Math.abs(wheelAccum) < 70) return;

  const direction = wheelAccum > 0 ? 1 : -1;
  wheelAccum = 0;
  lastWheelTrigger = now;
  goToIndex(currentIndex + direction);
}, { passive: false });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.22 });
document.querySelectorAll('.fade-in').forEach((node) => revealObserver.observe(node));

function animateCount(el) {
  const target = Number(el.dataset.count || 0);
  let current = 0;
  const step = Math.max(1, Math.floor(target / 45));
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current.toLocaleString('fr-FR');
  }, 24);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting || entry.target.dataset.done) return;
    entry.target.dataset.done = '1';
    animateCount(entry.target);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach((node) => countObserver.observe(node));

const specItems = [...document.querySelectorAll('#specList li')];
let specIndex = 0;
setInterval(() => {
  specItems.forEach((item, idx) => item.classList.toggle('active', idx === specIndex));
  specIndex = (specIndex + 1) % specItems.length;
}, 1800);

const plans = [...document.querySelectorAll('#plans .plan')];
const planLive = document.querySelector('#planLive');
let planIndex = 0;
function setPlan(index) {
  planIndex = index;
  plans.forEach((plan, i) => plan.classList.toggle('active', i === index));
  planLive.textContent = plans[index].dataset.plan;
}
plans.forEach((plan, i) => plan.addEventListener('mouseenter', () => setPlan(i)));
setInterval(() => {
  if (window.innerWidth <= 980) return;
  setPlan((planIndex + 1) % plans.length);
}, 2600);

document.querySelectorAll('.tilt').forEach((node) => {
  node.addEventListener('mousemove', (event) => {
    const rect = node.getBoundingClientRect();
    const dx = (event.clientX - rect.left) / rect.width - 0.5;
    const dy = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `perspective(760px) rotateX(${(-dy * 5).toFixed(2)}deg) rotateY(${(dx * 6).toFixed(2)}deg)`;
  });
  node.addEventListener('mouseleave', () => {
    node.style.transform = '';
  });
});



const impactTabs = [...document.querySelectorAll('#impactTabs button')];
const impactPanels = [...document.querySelectorAll('.impact-panel')];
impactTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    impactTabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    const key = tab.dataset.target;
    impactPanels.forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === key));
  });
});
let impactIndex = 0;
setInterval(() => {
  if (!impactTabs.length) return;
  impactIndex = (impactIndex + 1) % impactTabs.length;
  impactTabs[impactIndex].click();
}, 3200);

const exploreButtons = [...document.querySelectorAll('#exploreNav button')];
const exploreTrack = document.querySelector('#exploreTrack');
const exploreStage = document.querySelector('.explore-stage');
const exploreSlides = [...document.querySelectorAll('#exploreTrack .explore-slide')];
let exploreIndex = 0;
function updateExploreTrackPosition(index) {
  if (!exploreTrack || !exploreStage || !exploreSlides[index]) return;
  const activeSlide = exploreSlides[index];
  const target = exploreStage.clientWidth / 2 - (activeSlide.offsetLeft + activeSlide.offsetWidth / 2);
  exploreTrack.style.transform = `translateX(${target}px)`;
}

function setExplore(index) {
  if (!exploreTrack || !exploreButtons.length) return;
  exploreIndex = ((index % exploreButtons.length) + exploreButtons.length) % exploreButtons.length;
  exploreButtons.forEach((btn, i) => btn.classList.toggle('active', i === exploreIndex));
  exploreSlides.forEach((slide, i) => slide.classList.toggle('active', i === exploreIndex));
  updateExploreTrackPosition(exploreIndex);
}

exploreButtons.forEach((btn, i) => btn.addEventListener('click', () => setExplore(i)));
exploreSlides.forEach((slide, i) => {
  slide.addEventListener('click', () => setExplore(i));
});

if (exploreStage) {
  exploreStage.addEventListener('click', (event) => {
    if (event.target.closest('.explore-slide')) return;
    setExplore(exploreIndex + 1);
  });
}

window.addEventListener('resize', () => updateExploreTrackPosition(exploreIndex));
setExplore(0);
setInterval(() => {
  if (!exploreButtons.length) return;
  setExplore(exploreIndex + 1);
}, 2800);



const openPrototypeBtn = document.querySelector('#openPrototype');
const closePrototypeBtn = document.querySelector('#closePrototype');
const prototypeOverlay = document.querySelector('#prototypeOverlay');
if (openPrototypeBtn && closePrototypeBtn && prototypeOverlay) {
  openPrototypeBtn.addEventListener('click', () => {
    prototypeOverlay.classList.add('open');
    prototypeOverlay.setAttribute('aria-hidden', 'false');
  });
  closePrototypeBtn.addEventListener('click', () => {
    prototypeOverlay.classList.remove('open');
    prototypeOverlay.setAttribute('aria-hidden', 'true');
  });
}

page.addEventListener('scroll', () => {
  const max = page.scrollHeight - page.clientHeight;
  progressBar.style.width = `${max <= 0 ? 0 : (page.scrollTop / max) * 100}%`;
  if (!isAnimating) detectCurrentIndex();
});

detectCurrentIndex();
