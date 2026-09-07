document.addEventListener('DOMContentLoaded', () => {

  /* Loader */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('loaded'), 300);
  });

  /* Footer year */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* Mobile nav toggle */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      nav.classList.remove('open');
    });
  });

  /* Active nav link on scroll */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#nav a');

  const setActiveLink = () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  /* Header shadow + back to top on scroll */
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');

  const onScroll = () => {
    header.style.boxShadow = window.scrollY > 20 ? '0 10px 30px -20px rgba(0,0,0,0.4)' : 'none';
    backToTop.classList.toggle('show', window.scrollY > 500);
    setActiveLink();
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* Scroll reveal animations */
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));

  /* Quotation form -> mailto */
  const quoteForm = document.getElementById('quoteForm');
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(quoteForm).entries());

    const subject = `Quotation Request from ${data.name}`;
    const bodyLines = [
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      `Event Date: ${data.date || 'Not specified'}`,
      `Looking for: ${data.type}`,
      `Approx. Quantity: ${data.quantity || 'Not specified'}`,
      '',
      'Details:',
      data.message
    ];

    const mailto = `mailto:thetohfahouse.keya@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    window.location.href = mailto;
  });

});
