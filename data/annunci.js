/* ============================================
   FURIA IMMOBILIARE — DATI ANNUNCI
   ============================================ */

/* true = mostra 3 card "Prossimamente" + Cinquegrana (demo per titolare)
   false = solo immobili reali pubblicati (go-live) */
const MOSTRA_CARD_DEMO = false;

const annunci = {
  vendita: [
    {
      id: "sparanise-cinquegrana-via-kennedy",
      collegabile: true,
      placeholder: false,
      nome: "Cinquegrana",
      tipologia: "Appartamento",
      contratto: "Vendita",
      via: "Via A. B. Nobel n.1",
      /* Ingresso su Via Nobel; immobile d’angolo anche con Via Kennedy */
      angoloCon: "Via Kennedy",
      categoriaAnnuncio: "",
      comune: "Sparanise (CE)",
      /* Scheda tecnica: sostituiscono Tipologia / Contratto */
      statoConservazione: "Abitabile",
      annoCostruzione: 1968,
      prezzo: 75000,
      mq: 105,
      locali: 4,
      camere: 1,
      bagni: 1,
      piano: 1,
      pianiEdificio: 2,
      ascensore: false,
      cucina: "Abitabile",
      balconi: 1,
      arredato: false,
      pertinenze: "Cantina",
      riscaldamento: "Autonomo",
      classeEnergetica: "C",
      descrizione:
        "Vendesi in Sparanise alla via Kennedy appartamento con doppia esposizione, sita al piano primo di 105 mq calpestabili. Composto da ampio ingresso, salone doppio, cucina, due camere da letto, bagno con antibagno, balcone e cantina. Infissi sostituiti recentemente. Ingresso su Via A. B. Nobel n.1; immobile d’angolo anche con Via Kennedy.",
      cover: "assets/images/annunci/vendita/sparanise-cinquegrana-via-kennedy/cover-cinquegrana-sparanise.webp",
      planimetria:
        "assets/images/annunci/vendita/sparanise-cinquegrana-via-kennedy/TAVOLE-CILAS-assia2-Modelpage-0001.webp",
      galleria: [
        "assets/images/annunci/vendita/sparanise-cinquegrana-via-kennedy/foto-01.webp",
        "assets/images/annunci/vendita/sparanise-cinquegrana-via-kennedy/foto-02.webp",
        "assets/images/annunci/vendita/sparanise-cinquegrana-via-kennedy/foto-03.webp",
        "assets/images/annunci/vendita/sparanise-cinquegrana-via-kennedy/foto-04.webp",
        "assets/images/annunci/vendita/sparanise-cinquegrana-via-kennedy/foto-05.webp",
        "assets/images/annunci/vendita/sparanise-cinquegrana-via-kennedy/foto-06.webp",
        "assets/images/annunci/vendita/sparanise-cinquegrana-via-kennedy/foto-07.webp",
        "assets/images/annunci/vendita/sparanise-cinquegrana-via-kennedy/foto-08.webp",
        "assets/images/annunci/vendita/sparanise-cinquegrana-via-kennedy/foto-09.webp",
        "assets/images/annunci/vendita/sparanise-cinquegrana-via-kennedy/foto-10.webp"
      ]
    },
    /* Locale commerciale Di Maio — Via De Renzis, Sparanise */
    {
      id: "locale-commerciale-di-maio-sparanise",
      collegabile: true,
      placeholder: false,
      nome: "Di Maio",
      tipologia: "Locale comm.",
      contratto: "Vendita",
      via: "Via De Renzis n.52",
      angoloCon: "",
      categoriaAnnuncio: "",
      comune: "Sparanise (CE)",
      statoConservazione: "",
      annoCostruzione: null,
      prezzo: 80000,
      mq: 87,
      locali: 2,
      camere: null,
      bagni: 1,
      piano: 0,
      pianiEdificio: 3,
      ascensore: null,
      cucina: "",
      balconi: null,
      arredato: null,
      pertinenze: "",
      riscaldamento: "",
      classeEnergetica: "",
      descrizione:
        "Proponiamo in vendita un'interessante locale commerciale. Posizionato in una zona strategica ad alto passaggio e con ottima visibilità, ideale sia per chi desidera avviare o espandere il proprio business, sia come investimento a reddito. Il locale ha una superficie complessiva di 87 mq ben distribuiti e funzionali. Situato nel tessuto commerciale di Sparanise, facilmente raggiungibile e con possibilità di parcheggio nelle vicinanze per la clientela. Gli spazi interni, facilmente rimodulabili, si prestano a molteplici destinazioni: negozio di vendita al dettaglio, ufficio/studio professionale, showroom, centro servizi o attività artigianale. Piano terra con accesso disabili.\nAltezza soffitti 3,95 m. | Cablato | impianto di allarme | luci d'emergenza | parzialmente arredato | canna fumaria",
      cover:
        "assets/images/annunci/vendita/locale-commerciale-di-maio-sparanise/foto-cover.webp",
      planimetria:
        "assets/images/annunci/vendita/locale-commerciale-di-maio-sparanise/planimetria.webp",
      galleria: [
        "assets/images/annunci/vendita/locale-commerciale-di-maio-sparanise/foto-01.webp",
        "assets/images/annunci/vendita/locale-commerciale-di-maio-sparanise/foto-02.webp",
        "assets/images/annunci/vendita/locale-commerciale-di-maio-sparanise/foto-03.webp",
        "assets/images/annunci/vendita/locale-commerciale-di-maio-sparanise/foto-04.webp",
        "assets/images/annunci/vendita/locale-commerciale-di-maio-sparanise/foto-05.webp",
        "assets/images/annunci/vendita/locale-commerciale-di-maio-sparanise/foto-06.webp",
        "assets/images/annunci/vendita/locale-commerciale-di-maio-sparanise/foto-07.webp",
        "assets/images/annunci/vendita/locale-commerciale-di-maio-sparanise/foto-08.webp",
        "assets/images/annunci/vendita/locale-commerciale-di-maio-sparanise/foto-09.webp",
        "assets/images/annunci/vendita/locale-commerciale-di-maio-sparanise/foto-10.webp"
      ]
    },
    /* Card demo — usate solo se MOSTRA_CARD_DEMO === true */
    {
      id: "demo-vendita-01",
      collegabile: false,
      placeholder: true,
      tipologia: "Prossimamente",
      categoriaAnnuncio: "",
      comune: "",
      prezzo: null,
      mq: null,
      camere: null,
      bagni: null,
      cover: null
    },
    {
      id: "demo-vendita-02",
      collegabile: false,
      placeholder: true,
      tipologia: "Prossimamente",
      categoriaAnnuncio: "",
      comune: "",
      prezzo: null,
      mq: null,
      camere: null,
      bagni: null,
      cover: null
    },
    {
      id: "demo-vendita-03",
      collegabile: false,
      placeholder: true,
      tipologia: "Prossimamente",
      categoriaAnnuncio: "",
      comune: "",
      prezzo: null,
      mq: null,
      camere: null,
      bagni: null,
      cover: null
    }
  ],
  affitto: []
};

/** Restituisce gli annunci vendita da mostrare in home */
function getAnnunciVenditaHome() {
  const reali = annunci.vendita.filter((a) => !a.placeholder);
  if (!MOSTRA_CARD_DEMO) return reali;
  const demo = annunci.vendita.filter((a) => a.placeholder);
  return [...reali, ...demo];
}

/** Formatta prezzo stile mockup: €. 75.000 */
function formatPrezzo(prezzo) {
  if (prezzo == null) return "";
  return `€. ${prezzo.toLocaleString("it-IT")}`;
}

/** Formatta piano: 2 → "2° piano" */
function formatPiano(piano) {
  if (piano == null) return "—";
  if (piano === 0) return "T. piano";
  return `${piano}° piano`;
}
function formatTipologia(annuncio) {
  if (annuncio.placeholder) return "Nuovo annuncio";
  if (annuncio.via) {
    return `${annuncio.tipologia} in ${annuncio.via}`;
  }
  if (annuncio.categoriaAnnuncio) {
    return `${annuncio.tipologia} - ${annuncio.categoriaAnnuncio}`;
  }
  return annuncio.tipologia;
}
