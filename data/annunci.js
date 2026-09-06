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
      via: "Via A.B. Nobel n.1",
      /* Ingresso su Via Nobel; immobile d’angolo anche con Via Kennedy */
      angoloCon: "Via Kennedy",
      categoriaAnnuncio: "",
      comune: "Sparanise (CE)",
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
        "Vendesi in Sparanise alla via Kennedy appartamento con doppia esposizione, sito al secondo piano di 105 mq calpestabili. Composto da ampio ingresso, salone doppio, cucina, due camere da letto, bagno con antibagno, balcone e cantina. Infissi sostituiti recentemente. Ingresso su Via A.B. Nobel n.1; immobile d’angolo anche con Via Kennedy.",
      cover: "assets/images/annunci/vendita/sparanise-cinquegrana-via-kennedy/cover-cinquegrana-sparanise.webp",
      planimetria:
        "assets/images/annunci/vendita/sparanise-cinquegrana-via-kennedy/TAVOLE-CILAS-assia2-Modelpage-0001.jpg",
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
