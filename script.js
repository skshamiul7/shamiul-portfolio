// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== Mobile menu toggle =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
function closeMenu() {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', closeMenu);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navLinks.classList.contains('open')) {
    closeMenu();
    menuToggle.focus();
  }
});

// ===== Theme toggle (dark / light) =====
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function syncTheme() {
  const isLight = root.getAttribute('data-theme') === 'light';
  themeToggle.setAttribute('aria-pressed', String(isLight));
}

themeToggle.addEventListener('click', () => {
  const isLight = root.getAttribute('data-theme') === 'light';
  if (isLight) {
    root.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    root.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
  syncTheme();
});

if (!localStorage.getItem('theme')) {
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  if (prefersLight) {
    root.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
}
syncTheme();

// ===== Typing effect =====
const roles = [
  'Software Engineer',
  'Full-Stack Web Developer',
  'Python Programmer',
  'CSE Student @ Bangladesh University',
  'AI/ML Enthusiast'
];
const typedEl = document.getElementById('typed');
let roleIndex = 0, charIndex = 0, isDeleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  typedEl.textContent = current.substring(0, charIndex);

  if (!isDeleting) {
    charIndex++;
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, isDeleting ? 55 : 95);
}
typeLoop();

// ===== Reveal on scroll =====
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== Contact form (Netlify AJAX submission) =====
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(form);
    const encoded = new URLSearchParams(formData).toString();

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encoded,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Contact form request failed with status ${response.status}`);
        }

        formMsg.textContent = "✅ Thanks! I'll get back to you soon.";
        formMsg.style.color = '#22d3ee';
        form.reset();
        setTimeout(() => (formMsg.textContent = ''), 5000);
      })
      .catch(() => {
        formMsg.textContent = '⚠️ Something went wrong. Please try again.';
        formMsg.style.color = '#dc2626';
      });
  });
}