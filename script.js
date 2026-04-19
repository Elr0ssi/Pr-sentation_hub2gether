const page = document.querySelector('#page');
const panels = [...document.querySelectorAll('.panel')];
const progressBar = document.querySelector('#progressBar');
const menuLinks = [...document.querySelectorAll('.menu a[href^="#"]')];
const panelIndexById = new Map(panels.map((panel, index) => [panel.id, index]));
const menuTargets = menuLinks
  .map((link) => ({ link, id: link.getAttribute('href')?.slice(1) || '' }))
  .filter((item) => panelIndexById.has(item.id));
let isAnimating = false;
let currentIndex = 0;
const topbar = document.querySelector('.topbar');
const customCursor = document.querySelector('#customCursor');
const heroTitle = document.querySelector('.hero-title');
const heroCanvas = document.querySelector('#heroNetwork');

if (heroTitle) {
  const text = heroTitle.innerHTML.replace(/<br\s*\/?>/gi, ' <br> ');
  const parts = text.split(/\s+/).filter(Boolean);
  heroTitle.innerHTML = parts.map((part, i) => {
    if (part === '<br>') return '<br/>';
    return `<span class="word" style="animation-delay:${(i * 0.08).toFixed(2)}s">${part}</span>`;
  }).join(' ');
}

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
  updateActiveMenuLink();
}

function updateActiveMenuLink() {
  const viewportCenter = page.scrollTop + page.clientHeight / 2;
  let bestIndex = 0;
  let bestFocus = -1;

  menuTargets.forEach((item, index) => {
    const panelIndex = panelIndexById.get(item.id);
    if (panelIndex === undefined) return;
    const panel = panels[panelIndex];
    const panelCenter = panel.offsetTop + panel.offsetHeight / 2;
    const dist = Math.abs(panelCenter - viewportCenter);
    const focus = Math.max(0, 1 - dist / (page.clientHeight * 0.95));
    item.link.style.setProperty('--focus', focus.toFixed(3));
    if (focus > bestFocus) {
      bestFocus = focus;
      bestIndex = index;
    }
  });

  menuTargets.forEach((item, index) => {
    item.link.classList.toggle('active', index === bestIndex);
  });

  if (progressBar && menuTargets.length > 1) {
    const firstPanel = panels[panelIndexById.get(menuTargets[0].id)];
    const lastPanel = panels[panelIndexById.get(menuTargets[menuTargets.length - 1].id)];
    const start = firstPanel?.offsetTop || 0;
    const end = lastPanel?.offsetTop || 1;
    const ratio = Math.max(0, Math.min(1, (page.scrollTop - start) / Math.max(1, end - start)));
    progressBar.style.width = `${ratio * 100}%`;
  }
}

menuTargets.forEach((item) => {
  item.link.addEventListener('click', (event) => {
    const panelIndex = panelIndexById.get(item.id);
    if (panelIndex === undefined) return;
    event.preventDefault();
    goToIndex(panelIndex);
  });
});

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
  detectCurrentIndex();
}, { passive: true });

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
if (specItems.length) {
  setInterval(() => {
    specItems.forEach((item, idx) => item.classList.toggle('active', idx === specIndex));
    specIndex = (specIndex + 1) % specItems.length;
  }, 1800);
}

const plans = [...document.querySelectorAll('#plans .plan')];
const planLive = document.querySelector('#planLive');
let planIndex = 0;
function setPlan(index) {
  if (!plans.length || !planLive) return;
  planIndex = index;
  plans.forEach((plan, i) => plan.classList.toggle('active', i === index));
  planLive.textContent = plans[index].dataset.plan;
}
if (plans.length && planLive) {
  plans.forEach((plan, i) => plan.addEventListener('mouseenter', () => setPlan(i)));
  setInterval(() => {
    if (window.innerWidth <= 980) return;
    setPlan((planIndex + 1) % plans.length);
  }, 2600);
}

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
  detectCurrentIndex();
  if (topbar) topbar.classList.toggle('compact', page.scrollTop > 36);
});

detectCurrentIndex();

if (customCursor) {
  let cx = 0; let cy = 0; let tx = 0; let ty = 0;
  let hideTimer;
  document.addEventListener('mousemove', (event) => {
    tx = event.clientX; ty = event.clientY;
    customCursor.classList.add('visible');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => customCursor.classList.remove('visible'), 900);
  });
  document.addEventListener('mouseover', (event) => {
    customCursor.classList.toggle('active', Boolean(event.target.closest('a,button,.btn')));
  });
  const loopCursor = () => {
    cx += (tx - cx) * 0.18;
    cy += (ty - cy) * 0.18;
    customCursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(loopCursor);
  };
  loopCursor();
}

if (heroCanvas) {
  const ctx = heroCanvas.getContext('2d');
  const points = Array.from({ length: 36 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.0008, vy: (Math.random() - 0.5) * 0.0008 }));
  let mx = 0; let my = 0;
  const resize = () => {
    const rect = heroCanvas.getBoundingClientRect();
    heroCanvas.width = rect.width * devicePixelRatio;
    heroCanvas.height = rect.height * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    const r = heroCanvas.getBoundingClientRect();
    mx = ((e.clientX - r.left) / r.width - 0.5) * 18;
    my = ((e.clientY - r.top) / r.height - 0.5) * 18;
  });
  const draw = () => {
    const w = heroCanvas.clientWidth;
    const h = heroCanvas.clientHeight;
    ctx.clearRect(0, 0, w, h);
    points.forEach((p) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > 1) p.vx *= -1;
      if (p.y < 0 || p.y > 1) p.vy *= -1;
    });
    for (let i = 0; i < points.length; i += 1) {
      const a = points[i];
      const ax = a.x * w + mx; const ay = a.y * h + my;
      ctx.fillStyle = 'rgba(34,197,94,.15)';
      ctx.beginPath(); ctx.arc(ax, ay, 2.2, 0, Math.PI * 2); ctx.fill();
      for (let j = i + 1; j < points.length; j += 1) {
        const b = points[j];
        const bx = b.x * w + mx; const by = b.y * h + my;
        const d = Math.hypot(ax - bx, ay - by);
        if (d < 120) {
          ctx.strokeStyle = `rgba(34,197,94,${(1 - d / 120) * 0.15})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  };
  draw();
}


const toggleFullscreenBtn = document.querySelector('#toggleFullscreen');
async function toggleFullscreenMode() {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      if (toggleFullscreenBtn) toggleFullscreenBtn.textContent = '🡼';
    } else {
      await document.exitFullscreen();
      if (toggleFullscreenBtn) toggleFullscreenBtn.textContent = '⛶';
    }
  } catch (error) {
    console.warn("Impossible d'activer le plein écran automatiquement.", error);
  }
}

if (toggleFullscreenBtn) {
  toggleFullscreenBtn.addEventListener('click', toggleFullscreenMode);
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
