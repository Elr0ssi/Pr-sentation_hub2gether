const page = document.querySelector('#page');
const panels = [...document.querySelectorAll('.panel')];
const progressBar = document.querySelector('#progressBar');

let isAnimating = false;

function goToPanel(index) {
  const target = panels[index];
  if (!target) return;
  isAnimating = true;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => {
    isAnimating = false;
  }, 650);
}

function nearestPanelIndex() {
  const y = page.scrollTop;
  let best = 0;
  let dist = Infinity;

  panels.forEach((panel, i) => {
    const d = Math.abs(panel.offsetTop - y);
    if (d < dist) {
      dist = d;
      best = i;
    }
  });

  return best;
}

page.addEventListener(
  'wheel',
  (event) => {
    if (window.innerWidth <= 900 || isAnimating) return;

    event.preventDefault();
    const current = nearestPanelIndex();
    const next = event.deltaY > 0 ? current + 1 : current - 1;

    if (next >= 0 && next < panels.length) {
      goToPanel(next);
    }
  },
  { passive: false }
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

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
    el.textContent = target > 100 ? current.toLocaleString('fr-FR') : `+${current}%`;
    if (target === 1) el.textContent = '1';
  }, 30);
}

const kpiObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.done === 'true') return;
      entry.target.dataset.done = 'true';
      animateCount(entry.target);
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll('[data-count]').forEach((kpi) => kpiObserver.observe(kpi));

const slides = [...document.querySelectorAll('#productCarousel .slide')];
let slideIndex = 0;

setInterval(() => {
  slides[slideIndex].classList.remove('active');
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add('active');
}, 2300);

page.addEventListener('scroll', () => {
  const scrollable = page.scrollHeight - page.clientHeight;
  const pct = scrollable === 0 ? 0 : (page.scrollTop / scrollable) * 100;
  progressBar.style.width = `${pct}%`;
});
