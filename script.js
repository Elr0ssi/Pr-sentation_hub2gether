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

function goToPanel(index) {
  if (!panels[index]) return;
  isAnimating = true;
  panels[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => {
    isAnimating = false;
  }, 650);
}

page.addEventListener(
  'wheel',
  (event) => {
    if (window.innerWidth <= 980 || isAnimating) return;
    event.preventDefault();
    const current = nearestPanelIndex();
    const next = event.deltaY > 0 ? current + 1 : current - 1;
    if (next >= 0 && next < panels.length) goToPanel(next);
  },
  { passive: false }
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.2 }
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
    if (target === 1) el.textContent = '1';
    else if (target < 100) el.textContent = `+${current}%`;
    else el.textContent = current.toLocaleString('fr-FR');
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
  { threshold: 0.55 }
);
document.querySelectorAll('[data-count]').forEach((node) => countObserver.observe(node));

const slideButtons = [...document.querySelectorAll('#productNav button')];
const slides = [...document.querySelectorAll('#productSlides .slide')];
let slideIndex = 0;
function setSlide(index) {
  slideIndex = index;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  slideButtons.forEach((button, i) => button.classList.toggle('active', i === index));
}
slideButtons.forEach((button, i) => button.addEventListener('click', () => setSlide(i)));
setInterval(() => setSlide((slideIndex + 1) % slides.length), 2600);

const priceCards = [...document.querySelectorAll('#pricingCards .price')];
const planLive = document.querySelector('#planLive');
let priceIndex = 0;
function setPrice(index) {
  priceIndex = index;
  priceCards.forEach((card, i) => card.classList.toggle('active', i === index));
  planLive.textContent = priceCards[index].dataset.plan;
}
priceCards.forEach((card, i) => {
  card.addEventListener('mouseenter', () => setPrice(i));
});
setInterval(() => {
  if (window.innerWidth <= 980) return;
  setPrice((priceIndex + 1) % priceCards.length);
}, 2800);

const tiltNodes = document.querySelectorAll('.tilt');
tiltNodes.forEach((node) => {
  node.addEventListener('mousemove', (event) => {
    const rect = node.getBoundingClientRect();
    const dx = (event.clientX - rect.left) / rect.width - 0.5;
    const dy = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `perspective(720px) rotateX(${(-dy * 5).toFixed(2)}deg) rotateY(${(dx * 6).toFixed(2)}deg)`;
  });
  node.addEventListener('mouseleave', () => {
    node.style.transform = '';
  });
});

const heroSpot = document.querySelector('#heroSpot');
heroSpot.addEventListener('mousemove', (event) => {
  const x = (event.clientX / window.innerWidth) * 100;
  const y = (event.clientY / window.innerHeight) * 100;
  heroSpot.style.background = `radial-gradient(500px at ${x}% ${y}%, rgba(255,255,255,.45), transparent 60%)`;
});
heroSpot.addEventListener('mouseleave', () => {
  heroSpot.style.background = 'transparent';
});

const tickerTrack = document.querySelector('.ticker-track');
if (tickerTrack) {
  tickerTrack.innerHTML += tickerTrack.innerHTML;
}

page.addEventListener('scroll', () => {
  const max = page.scrollHeight - page.clientHeight;
  const ratio = max <= 0 ? 0 : (page.scrollTop / max) * 100;
  progressBar.style.width = `${ratio}%`;
});
