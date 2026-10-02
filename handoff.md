# Handoff — Furia Immobiliare (sito statico)

Documento per riprendere il lavoro in una **nuova finestra di contesto Cursor**.  
Data handoff: **2 ottobre 2026**.

> HEAD: `8df39bd` su `main` = `origin/main` (autore commit: **Gino Manno**).  
> Working tree tracked **pulito**. Untracked: `handoff.md`, `GARAGE.md`, `.vscode/`.

---

## 1. Cos’è il progetto

Sito statico agenzia immobiliare **Furia Immobiliare Srls** (Sparanise / Agro Caleno).

| Voce | Dettaglio |
|------|-----------|
| Path | `F:/GRAFICA LAVORI/SITIART/sito-furiaimmobiliare` |
| Stack | HTML5 + CSS3 + Vanilla JS (niente jQuery / nuove dipendenze senza chiedere) |
| Branch | `main` (allineato a `origin/main`) |
| Preview tipica | Live Server → `http://127.0.0.1:5500/index.html` |

### File principali

- `index.html` — home (hero cinematico desktop, vendi, valuta, servizi, FAQ, contatti)
- `vendita.html` — listing vendita + filtri + mappa
- `affitto.html` · `immobile.html`
- `data/annunci.js` — dati annunci
- `style.css` — design system + sezioni
- `main.js` — navbar, drawer, filtri, caroselli, scheda, lightbox, lock scroll

### Token colore (`:root`)

- Primario `#cfb53b` · Accento `#B79E2C` · Secondario `#0E2B2C`
- Testo `#E4E4DE` · muto `#9A9A92` · sfondo `#1B1B1B` · bordo `#5a5a5a`
- Font titoli **Cardo** · corpo **Poppins**
- Breakpoint tipici: **599 / 600 / 768 / 1024 / 1280** (cinematico) / **1366–1367**

---

## 2. Regole utente (obbligatorie)

- **Una sola modifica alla volta** quando possibile
- **Non toccare** codice esistente se non richiesto esplicitamente
- Commenti nel codice in **italiano**
- Prima di modifiche importanti: **ricordare il commit Git**
- Fine modifica: confermare *«Nessun altro codice è stato modificato»*
- Se la modifica è complessa: **chiedere conferma** prima
- Segnalare potenziali bug **prima** di modificare
- Commit / push / PR **solo se chiesti**
- Non introdurre dipendenze nuove senza chiedere
- Non refactorizzare senza richiesta esplicita

---

## 3. Stato Git (2 ott 2026)

**HEAD:** `8df39bd` — *Raffina navbar, filtri vendita responsive e blocco scroll overlay.*  
(1 ott 2026 ~22:38; hash riscritto solo per cambio autore, contenuto = ex `650fa39`)

### Incluso in quel commit (stabile)

- Navbar desktop: hover pill oro, dropdown fade-down; touch landscape resta click
- Filtri vendita: layout 2 righe tablet/iPad portrait + phone landscape ≥600; Tipologia label piena; cerca a dx di Filtri in portrait stretto
- Drawer hamburger = bg navbar; Compra `is-active` senza oro/bold eccessivo
- Lock scroll overlay (drawer/filtri/lightbox) con counter, senza sblocco anticipato

### Cosa è successo il 2 ott (e cosa NON riprendere)

- Prove hero cinematico (vapore canvas, Gradual Spacing, MorphingText, fly-in): **esperimento fallito**
- Repo ripristinato con `git reset --hard` all’ultimo commit stabile → **niente di quelle prove è in tree**
- **Non** reintrodurre quegli effetti salvo richiesta **nuova ed esplicita**

### Untracked

- `handoff.md` · `GARAGE.md` · `.vscode/`

---

## 4. Identità Git / GitHub (breve — sì, documentare)

**Perché è in handoff:** evita di rimescolare nomi e ricorda il lavoro sospeso su un altro repo.

| Voce | Stato |
|------|--------|
| Config Git globale PC | `user.name=Gino Manno` · `user.email=ginomanno78@gmail.com` |
| Account GitHub | `ginomanno78-dotcom` |
| `sito-furiaimmobiliare` | Autori commit su GitHub → **Gino Manno** |
| `sito-antoniomanno-next` | **Gino Manno** |
| `sito-antoniomanno` | **Gino Manno** (+ alcuni commit già `ginomanno78-dotcom`) — **Nello Verrengia rimosso** |
| `sito-gmstudiolab` | Ancora **Nello Verrengia** — **sospeso**; al ripresa lavoro: prima cosa = riscrivere autori → Gino Manno + email |
| `sito-cover` | **Eliminato** da GitHub (2 ott) |

Nota: il nome “Nello Verrengia” non veniva da cover “appiccicato” agli altri repo: era `user.name` globale Git usato nei commit. Cover eliminata per progetto abbandonato, non come fix del nome.

---

## 5. Hero cinematico (stato codice attuale)

- Intro prima visita: **assente** (non reintrodurre)
- Cinematico solo `@media (min-width: 1280px) and (orientation: landscape)`, 1× per sessione (`sessionStorage`)
- Markup tipico: `hero-bg--esterno/interno`, overlay, brand finale, UI search
- Sotto 1280 / portrait: solo immagine riposo

---

## 6. Annunci go-live (riferimento)

`MOSTRA_CARD_DEMO = false` in `data/annunci.js`. Annunci pubblicati tipici: Cinquegrana, Di Maio, Palazzo SMCV, Francolise. Verificare file per elenco aggiornato.

---

## 7. Decisioni — cosa NON rifare

| Tema | Nota |
|------|------|
| Effetti testo cinematico 2 ott (vapour / gradual / morph / fly-in) | Scartati; ripartire da commit stabile |
| Intro overlay | Non reintrodurre |
| Dipendenze React/Framer | Vietate salvo richiesta esplicita |
| Force push / riscrittura storia | Solo se chiesti; `gmstudiolab` in sospeso |

---

## 8. Possibili bug / attenzioni

1. Cache Live Server / hard refresh
2. Cinematico: per rivederlo `sessionStorage` key hero (se presente nel JS attuale)
3. Filtri vendita: verificare tablet portrait + phone landscape SE/S8+
4. Lock scroll: counter `is-scroll-locked` — non sbloccare a mano a metà animazione drawer

---

## 9. Cosa fare dopo (suggerito)

1. Continuare polish Furia **solo a richiesta** (una modifica alla volta)
2. Quando si riprende **gmstudiolab**: prima cosa = autori commit → Gino Manno
3. Eventuale commit di `handoff.md` se si vuole in repo

---

## 10. Prompt rapido per il nuovo agente

```
Continua il sito Furia Immobiliare in F:/GRAFICA LAVORI/SITIART/sito-furiaimmobiliare.
Leggi handoff.md (2 ott 2026). Regole: una modifica alla volta, commenti IT,
niente commit/push se non chiesti, conferma “Nessun altro codice è stato modificato”.
HEAD: 8df39bd su main (= origin), autore Gino Manno.
Le prove cinematico del 2 ott sono state scartate (reset al commit stabile 1 ott).
Non reintrodurre vapour/gradual/morph/fly-in senza richiesta nuova.
Navbar/filtri/scroll-lock del commit 1 ott sono lo stato buono.
Identità Git: Gino Manno / ginomanno78@gmail.com. gmstudiolab ancora con Nello — sospeso.
```

---

*Fine handoff. Aggiornare o eliminare dopo il trasferimento se non serve più in repo.*
