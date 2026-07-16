/* ============================================
   FURIA IMMOBILIARE — MAIN.JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const drawerLinks = drawer.querySelectorAll('a');

  /* === 1. Ombra navbar allo scroll === */
  const onScroll = () => {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* === 2. Drawer mobile === */
  const openDrawer = () => {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    drawer.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  overlay.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  /* === 3. Smooth scroll su anchor link (compensa altezza navbar sticky) === */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* === 4. Toggle sidebar filtri su mobile (accordion) === */
  const filtriToggle = document.getElementById('filtriToggle');
  const sidebarFiltri = document.getElementById('sidebarFiltri');

  if (filtriToggle && sidebarFiltri) {
    filtriToggle.addEventListener('click', () => {
      const aperta = sidebarFiltri.classList.toggle('aperta');
      filtriToggle.setAttribute('aria-expanded', String(aperta));
    });
  }

  /* === 5. Ricerca rapida e filtri: nessun backend, scorre agli annunci === */
  // TODO: collegare la ricerca reale (filtro annunci) quando sarà disponibile un backend
  const scrollToAnnunci = (e) => {
    e.preventDefault();
    const target = document.getElementById('annunci');
    if (target) {
      const navHeight = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const ricercaRapidaForm = document.getElementById('ricercaRapidaForm');
  if (ricercaRapidaForm) {
    ricercaRapidaForm.addEventListener('submit', scrollToAnnunci);
  }

  const filtriForm = document.querySelector('.filtri-form');
  if (filtriForm) {
    filtriForm.addEventListener('submit', scrollToAnnunci);
  }

  /* === 6. Validazione form Contatti === */
  const contactForm = document.getElementById('contactForm');
  const contactFormSuccess = document.getElementById('contactFormSuccess');

  const emailValida = (valore) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valore);

  const segnalaCampoInvalido = (campo) => {
    campo.classList.add('invalido');
    campo.focus();
    setTimeout(() => campo.classList.remove('invalido'), 2500);
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = contactForm.querySelector('#c-nome');
      const email = contactForm.querySelector('#c-email');
      const cellulare = contactForm.querySelector('#c-cellulare');

      if (!nome.value.trim()) {
        segnalaCampoInvalido(nome);
        return;
      }
      if (!email.value.trim() || !emailValida(email.value.trim())) {
        segnalaCampoInvalido(email);
        return;
      }
      if (!cellulare.value.trim()) {
        segnalaCampoInvalido(cellulare);
        return;
      }

      // TODO: collegare endpoint Formspree quando disponibile
      contactFormSuccess.classList.add('visible');
      contactForm.reset();
      setTimeout(() => contactFormSuccess.classList.remove('visible'), 5000);
    });
  }

  /* === 7. Validazione form Valutazione immobile === */
  const valutaForm = document.getElementById('valutaForm');
  const valutaFormSuccess = document.getElementById('valutaFormSuccess');

  if (valutaForm) {
    valutaForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const superficie = valutaForm.querySelector('#v-superficie');

      if (!superficie.value || Number(superficie.value) <= 0) {
        segnalaCampoInvalido(superficie);
        return;
      }

      // TODO: collegare endpoint Formspree quando disponibile
      valutaFormSuccess.classList.add('visible');
      valutaForm.reset();
      setTimeout(() => valutaFormSuccess.classList.remove('visible'), 5000);
    });
  }

  /* === 8. Fade-in allo scroll con IntersectionObserver === */
  const fadeElements = document.querySelectorAll('.section-fade');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: rendi tutto visibile su browser obsoleti
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  /* === Pulsante WhatsApp: nasconde in scroll giù, mostra in scroll su === */
  const whatsappBtn = document.getElementById('whatsappBtn');
  if (whatsappBtn) {
    let ultimoScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const delta = scrollY - ultimoScrollY;

      if (Math.abs(delta) < 8) return;

      if (delta > 0 && scrollY > 80) {
        whatsappBtn.classList.add('whatsapp-float--nascosto');
      } else {
        whatsappBtn.classList.remove('whatsapp-float--nascosto');
      }

      ultimoScrollY = scrollY;
    }, { passive: true });
  }

});
