/* ══════════════════════════════════════════════
   MOLDELAJE — main.js
══════════════════════════════════════════════ */

/* Sinaliza que JS carregou — ativa o reveal no CSS */
document.body.classList.add('js-ready');

const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('nav-mobile');
const floatWpp  = document.getElementById('float-wpp');

/* ── Navbar: sombra após scroll ── */
function updateNav() {
  if (!navbar) return;
  const scrolled = window.scrollY > 10;
  navbar.classList.toggle('nav-scrolled',    scrolled);
  navbar.classList.toggle('nav-transparent', !scrolled);
}
updateNav();
window.addEventListener('scroll', updateNav, { passive: true });

/* ── Float WhatsApp: aparece somente após 300px de scroll ── */
function toggleFloatWpp() {
  if (!floatWpp) return;
  floatWpp.classList.toggle('visible', window.scrollY > 300);
}
toggleFloatWpp();
window.addEventListener('scroll', toggleFloatWpp, { passive: true });

/* ── Hamburger / menu mobile ── */
hamburger?.addEventListener('click', () => {
  const open = navMobile.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});

navMobile?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navMobile.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  })
);

document.addEventListener('click', e => {
  if (!navbar || !navMobile) return;
  if (!navbar.contains(e.target) && !navMobile.contains(e.target)) {
    navMobile.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

/* ── Scroll reveal ── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
