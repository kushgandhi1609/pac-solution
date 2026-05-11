/* ============================================
   PAC Solution Inc. - Site JS
   ============================================ */

function __pacInit() {

  // Loader
  const loader = document.getElementById('loader');
  if (loader) {
    window.setTimeout(() => loader.classList.add('hide'), 350);
  }

  // Year in footer
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Sticky nav shadow
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu toggle
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.setAttribute(
        'aria-expanded',
        links.classList.contains('open') ? 'true' : 'false'
      );
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.className = links.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // Active link highlighting
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Animated counters
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const dur = 1400;
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - start) / dur);
          const v = Math.floor(p * target);
          el.textContent = v + suffix;
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target + suffix;
        };
        requestAnimationFrame(tick);
        counterIO.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => counterIO.observe(el));

  // Back to top
  const topFab = document.querySelector('.top-fab');
  if (topFab) {
    window.addEventListener('scroll', () => {
      topFab.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
    topFab.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Product filter + search (products page)
  const grid = document.getElementById('product-grid');
  if (grid) {
    const cards = Array.from(grid.children);
    const search = document.getElementById('product-search');
    const chips = document.querySelectorAll('[data-filter]');
    let activeCat = 'all';

    const apply = () => {
      const q = (search?.value || '').toLowerCase().trim();
      cards.forEach(c => {
        const cat = c.getAttribute('data-cat');
        const text = c.textContent.toLowerCase();
        const passCat = activeCat === 'all' || cat === activeCat;
        const passQ = !q || text.includes(q);
        c.style.display = (passCat && passQ) ? '' : 'none';
      });
    };

    chips.forEach(ch => {
      ch.addEventListener('click', () => {
        chips.forEach(x => x.classList.remove('active'));
        ch.classList.add('active');
        activeCat = ch.getAttribute('data-filter');
        apply();
      });
    });
    if (search) search.addEventListener('input', apply);
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });

  // Lightbox (gallery)
  const lb = document.getElementById('lightbox');
  if (lb) {
    const lbImg = lb.querySelector('img');
    const items = Array.from(document.querySelectorAll('.gallery-item'));
    let idx = 0;
    const open = (i) => { idx = i; lbImg.src = items[i].querySelector('img').src; lb.classList.add('show'); };
    const close = () => lb.classList.remove('show');
    items.forEach((it, i) => it.addEventListener('click', () => open(i)));
    lb.querySelector('.close').addEventListener('click', close);
    lb.querySelector('.prev').addEventListener('click', () => open((idx - 1 + items.length) % items.length));
    lb.querySelector('.next').addEventListener('click', () => open((idx + 1) % items.length));
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('show')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') open((idx - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') open((idx + 1) % items.length);
    });
  }

  // Contact form (front-end only, no backend)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = document.getElementById('form-msg');
      msg.textContent = 'Thank you! Your enquiry has been recorded. Our team will contact you shortly.';
      form.reset();
      window.setTimeout(() => { msg.textContent = ''; }, 6000);
    });
  }

  // Newsletter
  const news = document.getElementById('newsletter');
  if (news) {
    news.addEventListener('submit', (e) => {
      e.preventDefault();
      const inp = news.querySelector('input');
      news.querySelector('button').textContent = 'Subscribed';
      inp.value = '';
      window.setTimeout(() => { news.querySelector('button').textContent = 'Subscribe'; }, 3000);
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', __pacInit);
} else {
  __pacInit();
}
