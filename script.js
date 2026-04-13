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

let goToFrame;
function goToIndex(targetIndex) {
  currentIndex = clampIndex(targetIndex);
  isAnimating = true;
  const targetTop = panels[currentIndex].offsetTop;
  const start = performance.now();

  page.scrollTo({ top: targetTop, behavior: 'smooth' });

  cancelAnimationFrame(goToFrame);
  const settle = () => {
    const reached = Math.abs(page.scrollTop - targetTop) < 2;
    const timeout = performance.now() - start > 1300;
    if (reached || timeout) {
      isAnimating = false;
      wheelAccum = 0;
      detectCurrentIndex();
      return;
    }
    goToFrame = requestAnimationFrame(settle);
  };
  goToFrame = requestAnimationFrame(settle);
}


const projectViewport = document.querySelector('#projectStageViewport');
const projectStageDots = [...document.querySelectorAll('.project-stage-dot')];
let projectStage = 0;

function setProjectStage(stage) {
  if (!projectViewport) return;
  projectStage = Math.max(0, Math.min(1, stage));
  projectViewport.dataset.stage = String(projectStage);
  projectStageDots.forEach((dot, i) => dot.classList.toggle('active', i === projectStage));
}

function handleProjectWheel(direction) {
  const activePanel = panels[currentIndex];
  if (!projectViewport || !activePanel || activePanel.id !== 'presentation-projet') return false;
  const nextStage = projectStage + direction;
  if (nextStage >= 0 && nextStage <= 1) {
    setProjectStage(nextStage);
    return true;
  }
  return false;
}

projectStageDots.forEach((dot, i) => dot.addEventListener('click', () => setProjectStage(i)));
setProjectStage(0);

function handlePreviewWheel(direction) {
  const activePanel = panels[currentIndex];
  if (!activePanel || activePanel.id !== 'interface-detail' || !prevSlides.length) return false;
  const nextIndex = prevIndex + direction;
  if (nextIndex >= 0 && nextIndex < prevSlides.length) {
    setPreviewSlide(nextIndex);
    return true;
  }
  return false;
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

  if (handleProjectWheel(direction) || handlePreviewWheel(direction)) return;
  goToIndex(currentIndex + direction);
}, { passive: false });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
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
    if (entry.isIntersecting) {
      if (entry.target.dataset.animating) return;
      entry.target.dataset.animating = '1';
      entry.target.textContent = '0';
      animateCount(entry.target);
      setTimeout(() => {
        entry.target.dataset.animating = '';
      }, 1200);
    } else {
      entry.target.textContent = '0';
      entry.target.dataset.animating = '';
    }
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




const prevNavButtons = [...document.querySelectorAll('#prevNav .pni')];
const prevTrack = document.querySelector('#prevTrack');
const prevSlidesWrap = document.querySelector('.prev-slides');
const prevSlides = [...document.querySelectorAll('#prevTrack .pslide')];
let prevIndex = 0;

function updatePreviewTrackPosition(index) {
  if (!prevTrack || !prevSlidesWrap || !prevSlides[index]) return;
  const activeSlide = prevSlides[index];
  const target = prevSlidesWrap.clientWidth / 2 - (activeSlide.offsetLeft + activeSlide.offsetWidth / 2);
  prevTrack.style.transform = `translateX(${target}px)`;
}

function setPreviewSlide(index) {
  if (!prevSlides.length || !prevNavButtons.length) return;
  prevIndex = ((index % prevSlides.length) + prevSlides.length) % prevSlides.length;
  prevSlides.forEach((slide, i) => slide.classList.toggle('active', i === prevIndex));
  prevNavButtons.forEach((btn, i) => btn.classList.toggle('on', i === prevIndex));
  updatePreviewTrackPosition(prevIndex);
}

prevNavButtons.forEach((btn, i) => btn.addEventListener('click', () => setPreviewSlide(i)));
prevSlides.forEach((slide, i) => slide.addEventListener('click', () => setPreviewSlide(i)));
if (prevSlidesWrap) {
  prevSlidesWrap.addEventListener('click', (event) => {
    if (event.target.closest('.pslide')) return;
    setPreviewSlide(prevIndex + 1);
  });
}
window.addEventListener('resize', () => updatePreviewTrackPosition(prevIndex));
setPreviewSlide(0);


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


const toggleFullscreenBtn = document.querySelector('#toggleFullscreen');
if (toggleFullscreenBtn) {
  toggleFullscreenBtn.addEventListener('click', async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        toggleFullscreenBtn.textContent = '🡼';
      } else {
        await document.exitFullscreen();
        toggleFullscreenBtn.textContent = '⛶';
      }
    } catch (error) {
      console.warn("Impossible d'activer le plein écran automatiquement.", error);
    }
  });

  document.addEventListener('fullscreenchange', () => {
    toggleFullscreenBtn.textContent = document.fullscreenElement ? '🡼' : '⛶';
  });
}

document.addEventListener('keydown', (event) => {
  if (window.innerWidth <= 980 || isAnimating) return;
  if (event.key === 'ArrowDown' || event.key === 'PageDown') {
    event.preventDefault();
    if (handleProjectWheel(1) || handlePreviewWheel(1)) return;
    goToIndex(currentIndex + 1);
  }
  if (event.key === 'ArrowUp' || event.key === 'PageUp') {
    event.preventDefault();
    if (handleProjectWheel(-1) || handlePreviewWheel(-1)) return;
    goToIndex(currentIndex - 1);
  }
});
