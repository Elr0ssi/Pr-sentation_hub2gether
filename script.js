const page = document.querySelector('#page');
const panels = [...document.querySelectorAll('.panel')];
const progressBar = document.querySelector('#progressBar');
let isAnimating = false;

function nearestPanelIndex() {
  let idx = 0;
  let dist = Infinity;
  panels.forEach((panel, i) => {
    const d = Math.abs(panel.offsetTop - page.scrollTop);
    if (d < dist) {
      dist = d;
      idx = i;
    }
  });
  return idx;
}

function scrollToPanel(index) {
  if (!panels[index]) return;
  isAnimating = true;
  panels[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => (isAnimating = false), 680);
}

page.addEventListener(
  'wheel',
  (event) => {
    if (window.innerWidth <= 980 || isAnimating) return;
    event.preventDefault();
    const current = nearestPanelIndex();
    const next = event.deltaY > 0 ? current + 1 : current - 1;
    if (next >= 0 && next < panels.length) scrollToPanel(next);
  },
  { passive: false }
);

const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
  { threshold: 0.2 }
);
document.querySelectorAll('.fade-in').forEach((el) => revealObserver.observe(el));

function animateCount(el) {
  const t = Number(el.dataset.count || 0);
  let c = 0;
  const step = Math.max(1, Math.floor(t / 45));
  const timer = setInterval(() => {
    c += step;
    if (c >= t) {
      c = t;
      clearInterval(timer);
    }
    if (t === 1) el.textContent = '1';
    else if (t < 100) el.textContent = `+${c}%`;
    else el.textContent = c.toLocaleString('fr-FR');
  }, 24);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.target.dataset.done) return;
      entry.target.dataset.done = '1';
      animateCount(entry.target);
    });
  },
  { threshold: 0.55 }
);
document.querySelectorAll('[data-count]').forEach((el) => counterObserver.observe(el));

const productNavButtons = [...document.querySelectorAll('#productNav button')];
const productSlides = [...document.querySelectorAll('#productSlides .slide')];
let activeSlide = 0;
function setSlide(i) {
  activeSlide = i;
  productSlides.forEach((slide, idx) => slide.classList.toggle('active', idx === i));
  productNavButtons.forEach((btn, idx) => btn.classList.toggle('active', idx === i));
}
productNavButtons.forEach((btn, i) => btn.addEventListener('click', () => setSlide(i)));
setInterval(() => setSlide((activeSlide + 1) % productSlides.length), 2800);

const priceCards = [...document.querySelectorAll('#pricingCards .price')];
const planLive = document.querySelector('#planLive');
priceCards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    priceCards.forEach((c) => c.classList.remove('active'));
    card.classList.add('active');
    planLive.textContent = card.dataset.plan;
  });
});

const tiltNodes = document.querySelectorAll('.tilt');
tiltNodes.forEach((node) => {
  node.addEventListener('mousemove', (event) => {
    const rect = node.getBoundingClientRect();
    const dx = (event.clientX - rect.left) / rect.width - 0.5;
    const dy = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `perspective(700px) rotateX(${(-dy * 5).toFixed(2)}deg) rotateY(${(dx * 6).toFixed(2)}deg)`;
  });
  node.addEventListener('mouseleave', () => {
    node.style.transform = '';
  });
});

const hero = document.querySelector('#heroSpot');
hero.addEventListener('mousemove', (event) => {
  const x = (event.clientX / window.innerWidth) * 100;
  const y = (event.clientY / window.innerHeight) * 100;
  hero.style.background = `radial-gradient(420px at ${x}% ${y}%, rgba(127,227,191,.22), transparent 62%)`;
});
hero.addEventListener('mouseleave', () => {
  hero.style.background = 'transparent';
});

page.addEventListener('scroll', () => {
  const scrollable = page.scrollHeight - page.clientHeight;
  progressBar.style.width = `${scrollable <= 0 ? 0 : (page.scrollTop / scrollable) * 100}%`;
});
