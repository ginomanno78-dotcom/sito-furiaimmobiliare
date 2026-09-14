/* ============================================
   FURIA IMMOBILIARE SRLS — MAIN.JS
   Navbar, drawer, dropdown hero
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const drawer = document.getElementById("mobileDrawer");
  const overlay = document.getElementById("drawerOverlay");

  /* === Ombra navbar allo scroll === */
  const onScrollNavbar = () => {
    if (!navbar) return;
    navbar.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScrollNavbar, { passive: true });
  onScrollNavbar();

  /* === Drawer mobile === */
  const apriDrawer = () => {
    if (!drawer || !overlay || !hamburger) return;
    drawer.hidden = false;
    overlay.hidden = false;
    hamburger.classList.add("is-open");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "Chiudi menu");
    document.body.style.overflow = "hidden";
  };

  const chiudiDrawer = () => {
    if (!drawer || !overlay || !hamburger) return;
    drawer.hidden = true;
    overlay.hidden = true;
    hamburger.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Apri menu");
    document.body.style.overflow = "";
  };

  if (hamburger && drawer && overlay) {
    hamburger.addEventListener("click", () => {
      if (drawer.hidden) apriDrawer();
      else chiudiDrawer();
    });
    overlay.addEventListener("click", chiudiDrawer);
    drawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", chiudiDrawer);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !drawer.hidden) chiudiDrawer();
    });
  }

  /* === Helper dropdown generico === */
  const setupDropdown = ({ toggle, menu, onSelect }) => {
    if (!toggle || !menu) return;

    const chiudi = () => {
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    };

    const apri = () => {
      menu.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
    };

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (menu.hidden) apri();
      else chiudi();
    });

    menu.querySelectorAll('[role="option"], a').forEach((item) => {
      item.addEventListener("click", (e) => {
        if (onSelect) onSelect(item, e);
        chiudi();
      });
    });

    document.addEventListener("click", (e) => {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) chiudi();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") chiudi();
    });
  };

  /* === Dropdown navbar Vendi === */
  setupDropdown({
    toggle: document.getElementById("navVendiToggle"),
    menu: document.getElementById("navVendiMenu"),
  });

  /* === Dropdown ricerca: Compra / Affitta / Vendi === */
  const azioneLabel = document.getElementById("searchAzioneLabel");
  const azioneInput = document.getElementById("searchAzione");

  setupDropdown({
    toggle: document.getElementById("searchAzioneToggle"),
    menu: document.getElementById("searchAzioneMenu"),
    onSelect: (item) => {
      const valore = item.getAttribute("data-value");
      const testo = item.textContent.trim();
      if (azioneLabel) azioneLabel.textContent = testo;
      if (azioneInput) azioneInput.value = valore;
      item.parentElement.querySelectorAll('[role="option"]').forEach((opt) => {
        opt.setAttribute("aria-selected", String(opt === item));
      });
    },
  });

  /* === Dropdown ricerca: tipologia === */
  const tipoInput = document.getElementById("searchTipo");
  const tipoToggle = document.getElementById("searchTipoToggle");

  setupDropdown({
    toggle: tipoToggle,
    menu: document.getElementById("searchTipoMenu"),
    onSelect: (item) => {
      const valore = item.getAttribute("data-value");
      const icona = item.querySelector("img");
      if (tipoInput) tipoInput.value = valore;
      if (tipoToggle && icona) {
        const iconaToggle = tipoToggle.querySelector("img");
        if (iconaToggle) {
          iconaToggle.src = icona.src;
          // Cottage sul pulsante chiuso resta leggermente più grande
          iconaToggle.classList.toggle("icon--cottage", valore === "case-ville");
        }
      }
      item.parentElement.querySelectorAll('[role="option"]').forEach((opt) => {
        opt.setAttribute("aria-selected", String(opt === item));
      });
    },
  });

  /* === Submit ricerca (placeholder: scroll agli annunci vendita) === */
  // TODO: collegare filtro reale quando disponibili listing/pagine
  const heroSearchForm = document.getElementById("heroSearchForm");
  if (heroSearchForm) {
    heroSearchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const azione = azioneInput ? azioneInput.value : "compra";
      if (azione === "affitta") {
        window.location.href = "affitto.html";
        return;
      }
      if (azione === "vendi") {
        const target = document.getElementById("vendi");
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.hash = "vendi";
        }
        return;
      }
      window.location.href = "immobile.html?id=sparanise-cinquegrana-via-kennedy";
    });
  }

  /* === Immobili in Vendita: render card + carosello === */
  const trackVendita = document.getElementById("carouselVenditaTrack");
  const dotsVendita = document.getElementById("carouselVenditaDots");
  const carouselVendita = document.querySelector('[data-carousel="vendita"]');

  const creaCardAnnuncio = (annuncio) => {
    const article = document.createElement("article");
    article.className = "card-annuncio" + (annuncio.placeholder ? " card-annuncio--vuota" : "");
    article.dataset.id = annuncio.id;

    if (annuncio.placeholder) {
      article.innerHTML = `
        <div class="card-annuncio-media card-annuncio-media--vuota">
          <span>Prossimamente</span>
        </div>
        <div class="card-annuncio-body">
          <p class="card-annuncio-tipo">Nuovo annuncio</p>
          <div class="card-annuncio-riga">
            <p class="card-annuncio-comune">In arrivo</p>
            <p class="card-annuncio-prezzo">—</p>
          </div>
          <div class="card-annuncio-meta">
            <div class="card-annuncio-specs">
              <div class="card-spec"><span class="card-spec-icon"><img src="assets/images/icons/icon-planimetria.svg" alt="" width="26" height="26"></span><span>— mq.</span></div>
              <div class="card-spec"><span class="card-spec-icon"><img src="assets/images/icons/icon-camera-letto.svg" alt="" width="26" height="26"></span><span>— locali</span></div>
              <div class="card-spec"><span class="card-spec-icon"><img src="assets/images/icons/icon-bagno.svg" alt="" width="26" height="26"></span><span>— bagno</span></div>
              <div class="card-spec"><span class="card-spec-icon"><img src="assets/images/icons/icon-scale.svg" alt="" width="26" height="26"></span><span>— piano</span></div>
            </div>
            <span class="card-annuncio-cta">Scopri &gt;</span>
          </div>
        </div>
      `;
      return article;
    }

    const titolo = formatTipologia(annuncio);
    const prezzo = formatPrezzo(annuncio.prezzo);
    const href = annuncio.collegabile ? `immobile.html?id=${encodeURIComponent(annuncio.id)}` : "";
    /* Con link a tutta card, Scopri resta solo testo (niente <a> annidati) */
    const cta = `<span class="card-annuncio-cta">Scopri &gt;</span>`;
    const altCover = `${titolo} a ${annuncio.comune}`;
    const media = `<div class="card-annuncio-media"><img src="${annuncio.cover}" alt="${altCover}" width="600" height="400" loading="lazy"></div>`;

    /* Icona condividi (riusabile su tutte le card collegabili) */
    const shareHtml = href
      ? `<div class="card-annuncio-share">
          <button type="button" class="card-annuncio-share-btn" aria-label="Condividi annuncio" aria-expanded="false" aria-haspopup="true">
            <span class="card-annuncio-share-tooltip" aria-hidden="true">Condividi annuncio</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="18" cy="5" r="3" stroke="currentColor" stroke-width="1.6"/>
              <circle cx="6" cy="12" r="3" stroke="currentColor" stroke-width="1.6"/>
              <circle cx="18" cy="19" r="3" stroke="currentColor" stroke-width="1.6"/>
              <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
            </svg>
          </button>
          <ul class="card-annuncio-share-menu" hidden role="menu">
            <li role="none"><button type="button" role="menuitem" data-share="whatsapp"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.99.59 3.85 1.6 5.42L2 22l4.92-1.7a9.86 9.86 0 0 0 5.12 1.4h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.77 13.99c-.24.67-1.38 1.23-1.91 1.31-.49.07-1.11.1-1.79-.11-.41-.13-.94-.3-1.62-.59-2.85-1.23-4.7-4.1-4.84-4.29-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.36.26-.29.57-.36.76-.36h.55c.17 0 .4-.07.62.47.24.58.81 2 .88 2.14.07.14.12.31.02.5-.1.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.56.16.28.71 1.17 1.53 1.9 1.05.93 1.94 1.22 2.21 1.36.28.14.44.12.6-.07.17-.19.7-.81.89-1.09.19-.28.38-.23.64-.14.26.1 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.69-.17 1.36z"/></svg><span>WhatsApp</span></button></li>
            <li role="none"><button type="button" role="menuitem" data-share="email"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75v10.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V6.75z" stroke="currentColor" stroke-width="1.6"/><path d="M4 7l8 6 8-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Email</span></button></li>
            <li role="none"><button type="button" role="menuitem" data-share="facebook"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-1.5c0-.3.2-.5.5-.5H14z"/></svg><span>Facebook</span></button></li>
            <li role="none"><button type="button" role="menuitem" data-share="linkedin"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.5 9.5H3.7V20h2.8V9.5zM5.1 4A1.6 1.6 0 1 0 5.1 7.2 1.6 1.6 0 0 0 5.1 4zM20.3 20h-2.8v-5.6c0-1.8-.7-3-2.3-3-1.2 0-1.9.8-2.2 1.6-.1.3-.1.7-.1 1.1V20h-2.8s.04-9.3 0-10.5h2.8v1.5c.4-.6 1.4-1.8 3.4-1.8 2.5 0 4.3 1.6 4.3 5.1V20z"/></svg><span>LinkedIn</span></button></li>
            <li role="none"><button type="button" role="menuitem" data-share="copia"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M6 15H5a1.5 1.5 0 0 1-1.5-1.5V5A1.5 1.5 0 0 1 5 3.5h8.5A1.5 1.5 0 0 1 15 5v1" stroke="currentColor" stroke-width="1.6"/></svg><span>Copia link</span></button></li>
          </ul>
        </div>`
      : "";

    const prezzoRiga = href
      ? `<div class="card-annuncio-prezzo-riga">
          <p class="card-annuncio-prezzo">${prezzo}</p>
          ${shareHtml}
        </div>`
      : `<div class="card-annuncio-riga">
          <p class="card-annuncio-comune">${annuncio.comune}</p>
          <p class="card-annuncio-prezzo">${prezzo}</p>
        </div>`;

    if (href) article.classList.add("card-annuncio--cliccabile");

    article.innerHTML = href
      ? `
      ${media}
      <div class="card-annuncio-body">
        ${prezzoRiga}
        <p class="card-annuncio-tipo">${titolo}</p>
        <p class="card-annuncio-comune">${annuncio.comune}</p>
        <div class="card-annuncio-meta">
          <div class="card-annuncio-specs">
            <div class="card-spec"><span class="card-spec-icon"><img src="assets/images/icons/icon-planimetria.svg" alt="" width="26" height="26"></span><span>${annuncio.mq} mq.</span></div>
            <div class="card-spec"><span class="card-spec-icon"><img src="assets/images/icons/icon-camera-letto.svg" alt="" width="26" height="26"></span><span>${annuncio.locali} locali</span></div>
            <div class="card-spec"><span class="card-spec-icon"><img src="assets/images/icons/icon-bagno.svg" alt="" width="26" height="26"></span><span>${annuncio.bagni} bagno${annuncio.bagni === 1 ? "" : "i"}</span></div>
            <div class="card-spec"><span class="card-spec-icon"><img src="assets/images/icons/icon-scale.svg" alt="" width="26" height="26"></span><span>${formatPiano(annuncio.piano)}</span></div>
          </div>
          ${cta}
        </div>
      </div>
    `
      : `
      ${media}
      <div class="card-annuncio-body">
        <p class="card-annuncio-tipo">${titolo}</p>
        ${prezzoRiga}
        <div class="card-annuncio-meta">
          <div class="card-annuncio-specs">
            <div class="card-spec"><span class="card-spec-icon"><img src="assets/images/icons/icon-planimetria.svg" alt="" width="26" height="26"></span><span>${annuncio.mq} mq.</span></div>
            <div class="card-spec"><span class="card-spec-icon"><img src="assets/images/icons/icon-camera-letto.svg" alt="" width="26" height="26"></span><span>${annuncio.locali} locali</span></div>
            <div class="card-spec"><span class="card-spec-icon"><img src="assets/images/icons/icon-bagno.svg" alt="" width="26" height="26"></span><span>${annuncio.bagni} bagno${annuncio.bagni === 1 ? "" : "i"}</span></div>
            <div class="card-spec"><span class="card-spec-icon"><img src="assets/images/icons/icon-scale.svg" alt="" width="26" height="26"></span><span>${formatPiano(annuncio.piano)}</span></div>
          </div>
          ${cta}
        </div>
      </div>
    `;

    /* Link a tutta la card (qualsiasi punto) */
    if (href) {
      const hit = document.createElement("a");
      hit.href = href;
      hit.className = "card-annuncio-hit";
      hit.setAttribute("aria-label", altCover);
      article.appendChild(hit);

      const shareBtn = article.querySelector(".card-annuncio-share-btn");
      const shareMenu = article.querySelector(".card-annuncio-share-menu");
      if (shareBtn && shareMenu) {
        const urlAssoluto = new URL(href, window.location.href).href;
        const testoShare = `${titolo} — ${annuncio.comune}\n${urlAssoluto}`;

        const chiudiShare = () => {
          shareMenu.hidden = true;
          shareBtn.setAttribute("aria-expanded", "false");
        };

        /* Posiziona il menu in fixed sotto (o sopra) l’icona, fuori dallo scroll del carousel */
        const posizionaShareMenu = () => {
          const r = shareBtn.getBoundingClientRect();
          shareMenu.style.left = "auto";
          shareMenu.style.right = `${Math.max(8, window.innerWidth - r.right)}px`;
          shareMenu.hidden = false;
          const h = shareMenu.offsetHeight || 220;
          const spazioSotto = window.innerHeight - r.bottom;
          if (spazioSotto < h + 12) {
            shareMenu.style.top = `${Math.max(8, r.top - h - 6)}px`;
          } else {
            shareMenu.style.top = `${r.bottom + 6}px`;
          }
        };

        shareBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const eraChiuso = shareMenu.hidden;
          document.querySelectorAll(".card-annuncio-share-menu").forEach((m) => {
            m.hidden = true;
          });
          document.querySelectorAll(".card-annuncio-share-btn").forEach((b) => {
            b.setAttribute("aria-expanded", "false");
          });
          if (eraChiuso) {
            posizionaShareMenu();
            shareBtn.setAttribute("aria-expanded", "true");
          }
        });

        shareMenu.addEventListener("click", (e) => e.stopPropagation());

        shareMenu.querySelectorAll("[data-share]").forEach((btn) => {
          btn.addEventListener("click", async (e) => {
            e.preventDefault();
            e.stopPropagation();
            const canale = btn.getAttribute("data-share");
            if (canale === "whatsapp") {
              window.open(`https://wa.me/?text=${encodeURIComponent(testoShare)}`, "_blank", "noopener");
            } else if (canale === "email") {
              window.location.href = `mailto:?subject=${encodeURIComponent(titolo)}&body=${encodeURIComponent(testoShare)}`;
            } else if (canale === "facebook") {
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlAssoluto)}`,
                "_blank",
                "noopener"
              );
            } else if (canale === "linkedin") {
              window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urlAssoluto)}`,
                "_blank",
                "noopener"
              );
            } else if (canale === "copia") {
              const label = btn.querySelector("span");
              try {
                await navigator.clipboard.writeText(urlAssoluto);
                if (label) label.textContent = "Link copiato";
                setTimeout(() => {
                  if (label) label.textContent = "Copia link";
                }, 1600);
              } catch (err) {
                window.prompt("Copia il link:", urlAssoluto);
              }
            }
            if (canale !== "copia") chiudiShare();
          });
        });

        document.addEventListener("click", (e) => {
          if (!article.contains(e.target) && !shareMenu.contains(e.target)) chiudiShare();
        });

        window.addEventListener("scroll", chiudiShare, true);
        window.addEventListener("resize", chiudiShare);
      }
    }

    return article;
  };

  const initCarousel = (carouselEl, trackEl, dotsEl, items) => {
    if (!carouselEl || !trackEl || !dotsEl) return;

    trackEl.innerHTML = "";
    dotsEl.innerHTML = "";
    items.forEach((item) => trackEl.appendChild(creaCardAnnuncio(item)));

    const cards = () => [...trackEl.querySelectorAll(".card-annuncio")];
    const singolo = items.length <= 1;
    carouselEl.classList.toggle("is-singolo", singolo);

    // Dot navigation: un punto ogni “pagina” (max 4 come mockup, o = n card)
    const maxDots = Math.min(4, Math.max(items.length, 1));
    for (let i = 0; i < maxDots; i += 1) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", `Vai alla posizione ${i + 1}`);
      dot.addEventListener("click", () => {
        const list = cards();
        const target = list[Math.min(i, list.length - 1)];
        if (target) {
          trackEl.style.scrollSnapType = "x mandatory";
          target.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
        }
      });
      dotsEl.appendChild(dot);
    }

    const getCardStep = () => {
      const first = cards()[0];
      if (!first) return 300;
      const gap = parseFloat(getComputedStyle(trackEl).gap) || 20;
      return first.getBoundingClientRect().width + gap;
    };

    const scrollByCard = (direzione) => {
      trackEl.style.scrollSnapType = "x mandatory";
      trackEl.scrollBy({ left: direzione * getCardStep(), behavior: "smooth" });
    };

    const btnPrev = carouselEl.querySelector(".carousel-btn--prev");
    const btnNext = carouselEl.querySelector(".carousel-btn--next");
    if (btnPrev) btnPrev.addEventListener("click", () => scrollByCard(-1));
    if (btnNext) btnNext.addEventListener("click", () => scrollByCard(1));

    const aggiornaDots = () => {
      const list = cards();
      if (!list.length) return;
      const step = getCardStep();
      const index = Math.round(trackEl.scrollLeft / step);
      const dots = [...dotsEl.querySelectorAll(".carousel-dot")];
      const active = Math.min(Math.max(index, 0), dots.length - 1);
      dots.forEach((d, i) => d.classList.toggle("is-active", i === active));
    };

    trackEl.addEventListener("scroll", aggiornaDots, { passive: true });

    // Drag disattivato se c’è una sola card (evita oscillio touch su mobile)
    if (singolo) return;

    // Drag con pointer events (snap off durante il drag)
    let dragging = false;
    let startX = 0;
    let startScroll = 0;

    trackEl.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      /* Non avviare il drag su link/pulsanti: altrimenti «Scopri» non apre immobile.html */
      if (e.target.closest("a, button")) return;
      dragging = true;
      startX = e.clientX;
      startScroll = trackEl.scrollLeft;
      trackEl.classList.add("is-dragging");
      trackEl.style.scrollSnapType = "none";
      trackEl.setPointerCapture(e.pointerId);
    });

    trackEl.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      trackEl.scrollLeft = startScroll - dx;
    });

    const fineDrag = (e) => {
      if (!dragging) return;
      dragging = false;
      trackEl.classList.remove("is-dragging");
      // piccola inerzia
      const dx = e.clientX - startX;
      trackEl.scrollLeft = startScroll - dx * 1.15;
      trackEl.style.scrollSnapType = "x mandatory";
      aggiornaDots();
    };

    trackEl.addEventListener("pointerup", fineDrag);
    trackEl.addEventListener("pointercancel", fineDrag);
  };

  if (typeof getAnnunciVenditaHome === "function") {
    initCarousel(carouselVendita, trackVendita, dotsVendita, getAnnunciVenditaHome());
  }

  /* ===== FORM VALUTA ===== */
  const formValuta = document.getElementById("formValutazioneOnline");
  const valutaMsg = document.getElementById("valutaFormMsg");

  const setupValutaDropdown = (toggleId, menuId, inputId, labelId) => {
    const toggle = document.getElementById(toggleId);
    const menu = document.getElementById(menuId);
    const input = document.getElementById(inputId);
    const label = document.getElementById(labelId);
    if (!toggle || !menu || !input || !label) return;

    setupDropdown({
      toggle,
      menu,
      onSelect: (item) => {
        const value = item.getAttribute("data-value") || "";
        const text = item.textContent.trim();
        input.value = value;
        label.textContent = text;
        label.classList.add("is-selected");
        menu.querySelectorAll('[role="option"]').forEach((opt) => {
          opt.setAttribute("aria-selected", opt === item ? "true" : "false");
        });
      },
    });
  };

  setupValutaDropdown("valutaTipologiaToggle", "valutaTipologiaMenu", "valutaTipologia", "valutaTipologiaLabel");
  setupValutaDropdown("valutaStatoToggle", "valutaStatoMenu", "valutaStato", "valutaStatoLabel");

  if (formValuta) {
    formValuta.addEventListener("submit", (e) => {
      e.preventDefault();
      if (valutaMsg) {
        valutaMsg.hidden = true;
        valutaMsg.classList.remove("is-errore", "is-ok");
      }

      const tipologia = document.getElementById("valutaTipologia");
      const privacy = formValuta.querySelector('input[name="privacy"]');

      if (!formValuta.checkValidity() || (tipologia && !tipologia.value) || (privacy && !privacy.checked)) {
        formValuta.reportValidity();
        if (valutaMsg) {
          valutaMsg.hidden = false;
          valutaMsg.classList.add("is-errore");
          valutaMsg.textContent = "Compila tutti i campi obbligatori (*) e accetta la privacy.";
        }
        return;
      }

      // TODO: Formspree — invio reale del form
      if (valutaMsg) {
        valutaMsg.hidden = false;
        valutaMsg.classList.add("is-ok");
        valutaMsg.textContent = "Richiesta pronta. L'invio sarà collegato a Formspree.";
      }
    });
  }

  /* ===== FAQ accordion ===== */
  const faqLista = document.querySelector("[data-faq]");
  if (faqLista) {
    faqLista.querySelectorAll(".faq-item").forEach((item) => {
      const btn = item.querySelector(".faq-domanda");
      const risposta = item.querySelector(".faq-risposta");
      const toggle = item.querySelector(".faq-toggle");
      if (!btn || !risposta || !toggle) return;

      btn.addEventListener("click", () => {
        const aperto = item.classList.contains("is-open");

        // Chiude le altre (una aperta alla volta)
        faqLista.querySelectorAll(".faq-item.is-open").forEach((altro) => {
          if (altro === item) return;
          altro.classList.remove("is-open");
          const aBtn = altro.querySelector(".faq-domanda");
          const aRis = altro.querySelector(".faq-risposta");
          const aTog = altro.querySelector(".faq-toggle");
          if (aBtn) aBtn.setAttribute("aria-expanded", "false");
          if (aRis) aRis.hidden = true;
          if (aTog) aTog.textContent = "+";
        });

        if (aperto) {
          item.classList.remove("is-open");
          btn.setAttribute("aria-expanded", "false");
          risposta.hidden = true;
          toggle.textContent = "+";
        } else {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
          risposta.hidden = false;
          toggle.textContent = "−";
        }
      });
    });
  }

  /* ===== Servizi accordion (uno aperto alla volta) ===== */
  const serviziAccordion = document.querySelector("[data-servizi-accordion]");
  if (serviziAccordion) {
    serviziAccordion.querySelectorAll(".servizi-item").forEach((item) => {
      const btn = item.querySelector(".servizi-toggle");
      const panel = item.querySelector(".servizi-panel");
      const segno = item.querySelector(".servizi-toggle-segno");
      if (!btn || !panel || !segno) return;

      btn.addEventListener("click", () => {
        const aperto = item.classList.contains("is-open");

        serviziAccordion.querySelectorAll(".servizi-item.is-open").forEach((altro) => {
          if (altro === item) return;
          altro.classList.remove("is-open");
          const aBtn = altro.querySelector(".servizi-toggle");
          const aPanel = altro.querySelector(".servizi-panel");
          const aSegno = altro.querySelector(".servizi-toggle-segno");
          if (aBtn) aBtn.setAttribute("aria-expanded", "false");
          if (aPanel) aPanel.hidden = true;
          if (aSegno) aSegno.textContent = "+";
        });

        if (aperto) {
          item.classList.remove("is-open");
          btn.setAttribute("aria-expanded", "false");
          panel.hidden = true;
          segno.textContent = "+";
        } else {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
          panel.hidden = false;
          segno.textContent = "−";
        }
      });
    });
  }

  /* ===== FORM CONTATTI (secondo Seleziona vincolato al primo) ===== */
  const dettagliPerIntento = {
    compra: [{ value: "acquistare-immobile", label: "Acquistare un immobile" }],
    affitta: [
      { value: "affitta-immobile", label: "Affitta un immobile" },
      { value: "affittare-proprieta", label: "Affittare una proprietà" },
    ],
    vendi: [
      { value: "vendere-immobile", label: "Vendere un immobile" },
      { value: "valutare-proprieta", label: "Valutare una proprietà" },
    ],
  };

  const contattiIntento = document.getElementById("contattiIntento");
  const contattiIntentoToggle = document.getElementById("contattiIntentoToggle");
  const contattiIntentoMenu = document.getElementById("contattiIntentoMenu");
  const contattiIntentoLabel = document.getElementById("contattiIntentoLabel");
  const contattiDettaglio = document.getElementById("contattiDettaglio");
  const contattiDettaglioToggle = document.getElementById("contattiDettaglioToggle");
  const contattiDettaglioMenu = document.getElementById("contattiDettaglioMenu");
  const contattiDettaglioLabel = document.getElementById("contattiDettaglioLabel");
  const formContatti = document.getElementById("formContatti");
  const contattiMsg = document.getElementById("contattiFormMsg");

  // Ricostruisce il secondo menu solo con le voci dell'intento scelto
  const aggiornaDettaglioContatti = (intento) => {
    if (!contattiDettaglioMenu || !contattiDettaglio || !contattiDettaglioLabel || !contattiDettaglioToggle) return;

    const opzioni = dettagliPerIntento[intento] || [];
    contattiDettaglioMenu.innerHTML = "";
    contattiDettaglioMenu.hidden = true;
    contattiDettaglioToggle.setAttribute("aria-expanded", "false");
    contattiDettaglio.value = "";
    contattiDettaglioLabel.textContent = "Seleziona";
    contattiDettaglioLabel.classList.remove("is-selected");

    opzioni.forEach((opt) => {
      const li = document.createElement("li");
      li.setAttribute("role", "option");
      li.setAttribute("data-value", opt.value);
      li.textContent = opt.label;
      li.addEventListener("click", () => {
        contattiDettaglio.value = opt.value;
        contattiDettaglioLabel.textContent = opt.label;
        contattiDettaglioLabel.classList.add("is-selected");
        contattiDettaglioMenu.hidden = true;
        contattiDettaglioToggle.setAttribute("aria-expanded", "false");
      });
      contattiDettaglioMenu.appendChild(li);
    });
  };

  if (contattiIntentoToggle && contattiIntentoMenu) {
    setupDropdown({
      toggle: contattiIntentoToggle,
      menu: contattiIntentoMenu,
      onSelect: (item) => {
        const value = item.getAttribute("data-value") || "";
        const text = item.textContent.trim();
        if (contattiIntento) contattiIntento.value = value;
        if (contattiIntentoLabel) {
          contattiIntentoLabel.textContent = text;
          contattiIntentoLabel.classList.add("is-selected");
        }
        aggiornaDettaglioContatti(value);
      },
    });
  }

  if (contattiDettaglioToggle && contattiDettaglioMenu) {
    setupDropdown({
      toggle: contattiDettaglioToggle,
      menu: contattiDettaglioMenu,
    });
  }

  if (formContatti) {
    formContatti.addEventListener("submit", (e) => {
      e.preventDefault();
      if (contattiMsg) {
        contattiMsg.hidden = true;
        contattiMsg.classList.remove("is-errore", "is-ok");
      }

      const privacy = formContatti.querySelector('input[name="privacy"]');
      const ok =
        formContatti.checkValidity() &&
        contattiIntento &&
        contattiIntento.value &&
        contattiDettaglio &&
        contattiDettaglio.value &&
        privacy &&
        privacy.checked;

      if (!ok) {
        formContatti.reportValidity();
        if (contattiMsg) {
          contattiMsg.hidden = false;
          contattiMsg.classList.add("is-errore");
          contattiMsg.textContent = "Compila tutti i campi obbligatori (*) e accetta la privacy.";
        }
        return;
      }

      // TODO: Formspree — invio reale del form contatti
      if (contattiMsg) {
        contattiMsg.hidden = false;
        contattiMsg.classList.add("is-ok");
        contattiMsg.textContent = "Richiesta pronta. L'invio sarà collegato a Formspree.";
      }
    });
  }

  /* === Pagina dettaglio immobile (?id=) === */
  const paginaImmobile = document.getElementById("paginaImmobile");
  const paginaImmobileErrore = document.getElementById("paginaImmobileErrore");

  if (paginaImmobile) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const trovaAnnuncio = (annuncioId) => {
      if (!annuncioId || typeof annunci === "undefined") return null;
      const lista = [...(annunci.vendita || []), ...(annunci.affitto || [])];
      return lista.find((a) => a.id === annuncioId && !a.placeholder && a.collegabile) || null;
    };

    const annuncio = trovaAnnuncio(id);

    if (!annuncio) {
      paginaImmobile.hidden = true;
      if (paginaImmobileErrore) paginaImmobileErrore.hidden = false;
    } else {
      if (paginaImmobileErrore) paginaImmobileErrore.hidden = true;
      paginaImmobile.hidden = false;
      paginaImmobile.dataset.stato = "pronto";

      const prezzo = typeof formatPrezzo === "function" ? formatPrezzo(annuncio.prezzo) : "";

      const elContratto = document.getElementById("immobileContratto");
      const elTitolo = document.getElementById("immobileTitolo");
      const elComune = document.getElementById("immobileComune");
      const elPrezzo = document.getElementById("immobilePrezzo");
      const elDescrizione = document.getElementById("immobileDescrizione");
      const elFoto = document.getElementById("immobileFotoPrincipale");
      const elFotoDots = document.getElementById("immobileFotoDots");
      const elFotoCount = document.getElementById("immobileFotoCount");
      const elBtnPlanimetria = document.getElementById("immobileBtnPlanimetria");
      const elBtnFoto = document.getElementById("immobileBtnFoto");
      const elBtnVideo = document.getElementById("immobileBtnVideo");
      const elScheda = document.getElementById("immobileSchedaLista");
      const elFotoBox = elFoto ? elFoto.closest(".immobile-galleria-principale") : null;
      const elMappa = document.getElementById("immobileMappa");

      // Etichetta contratto in evidenza (es. IN VENDITA)
      const contrattoLabel =
        annuncio.contratto && /affitto/i.test(annuncio.contratto) ? "IN AFFITTO" : "IN VENDITA";

      // Titolo su un rigo: tipologia + via + eventuale angolo
      const viaTitolo = (annuncio.via || "").replace(/A\.B\./g, "A. B.");
      let titoloRiga = annuncio.tipologia || "";
      if (viaTitolo) titoloRiga += ` in ${viaTitolo}`;
      if (annuncio.angoloCon) {
        const angolo = annuncio.angoloCon.replace(/^Via\s+/i, "via ");
        titoloRiga += ` (ad angolo con ${angolo})`;
      }

      document.title = `${titoloRiga} — Furia Immobiliare Srls`;

      if (elContratto) elContratto.textContent = contrattoLabel;
      if (elTitolo) elTitolo.textContent = titoloRiga;
      if (elComune) elComune.textContent = (annuncio.comune || "").toUpperCase();
      if (elPrezzo) elPrezzo.textContent = prezzo;
      if (elDescrizione) elDescrizione.textContent = annuncio.descrizione || "";

      /* Specs sotto prezzo: mq, locali, bagni, piano (come card home) */
      const elSpecs = document.getElementById("immobileSpecs");
      if (elSpecs) {
        const bagnoLabel =
          annuncio.bagni == null
            ? ""
            : `${annuncio.bagni} bagno${annuncio.bagni === 1 ? "" : "i"}`;
        const pianoLabel =
          typeof formatPiano === "function" ? formatPiano(annuncio.piano) : annuncio.piano;
        const voci = [
          {
            icona: "assets/images/icons/icon-planimetria.svg",
            testo: annuncio.mq != null ? `${annuncio.mq} mq.` : null
          },
          {
            icona: "assets/images/icons/icon-camera-letto.svg",
            testo: annuncio.locali != null ? `${annuncio.locali} locali` : null
          },
          {
            icona: "assets/images/icons/icon-bagno.svg",
            testo: bagnoLabel || null
          },
          {
            icona: "assets/images/icons/icon-scale.svg",
            testo: pianoLabel || null
          }
        ].filter((v) => v.testo);

        elSpecs.innerHTML = voci
          .map(
            (v) =>
              `<div class="card-spec"><span class="card-spec-icon"><img src="${v.icona}" alt="" width="26" height="26"></span><span>${v.testo}</span></div>`
          )
          .join("");
      }

      /* Condividi: angolo alto destro foto, base = base inferiore specs */
      const elCondividi = document.getElementById("immobileCondividi");
      const elMedia = document.querySelector(".immobile-media");
      if (elCondividi && elMedia && elFotoBox && elSpecs) {
        const urlShare = window.location.href;
        const titoloShare = titoloRiga;
        const testoShare = `${titoloShare} — ${annuncio.comune || ""}\n${urlShare}`;
        elCondividi.innerHTML = `<div class="card-annuncio-share">
          <button type="button" class="card-annuncio-share-btn" aria-label="Condividi annuncio" aria-expanded="false" aria-haspopup="true">
            <span class="card-annuncio-share-tooltip" aria-hidden="true">Condividi annuncio</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="18" cy="5" r="3" stroke="currentColor" stroke-width="1.6"/>
              <circle cx="6" cy="12" r="3" stroke="currentColor" stroke-width="1.6"/>
              <circle cx="18" cy="19" r="3" stroke="currentColor" stroke-width="1.6"/>
              <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
            </svg>
          </button>
          <ul class="card-annuncio-share-menu" hidden role="menu">
            <li role="none"><button type="button" role="menuitem" data-share="whatsapp"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.99.59 3.85 1.6 5.42L2 22l4.92-1.7a9.86 9.86 0 0 0 5.12 1.4h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.77 13.99c-.24.67-1.38 1.23-1.91 1.31-.49.07-1.11.1-1.79-.11-.41-.13-.94-.3-1.62-.59-2.85-1.23-4.7-4.1-4.84-4.29-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.36.26-.29.57-.36.76-.36h.55c.17 0 .4-.07.62.47.24.58.81 2 .88 2.14.07.14.12.31.02.5-.1.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.56.16.28.71 1.17 1.53 1.9 1.05.93 1.94 1.22 2.21 1.36.28.14.44.12.6-.07.17-.19.7-.81.89-1.09.19-.28.38-.23.64-.14.26.1 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.69-.17 1.36z"/></svg><span>WhatsApp</span></button></li>
            <li role="none"><button type="button" role="menuitem" data-share="email"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75v10.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V6.75z" stroke="currentColor" stroke-width="1.6"/><path d="M4 7l8 6 8-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Email</span></button></li>
            <li role="none"><button type="button" role="menuitem" data-share="facebook"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-1.5c0-.3.2-.5.5-.5H14z"/></svg><span>Facebook</span></button></li>
            <li role="none"><button type="button" role="menuitem" data-share="linkedin"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.5 9.5H3.7V20h2.8V9.5zM5.1 4A1.6 1.6 0 1 0 5.1 7.2 1.6 1.6 0 0 0 5.1 4zM20.3 20h-2.8v-5.6c0-1.8-.7-3-2.3-3-1.2 0-1.9.8-2.2 1.6-.1.3-.1.7-.1 1.1V20h-2.8s.04-9.3 0-10.5h2.8v1.5c.4-.6 1.4-1.8 3.4-1.8 2.5 0 4.3 1.6 4.3 5.1V20z"/></svg><span>LinkedIn</span></button></li>
            <li role="none"><button type="button" role="menuitem" data-share="copia"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M6 15H5a1.5 1.5 0 0 1-1.5-1.5V5A1.5 1.5 0 0 1 5 3.5h8.5A1.5 1.5 0 0 1 15 5v1" stroke="currentColor" stroke-width="1.6"/></svg><span>Copia link</span></button></li>
          </ul>
        </div>`;

        const shareBtn = elCondividi.querySelector(".card-annuncio-share-btn");
        const shareMenu = elCondividi.querySelector(".card-annuncio-share-menu");

        /* Allinea: base specs + bordo destro foto.
           Solo telefoni portrait (<520px): riga prezzo.
           Tablet ribelli (≥520: Tab S4/A7/A9/S10 FE, OnePlus Pad, M10) restano angolo foto. */
        const mqMobilePortrait = window.matchMedia(
          "(max-width: 519px) and (orientation: portrait)"
        );
        const posizionaCondividi = () => {
          const fr = elFotoBox.getBoundingClientRect();
          const mr = elMedia.getBoundingClientRect();
          const h = elCondividi.offsetHeight || 28;
          const w = elCondividi.offsetWidth || 28;
          elCondividi.style.left = `${fr.right - mr.left - w}px`;

          if (mqMobilePortrait.matches && elPrezzo) {
            const pr = elPrezzo.getBoundingClientRect();
            elCondividi.style.top = `${pr.top + (pr.height - h) / 2 - mr.top}px`;
          } else {
            const sr = elSpecs.getBoundingClientRect();
            elCondividi.style.top = `${sr.bottom - mr.top - h}px`;
          }
        };

        requestAnimationFrame(() => requestAnimationFrame(posizionaCondividi));
        window.addEventListener("resize", posizionaCondividi);
        if (typeof mqMobilePortrait.addEventListener === "function") {
          mqMobilePortrait.addEventListener("change", posizionaCondividi);
        } else if (typeof mqMobilePortrait.addListener === "function") {
          mqMobilePortrait.addListener(posizionaCondividi);
        }
        if (typeof ResizeObserver !== "undefined") {
          const ro = new ResizeObserver(posizionaCondividi);
          ro.observe(elFotoBox);
          ro.observe(elSpecs);
          if (elPrezzo) ro.observe(elPrezzo);
        }

        if (shareBtn && shareMenu) {
          const chiudiShare = () => {
            shareMenu.hidden = true;
            shareBtn.setAttribute("aria-expanded", "false");
          };

          const posizionaShareMenu = () => {
            const r = shareBtn.getBoundingClientRect();
            shareMenu.style.left = "auto";
            shareMenu.style.right = `${Math.max(8, window.innerWidth - r.right)}px`;
            shareMenu.hidden = false;
            const h = shareMenu.offsetHeight || 220;
            const spazioSotto = window.innerHeight - r.bottom;
            if (spazioSotto < h + 12) {
              shareMenu.style.top = `${Math.max(8, r.top - h - 6)}px`;
            } else {
              shareMenu.style.top = `${r.bottom + 6}px`;
            }
          };

          shareBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const eraChiuso = shareMenu.hidden;
            document.querySelectorAll(".card-annuncio-share-menu").forEach((m) => {
              m.hidden = true;
            });
            document.querySelectorAll(".card-annuncio-share-btn").forEach((b) => {
              b.setAttribute("aria-expanded", "false");
            });
            if (eraChiuso) {
              posizionaShareMenu();
              shareBtn.setAttribute("aria-expanded", "true");
            }
          });

          shareMenu.addEventListener("click", (e) => e.stopPropagation());

          shareMenu.querySelectorAll("[data-share]").forEach((btn) => {
            btn.addEventListener("click", async (e) => {
              e.preventDefault();
              e.stopPropagation();
              const canale = btn.getAttribute("data-share");
              if (canale === "whatsapp") {
                window.open(`https://wa.me/?text=${encodeURIComponent(testoShare)}`, "_blank", "noopener");
              } else if (canale === "email") {
                window.location.href = `mailto:?subject=${encodeURIComponent(titoloShare)}&body=${encodeURIComponent(testoShare)}`;
              } else if (canale === "facebook") {
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlShare)}`,
                  "_blank",
                  "noopener"
                );
              } else if (canale === "linkedin") {
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urlShare)}`,
                  "_blank",
                  "noopener"
                );
              } else if (canale === "copia") {
                const label = btn.querySelector("span");
                try {
                  await navigator.clipboard.writeText(urlShare);
                  if (label) label.textContent = "Link copiato";
                  setTimeout(() => {
                    if (label) label.textContent = "Copia link";
                  }, 1600);
                } catch (err) {
                  window.prompt("Copia il link:", urlShare);
                }
              }
              if (canale !== "copia") chiudiShare();
            });
          });

          document.addEventListener("click", (e) => {
            if (!elCondividi.contains(e.target) && !shareMenu.contains(e.target)) chiudiShare();
          });

          window.addEventListener("scroll", chiudiShare, true);
          window.addEventListener("resize", chiudiShare);
        }
      }

      /* Mappa ubicazione (via + comune), larghezza container */
      if (elMappa) {
        const queryMappa = [annuncio.via, annuncio.comune].filter(Boolean).join(", ");
        if (queryMappa) {
          elMappa.src =
            "https://maps.google.com/maps?q=" +
            encodeURIComponent(queryMappa) +
            "&z=16&output=embed";
          elMappa.title = "Mappa: " + queryMappa;
        }
      }

      /* Segna landscape/portrait sulla foto (bordo aderente all'immagine) */
      const adattaOrientamentoFoto = () => {
        if (!elFoto || !elFotoBox || !elFoto.naturalWidth || !elFoto.naturalHeight) return;
        elFotoBox.dataset.orientamento =
          elFoto.naturalWidth >= elFoto.naturalHeight ? "landscape" : "portrait";
      };

      /* Galleria lightbox: solo foto annuncio (cover resta solo per la card in home) */
      const fotoLista = [];
      (annuncio.galleria || []).forEach((src) => {
        if (src && !fotoLista.includes(src)) fotoLista.push(src);
      });

      let indiceFoto = 0;
      let lightboxMode = "foto"; /* foto | planimetria */

      const aggiornaDotsAttivi = () => {
        if (!elFotoDots) return;
        elFotoDots.querySelectorAll(".immobile-foto-dot").forEach((d, i) => {
          d.classList.toggle("is-active", i === indiceFoto);
        });
      };

      const mostraFoto = (src, alt) => {
        if (!elFoto) return;
        elFoto.src = src;
        elFoto.alt = alt || titoloRiga;
        if (elFoto.complete && elFoto.naturalWidth) adattaOrientamentoFoto();
        aggiornaDotsAttivi();
      };

      if (elFoto) {
        elFoto.addEventListener("load", adattaOrientamentoFoto);
      }

      /* ===== Lightbox overlay ===== */
      const lightbox = document.getElementById("immobileLightbox");
      const lightboxFoto = document.getElementById("immobileLightboxFoto");
      const lightboxChiudi = document.getElementById("immobileLightboxChiudi");
      const lightboxPrev = document.getElementById("immobileLightboxPrev");
      const lightboxNext = document.getElementById("immobileLightboxNext");

      const aggiornaLightboxFoto = () => {
        if (!lightboxFoto || !fotoLista.length) return;
        lightboxMode = "foto";
        const src = fotoLista[indiceFoto];
        lightboxFoto.src = src;
        lightboxFoto.alt = `${titoloRiga} — foto ${indiceFoto + 1}`;
        mostraFoto(src, lightboxFoto.alt);
        if (lightboxPrev) lightboxPrev.hidden = fotoLista.length <= 1;
        if (lightboxNext) lightboxNext.hidden = fotoLista.length <= 1;
      };

      const apriLightbox = (indice) => {
        if (!lightbox || !fotoLista.length) return;
        indiceFoto = ((indice % fotoLista.length) + fotoLista.length) % fotoLista.length;
        aggiornaLightboxFoto();
        lightbox.hidden = false;
        document.body.classList.add("immobile-lightbox-open");
        if (lightboxChiudi) lightboxChiudi.focus();
      };

      const apriPlanimetria = () => {
        if (!lightbox || !lightboxFoto || !annuncio.planimetria) return;
        lightboxMode = "planimetria";
        lightboxFoto.src = annuncio.planimetria;
        lightboxFoto.alt = `${titoloRiga} — planimetria`;
        if (lightboxPrev) lightboxPrev.hidden = true;
        if (lightboxNext) lightboxNext.hidden = true;
        lightbox.hidden = false;
        document.body.classList.add("immobile-lightbox-open");
        if (lightboxChiudi) lightboxChiudi.focus();
      };

      const chiudiLightbox = () => {
        if (!lightbox) return;
        lightbox.hidden = true;
        document.body.classList.remove("immobile-lightbox-open");
        lightboxMode = "foto";
        if (lightboxPrev) lightboxPrev.hidden = false;
        if (lightboxNext) lightboxNext.hidden = false;
      };

      const lightboxVai = (dir) => {
        if (lightboxMode !== "foto" || !fotoLista.length) return;
        indiceFoto = (indiceFoto + dir + fotoLista.length) % fotoLista.length;
        aggiornaLightboxFoto();
      };

      if (elFotoBox) {
        elFotoBox.addEventListener("click", (e) => {
          if (e.target.closest(".immobile-foto-dot")) return;
          apriLightbox(indiceFoto);
        });
      }

      if (lightboxChiudi) lightboxChiudi.addEventListener("click", (e) => {
        e.stopPropagation();
        chiudiLightbox();
      });

      if (lightboxPrev) lightboxPrev.addEventListener("click", (e) => {
        e.stopPropagation();
        lightboxVai(-1);
      });

      if (lightboxNext) lightboxNext.addEventListener("click", (e) => {
        e.stopPropagation();
        lightboxVai(1);
      });

      if (lightbox) {
        lightbox.addEventListener("click", (e) => {
          if (e.target === lightbox) chiudiLightbox();
        });
      }

      document.addEventListener("keydown", (e) => {
        if (!lightbox || lightbox.hidden) return;
        if (e.key === "Escape") chiudiLightbox();
        if (e.key === "ArrowLeft") lightboxVai(-1);
        if (e.key === "ArrowRight") lightboxVai(1);
      });

      /* Dot navigation sulla foto */
      if (elFotoDots) {
        elFotoDots.innerHTML = "";
        fotoLista.forEach((_, i) => {
          const dot = document.createElement("button");
          dot.type = "button";
          dot.className = "immobile-foto-dot" + (i === 0 ? " is-active" : "");
          dot.setAttribute("aria-label", `Vai alla foto ${i + 1}`);
          dot.addEventListener("click", (e) => {
            e.stopPropagation();
            indiceFoto = i;
            mostraFoto(fotoLista[i], `${titoloRiga} — foto ${i + 1}`);
          });
          elFotoDots.appendChild(dot);
        });
      }

      if (elFotoCount) {
        const n = fotoLista.length;
        elFotoCount.textContent = `${n} foto`;
      }

      if (elBtnPlanimetria) {
        if (!annuncio.planimetria) {
          elBtnPlanimetria.disabled = true;
        } else {
          elBtnPlanimetria.addEventListener("click", apriPlanimetria);
        }
      }

      if (elBtnFoto) {
        elBtnFoto.addEventListener("click", () => apriLightbox(indiceFoto));
        elBtnFoto.setAttribute(
          "aria-label",
          `Apri fotografie (${fotoLista.length})`
        );
      }

      if (elBtnVideo) {
        if (annuncio.video) {
          elBtnVideo.disabled = false;
          elBtnVideo.addEventListener("click", () => {
            window.open(annuncio.video, "_blank", "noopener,noreferrer");
          });
        } else {
          elBtnVideo.disabled = true;
        }
      }

      if (fotoLista.length) {
        mostraFoto(fotoLista[0], `${titoloRiga} — foto 1`);
      }

      /* Scheda tecnica */
      if (elScheda) {
        const siNo = (v) => (v ? "Sì" : "No");
        const righe = [
          ["Superficie", annuncio.mq != null ? `${annuncio.mq} mq` : null],
          ["Locali", annuncio.locali],
          ["Camere da letto", annuncio.camere],
          ["Bagni", annuncio.bagni],
          ["Cucina", annuncio.cucina],
          ["Piano", typeof formatPiano === "function" ? formatPiano(annuncio.piano) : annuncio.piano],
          ["Piani edificio", annuncio.pianiEdificio],
          ["Stato conservazione", annuncio.statoConservazione],
          ["Anno di costruzione", annuncio.annoCostruzione],
          ["Ascensore", annuncio.ascensore == null ? null : siNo(annuncio.ascensore)],
          ["Balconi", annuncio.balconi],
          ["Arredato", annuncio.arredato == null ? null : siNo(annuncio.arredato)],
          ["Pertinenze", annuncio.pertinenze],
          ["Riscaldamento", annuncio.riscaldamento],
          ["Classe energetica", annuncio.classeEnergetica]
        ].filter(([, val]) => val != null && val !== "");

        // Tagli toggle: Piano (mobile), Piani/Anno/Ascensore (tablet mirati), Balconi (desktop/default)
        const tagliScheda = [
          { label: "Piano", fino: "immobile-scheda-fino", extra: "immobile-scheda-extra" },
          { label: "Piani edificio", fino: "immobile-scheda-fino-piani", extra: "immobile-scheda-extra-piani" },
          { label: "Anno di costruzione", fino: "immobile-scheda-fino-anno", extra: "immobile-scheda-extra-anno" },
          { label: "Ascensore", fino: "immobile-scheda-fino-ascensore", extra: "immobile-scheda-extra-ascensore" },
          { label: "Balconi", fino: "immobile-scheda-fino-desktop", extra: "immobile-scheda-extra-desktop" }
        ];
        const indiciTaglio = tagliScheda.map((t) => ({
          ...t,
          idx: righe.findIndex(([label]) => label === t.label)
        }));

        elScheda.innerHTML = righe
          .map(([label, val], i) => {
            const classi = [];
            indiciTaglio.forEach((t) => {
              if (label === t.label) classi.push(t.fino);
              if (t.idx >= 0 && i > t.idx) classi.push(t.extra);
            });
            const cls = classi.length ? ` class="${classi.join(" ")}"` : "";
            return `<div${cls}><dt>${label}</dt><dd>${val}</dd></div>`;
          })
          .join("");

        const elSchedaToggle = document.getElementById("immobileSchedaToggle");
        const elSchedaBox = elScheda.closest(".immobile-scheda");
        const haExtra = indiciTaglio.some((t) => t.idx >= 0 && t.idx < righe.length - 1);

        /* Solo i modelli elencati: imposta data-scheda-taglio (override del default) */
        const applicaTaglioSchedaDevice = () => {
          if (!elSchedaBox) return;
          const w = window.innerWidth;
          const h = window.innerHeight;
          const sw = window.screen.width || w;
          const sh = window.screen.height || h;
          const ua = navigator.userAgent || "";
          const near = (a, b, tol = 12) => Math.abs(a - b) <= tol;
          const pairMatch = (a, b, x, y) =>
            (near(a, x) && near(b, y)) || (near(a, y) && near(b, x));

          let taglio = null;
          const landscape = w > h;

          if (landscape) {
            /* Misure reali landscape segnalate — solo questi 4, tol. stretta */
            if (near(w, 1000, 8)) taglio = "piani"; /* Tab A7 */
            else if (near(w, 1116, 8)) taglio = "anno"; /* Tab A9 */
            else if (near(w, 933, 8)) taglio = "piano"; /* OnePlus Pad */
            else if (near(w, 960, 8)) taglio = "piano"; /* Lenovo Tab M10 */

            /* Prova inner e screen (Chrome DevTools a volte diverge) */
            const pairs = [
              [w, h],
              [sw, sh]
            ];

            for (const [pw, ph] of pairs) {
              if (taglio) break;
              const shortS = Math.min(pw, ph);
              const longS = Math.max(pw, ph);

              /* Nest Hub 1024×600 */
              if (pairMatch(pw, ph, 1024, 600)) {
                taglio = "piani";
                break;
              }
              /* iPad mini 1133×744 o 1024×768 */
              if (pairMatch(pw, ph, 1133, 744) || pairMatch(pw, ph, 1024, 768)) {
                taglio = "piani";
                break;
              }
              /* Tab S4 1138×712 */
              if (pairMatch(pw, ph, 1138, 712)) {
                taglio = "anno";
                break;
              }
              /* Tab S10 FE ~1152×720 */
              if (pairMatch(pw, ph, 1152, 720)) {
                taglio = "anno";
                break;
              }
              /* iPad Air 11" 1180×820 */
              if (pairMatch(pw, ph, 1180, 820)) {
                taglio = "ascensore";
                break;
              }
              /* iPad Pro 11" 1194×834 / 1210×834 */
              if (pairMatch(pw, ph, 1194, 834) || pairMatch(pw, ph, 1210, 834)) {
                taglio = "balconi";
                break;
              }
              /* Tab A9 1340×800 (anche 1332 / 1340) */
              if (
                pairMatch(pw, ph, 1340, 800) ||
                pairMatch(pw, ph, 1332, 800) ||
                pairMatch(pw, ph, 1340, 800)
              ) {
                taglio = "anno";
                break;
              }
              /* OnePlus Pad: CSS tipico 1120×800 (800×1120 portrait) */
              if (
                pairMatch(pw, ph, 1120, 800) ||
                pairMatch(pw, ph, 1067, 762) ||
                pairMatch(pw, ph, 1112, 800) ||
                (/OnePlus|OPD\d/i.test(ua) && shortS >= 750 && shortS <= 850 && longS >= 1050 && longS <= 1200)
              ) {
                taglio = "piano";
                break;
              }
              /* Tablet landscape larghezza 1280px: dopo Balconi */
              if (near(pw, 1280) || (near(longS, 1280) && near(shortS, 800))) {
                taglio = "balconi";
                break;
              }
              /* iPad Pro 12.9" / 13" 1366×1024 o 1376×1032 */
              if (
                pairMatch(pw, ph, 1366, 1024) ||
                pairMatch(pw, ph, 1376, 1032) ||
                pairMatch(pw, ph, 1366, 1024)
              ) {
                taglio = /iPad Air|Air\//i.test(ua) ? "ascensore" : "balconi";
                break;
              }
            }

            /* Fallback UA-only per OnePlus / iPad Pro se le misure non matchano */
            if (!taglio) {
              if (/OnePlus|OPD\d/i.test(ua)) taglio = "piano";
              else if (/iPad Pro/i.test(ua)) taglio = "balconi";
            }
          }

          if (taglio) {
            elSchedaBox.setAttribute("data-scheda-taglio", taglio);
          } else {
            elSchedaBox.removeAttribute("data-scheda-taglio");
          }
        };

        applicaTaglioSchedaDevice();
        window.addEventListener("resize", applicaTaglioSchedaDevice);
        if (navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
          navigator.userAgentData
            .getHighEntropyValues(["model"])
            .then((info) => {
              const model = (info && info.model) || "";
              if (!elSchedaBox || !model) return;
              const iw = window.innerWidth;
              /* Non sovrascrivere le 4 larghezze mirate né i 1280px */
              if (
                Math.abs(iw - 1280) <= 12 ||
                Math.abs(iw - 1000) <= 8 ||
                Math.abs(iw - 1116) <= 8 ||
                Math.abs(iw - 933) <= 8 ||
                Math.abs(iw - 960) <= 8
              ) {
                return;
              }
              const m = model.toLowerCase();
              if (/oneplus|opd/.test(m)) elSchedaBox.setAttribute("data-scheda-taglio", "piano");
              else if (/tab a9|sm-x11/.test(m)) elSchedaBox.setAttribute("data-scheda-taglio", "anno");
              else if (/ipad pro/.test(m)) elSchedaBox.setAttribute("data-scheda-taglio", "balconi");
            })
            .catch(() => {});
        }
        if (elSchedaToggle && elSchedaBox) {
          const elToggleLabel = elSchedaToggle.querySelector(".immobile-scheda-toggle-label");
          elSchedaBox.classList.remove("is-scheda-aperta");
          if (haExtra) {
            elSchedaToggle.hidden = false;
            elSchedaToggle.setAttribute("aria-expanded", "false");
            if (elToggleLabel) elToggleLabel.textContent = "Mostra di più";
            elSchedaToggle.onclick = () => {
              const aperta = elSchedaBox.classList.toggle("is-scheda-aperta");
              elSchedaToggle.setAttribute("aria-expanded", aperta ? "true" : "false");
              if (elToggleLabel) elToggleLabel.textContent = aperta ? "Mostra di meno" : "Mostra di più";
            };
          } else {
            elSchedaToggle.hidden = true;
            elSchedaToggle.onclick = null;
          }
        }
      }
    }
  }
});
