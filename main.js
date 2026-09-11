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
    const cta = href
      ? `<a href="${href}" class="card-annuncio-cta">Scopri &gt;</a>`
      : `<span class="card-annuncio-cta">Scopri &gt;</span>`;

    article.innerHTML = `
      <div class="card-annuncio-media">
        <img src="${annuncio.cover}" alt="${titolo} a ${annuncio.comune}" width="600" height="400" loading="lazy">
      </div>
      <div class="card-annuncio-body">
        <p class="card-annuncio-tipo">${titolo}</p>
        <div class="card-annuncio-riga">
          <p class="card-annuncio-comune">${annuncio.comune}</p>
          <p class="card-annuncio-prezzo">${prezzo}</p>
        </div>
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
      const elThumbs = document.getElementById("immobileThumbs");
      const elThumbsPrev = document.getElementById("immobileThumbsPrev");
      const elThumbsNext = document.getElementById("immobileThumbsNext");
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

      /* Galleria: cover + foto (senza duplicati) */
      const fotoLista = [];
      if (annuncio.cover) fotoLista.push(annuncio.cover);
      (annuncio.galleria || []).forEach((src) => {
        if (src && !fotoLista.includes(src)) fotoLista.push(src);
      });

      let indiceFoto = 0;

      const aggiornaThumbsAttive = () => {
        if (!elThumbs) return;
        elThumbs.querySelectorAll(".immobile-thumb").forEach((t, i) => {
          t.classList.toggle("is-active", i === indiceFoto);
        });
      };

      const mostraFoto = (src, alt) => {
        if (!elFoto) return;
        elFoto.src = src;
        elFoto.alt = alt || titoloRiga;
        if (elFoto.complete && elFoto.naturalWidth) adattaOrientamentoFoto();
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
        const src = fotoLista[indiceFoto];
        lightboxFoto.src = src;
        lightboxFoto.alt = `${titoloRiga} — foto ${indiceFoto + 1}`;
        mostraFoto(src, lightboxFoto.alt);
        aggiornaThumbsAttive();
      };

      const apriLightbox = (indice) => {
        if (!lightbox || !fotoLista.length) return;
        indiceFoto = ((indice % fotoLista.length) + fotoLista.length) % fotoLista.length;
        aggiornaLightboxFoto();
        lightbox.hidden = false;
        document.body.classList.add("immobile-lightbox-open");
        if (lightboxChiudi) lightboxChiudi.focus();
      };

      const chiudiLightbox = () => {
        if (!lightbox) return;
        lightbox.hidden = true;
        document.body.classList.remove("immobile-lightbox-open");
      };

      const lightboxVai = (dir) => {
        if (!fotoLista.length) return;
        indiceFoto = (indiceFoto + dir + fotoLista.length) % fotoLista.length;
        aggiornaLightboxFoto();
      };

      if (elFotoBox) {
        elFotoBox.addEventListener("click", () => apriLightbox(indiceFoto));
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

      if (fotoLista.length) {
        mostraFoto(fotoLista[0], `${titoloRiga} — foto 1`);
      }

      if (elThumbs) {
        elThumbs.innerHTML = "";
        fotoLista.forEach((src, i) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "immobile-thumb" + (i === 0 ? " is-active" : "");
          btn.setAttribute("aria-label", `Foto ${i + 1}`);
          btn.innerHTML = `<img src="${src}" alt="" width="100" height="72" loading="lazy">`;
          btn.addEventListener("click", () => {
            indiceFoto = i;
            mostraFoto(src, `${titoloRiga} — foto ${i + 1}`);
            aggiornaThumbsAttive();
            apriLightbox(i);
          });
          elThumbs.appendChild(btn);
        });
      }

      /* Frecce carosello miniature (niente scrollbar visibile) */
      const scorreThumbs = (dir) => {
        if (!elThumbs) return;
        const passo = Math.max(160, Math.floor(elThumbs.clientWidth * 0.7));
        elThumbs.scrollBy({ left: dir * passo, behavior: "smooth" });
      };
      if (elThumbsPrev) elThumbsPrev.addEventListener("click", () => scorreThumbs(-1));
      if (elThumbsNext) elThumbsNext.addEventListener("click", () => scorreThumbs(1));

      /* Scheda tecnica */
      if (elScheda) {
        const siNo = (v) => (v ? "Sì" : "No");
        const righe = [
          ["Tipologia", annuncio.tipologia],
          ["Contratto", annuncio.contratto],
          ["Indirizzo", annuncio.via],
          ["Comune", annuncio.comune],
          ["Superficie", annuncio.mq != null ? `${annuncio.mq} mq` : null],
          ["Locali", annuncio.locali],
          ["Camere da letto", annuncio.camere],
          ["Bagni", annuncio.bagni],
          ["Cucina", annuncio.cucina],
          ["Piano", typeof formatPiano === "function" ? formatPiano(annuncio.piano) : annuncio.piano],
          ["Piani edificio", annuncio.pianiEdificio],
          ["Ascensore", annuncio.ascensore == null ? null : siNo(annuncio.ascensore)],
          ["Balconi", annuncio.balconi],
          ["Arredato", annuncio.arredato == null ? null : siNo(annuncio.arredato)],
          ["Pertinenze", annuncio.pertinenze],
          ["Riscaldamento", annuncio.riscaldamento],
          ["Classe energetica", annuncio.classeEnergetica]
        ].filter(([, val]) => val != null && val !== "");

        elScheda.innerHTML = righe
          .map(
            ([label, val]) =>
              `<div><dt>${label}</dt><dd>${val}</dd></div>`
          )
          .join("");
      }
    }
  }
});
