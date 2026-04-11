const page = document.querySelector('#page');
const panels = [...document.querySelectorAll('.panel')];
const progressBar = document.querySelector('#progressBar');
let isAnimating = false;
let currentIndex = 0;
let wheelAccum = 0;
let wheelResetTimer;

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
  }, 820);
}

page.addEventListener(
  'wheel',
  (event) => {
    if (window.innerWidth <= 980 || isAnimating) return;
    event.preventDefault();

    wheelAccum += event.deltaY;
    clearTimeout(wheelResetTimer);
    wheelResetTimer = setTimeout(() => {
      wheelAccum = 0;
    }, 120);

    const threshold = 60;
    if (Math.abs(wheelAccum) < threshold) return;

    const direction = wheelAccum > 0 ? 1 : -1;
    wheelAccum = 0;
    goToIndex(currentIndex + direction);
  },
  { passive: false }
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.22 }
);
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

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.done) return;
      entry.target.dataset.done = '1';
      animateCount(entry.target);
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll('[data-count]').forEach((node) => countObserver.observe(node));

const slideButtons = [...document.querySelectorAll('#solution .solution-card')];
const phoneScreen = document.querySelector('#phoneScreen');
const phoneLabels = ['MATCH', 'TOURNOIS', 'RANKING'];
let phoneIndex = 0;
setInterval(() => {
  phoneIndex = (phoneIndex + 1) % phoneLabels.length;
  phoneScreen.textContent = phoneLabels[phoneIndex];
  slideButtons.forEach((card, idx) => card.classList.toggle('active', idx === phoneIndex));
}, 2200);

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

page.addEventListener('scroll', () => {
  const max = page.scrollHeight - page.clientHeight;
  progressBar.style.width = `${max <= 0 ? 0 : (page.scrollTop / max) * 100}%`;
  if (!isAnimating) detectCurrentIndex();
});

detectCurrentIndex();
