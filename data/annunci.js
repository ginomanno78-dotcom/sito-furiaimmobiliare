/* ============================================
   FURIA IMMOBILIARE — DATI ANNUNCI
   ============================================ */

/* true = mostra 3 card "Prossimamente" + Cinquegrana (demo per titolare)
   false = solo immobili reali pubblicati (go-live) */
const MOSTRA_CARD_DEMO = false;

/** Servizi limitrofi (icone + testi); km e dettagli specifici per zona */
function creaDintorni(opzioni = {}) {
  const km = opzioni.km != null ? opzioni.km : 2;
  const entro = `entro ${km} km.`;
  return {
    dintorniNota: `Servizi raggiungibili in pochi minuti (entro circa ${km} km).`,
    dintorni: [
      {
        voce: "Stazione ferroviaria",
        dettaglio: opzioni.stazione || entro,
        icona: "assets/images/icons/icon-Train.svg"
      },
      {
        voce: "Supermercati",
        dettaglio: opzioni.supermercati || entro,
        icona: "assets/images/icons/icon-Shopping-Cart-Full.svg"
      },
      {
        voce: "Scuole",
        dettaglio: opzioni.scuole || entro,
        icona: "assets/images/icons/icon-School.svg"
      },
      {
        voce: "Banca",
        dettaglio: opzioni.banca || entro,
        icona: "assets/images/icons/icon-Bank.svg"
      },
      {
        voce: opzioni.medicoVoce || "Servizio medico e farmacie",
        dettaglio: opzioni.medico || entro,
        icona: opzioni.medicoIcona || "assets/images/icons/icon-Medical.svg"
      },
      {
        voce: "Ufficio postale",
        dettaglio: opzioni.postale || entro,
        icona: "assets/images/icons/icon-Post-Office.svg"
      }
    ]
  };
}

const DINTORNI_SPARANISE_1KM = creaDintorni({
  km: 1,
  stazione: "Staz. di Sparanise entro 1 km.",
  supermercati: "Briò, Decò entro 1 km.",
  scuole: "Primaria, I - II Grado entro 1 km.",
  banca: "Intesa San Paolo entro 1 km."
});

const DINTORNI_SANTA_MARIA_1KM = creaDintorni({
  km: 1,
  stazione: "Staz. di Santa M. C. V. entro 1 km.",
  supermercati: "MD, Coop, Decò entro 1 km.",
  scuole: "Università entro 1 km.",
  banca: "BCA, Intesa, BNL entro 1 km.",
  medicoVoce: "Ospedale Melorio",
  medicoIcona: "assets/images/icons/icon-Hospital.svg"
});

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
      /* Coordinate mappa (Leaflet) — Via A. B. Nobel 1, Sparanise */
      lat: 41.188602,
      lng: 14.092139,
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
      cover: "assets/images/annunci/vendita/sparanise-cinquegrana-via-kennedy/foto-cover.webp",
      /* Foto al passaggio mouse (solo desktop) */
      coverHover:
        "assets/images/annunci/vendita/sparanise-cinquegrana-via-kennedy/foto-05.webp",
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
      ],
      ...DINTORNI_SPARANISE_1KM
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
      /* Via De Renzis 52, Sparanise */
      lat: 41.19003,
      lng: 14.093031,
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
      /* Foto al passaggio mouse (solo desktop) */
      coverHover:
        "assets/images/annunci/vendita/locale-commerciale-di-maio-sparanise/foto-05.webp",
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
      ],
      ...DINTORNI_SPARANISE_1KM
    },
    /* Palazzo signorile — Santa Maria Capua Vetere, Via Gramsci */
    {
      id: "palazzo-signorile-santa-maria",
      collegabile: true,
      placeholder: false,
      nome: "Palazzo signorile",
      tipologia: "Palazzo",
      contratto: "Vendita",
      via: "Via Antonio Gramsci n.75",
      /* Card mobile/tablet: via abbreviata */
      viaBreve: "Via A. Gramsci n.75",
      angoloCon: "",
      categoriaAnnuncio: "",
      comune: "Santa Maria Capua Vetere (CE)",
      /* Solo card home: comune abbreviato */
      comuneCard: "Santa Maria C. V. (CE)",
      /* Via Antonio Gramsci 75, Santa Maria C. V. */
      lat: 41.078225,
      lng: 14.254053,
      statoConservazione: "Da ristrutturare",
      annoCostruzione: null,
      prezzo: 680000,
      mq: 953,
      locali: 5,
      /* Specs pagina immobile: etichetta locali */
      localiEtichetta: "5+",
      camere: null,
      bagni: 3,
      piano: "T / R / 1 / 2",
      pianiEdificio: 4,
      ascensore: null,
      cucina: "",
      balconi: 18,
      arredato: null,
      pertinenze: "Giardino, 3 depositi",
      riscaldamento: "",
      classeEnergetica: "",
      descrizione:
        "Intero stabile signorile in centro storico.\nStraordinaria opportunità di investimento nel pieno centro storico di Santa Maria Capua Vetere, cittadina d'arte ricca di storia e fascino romano. Proponiamo in vendita un intero stabile cielo-terra d'epoca, posizionato in un angolo ad altissima visibilità e affacciato su una suggestiva piazza pavimentata in pietra lavica. Perfetto per investitori, imprese edili o per la realizzazione di una prestigiosa struttura ricettiva/residenziale.\nL'edificio, che si sviluppa su più livelli, conserva tutto il fascino dell'architettura tradizionale con la sua facciata storicizzata, ampie finestre e balconi con ringhiere in ferro battuto che si affacciano direttamente sulla via principale.\nIl piano terra ospita ampie aperture fronte strada, ideali per negozi, botteghe o servizi di ristorazione. I piani superiori offrono una generosa metratura frazionabile in più appartamenti indipendenti, tutti dotati di affacci esterni e ottima luminosità naturale.\nLa vicinanza a zone di interesse storico e l'ampia metratura lo rendono ideale per la conversione in un B&B di charme o in un boutique hotel.\nOttima opportunità per imprese di costruzione mirata alla realizzazione di appartamenti residenziali indipendenti ad alta redditività.\nPerfetto per chi desidera una dimora storica indipendente e di ampie dimensioni nel cuore della città.\nL'immobile necessita di interventi di ristrutturazione interna ed esterna, offrendo la massima flessibilità nella ridistribuzione degli spazi e nella scelta delle finiture.\nBalconi 18 | esposizione doppia | infissi esterni vetro/metallo",
      cover:
        "assets/images/annunci/vendita/palazzo-signorile-santa-maria/foto-cover.webp",
      planimetria:
        "assets/images/annunci/vendita/palazzo-signorile-santa-maria/planimetria-piano-terra.webp",
      planimetrie: [
        "assets/images/annunci/vendita/palazzo-signorile-santa-maria/planimetria-piano-terra.webp",
        "assets/images/annunci/vendita/palazzo-signorile-santa-maria/planimetria-ammezzato.webp",
        "assets/images/annunci/vendita/palazzo-signorile-santa-maria/planimetria-primo-piano.webp",
        "assets/images/annunci/vendita/palazzo-signorile-santa-maria/planimetria-secondo-piano.webp"
      ],
      galleria: [
        "assets/images/annunci/vendita/palazzo-signorile-santa-maria/foto-01.webp",
        "assets/images/annunci/vendita/palazzo-signorile-santa-maria/foto-02.webp",
        "assets/images/annunci/vendita/palazzo-signorile-santa-maria/foto-03.webp",
        "assets/images/annunci/vendita/palazzo-signorile-santa-maria/foto-04.webp",
        "assets/images/annunci/vendita/palazzo-signorile-santa-maria/foto-05.webp",
        "assets/images/annunci/vendita/palazzo-signorile-santa-maria/foto-06.webp",
        "assets/images/annunci/vendita/palazzo-signorile-santa-maria/foto-07.webp",
        "assets/images/annunci/vendita/palazzo-signorile-santa-maria/foto-08.webp",
        "assets/images/annunci/vendita/palazzo-signorile-santa-maria/foto-09.webp",
        "assets/images/annunci/vendita/palazzo-signorile-santa-maria/foto-10.webp",
        "assets/images/annunci/vendita/palazzo-signorile-santa-maria/foto-11.webp"
      ],
      /* Box dettaglio superfici (dopo descrizione, prima della mappa) */
      unita: [
        {
          titolo: "Locale commerciale",
          piano: "Piano terra",
          superficie: "204,0 m²",
          coefficiente: "100%",
          tipoSuperficie: "Principale",
          superficieCommerciale: "204,0 m²",
          icona: "assets/images/icons/icon-Shop-Market.svg"
        },
        {
          titolo: "Appartamento A",
          piano: "Ammezzato",
          superficie: "106,9 m²",
          coefficiente: "100%",
          tipoSuperficie: "Principale",
          superficieCommerciale: "106,9 m²",
          icona: "assets/images/icons/icon-planimetria.svg"
        },
        {
          titolo: "Appartamento B",
          piano: "1",
          superficie: "163,4 m²",
          coefficiente: "100%",
          tipoSuperficie: "Principale",
          superficieCommerciale: "163,4 m²",
          icona: "assets/images/icons/icon-planimetria.svg"
        },
        {
          titolo: "Appartamento C",
          piano: "1",
          superficie: "131,4 m²",
          coefficiente: "100%",
          tipoSuperficie: "Principale",
          superficieCommerciale: "131,4 m²",
          icona: "assets/images/icons/icon-planimetria.svg"
        },
        {
          titolo: "Appartamento D",
          piano: "2",
          superficie: "61,5 m²",
          coefficiente: "100%",
          tipoSuperficie: "Principale",
          superficieCommerciale: "61,5 m²",
          icona: "assets/images/icons/icon-planimetria.svg"
        },
        {
          titolo: "Appartamento E",
          piano: "2",
          superficie: "232,9 m²",
          coefficiente: "100%",
          tipoSuperficie: "Principale",
          superficieCommerciale: "232,9 m²",
          icona: "assets/images/icons/icon-planimetria.svg"
        },
        {
          titolo: "Giardino",
          piano: "Piano terra",
          superficie: "20,5 m²",
          coefficiente: "10%",
          tipoSuperficie: "Principale",
          superficieCommerciale: "2,1 m²",
          icona: "assets/images/icons/icon-Vaso-Planta.svg"
        },
        {
          titolo: "Magazzino — Dep. 1",
          piano: "Piano terra",
          superficie: "14,8 m²",
          coefficiente: "100%",
          tipoSuperficie: "Principale",
          superficieCommerciale: "14,8 m²",
          icona: "assets/images/icons/icon-Magazino.svg"
        },
        {
          titolo: "Magazzino — Dep. 2",
          piano: "Piano terra",
          superficie: "22,7 m²",
          coefficiente: "100%",
          tipoSuperficie: "Principale",
          superficieCommerciale: "22,7 m²",
          icona: "assets/images/icons/icon-Magazino.svg"
        },
        {
          titolo: "Magazzino — Dep. 3",
          piano: "Piano terra",
          superficie: "13,2 m²",
          coefficiente: "100%",
          tipoSuperficie: "Principale",
          superficieCommerciale: "13,2 m²",
          icona: "assets/images/icons/icon-Magazino.svg"
        }
      ],
      ...DINTORNI_SANTA_MARIA_1KM
    },
    /* Palazzo — Francolise, SS7 km 187 */
    {
      id: "palazzo-via-appia-francolise",
      collegabile: true,
      placeholder: false,
      nome: "Francolise",
      tipologia: "Palazzo",
      contratto: "Vendita",
      via: "Strada provinciale SS7, 21",
      /* Query mappa con indirizzo esatto */
      mapsQuery: "SS7, 21, Francolise (CE)",
      /* Pin esatto SS7, 21 Francolise (allineato a Google Maps) */
      lat: 41.176872,
      lng: 14.094442,
      angoloCon: "",
      categoriaAnnuncio: "",
      comune: "Francolise (CE)",
      statoConservazione: "Da ristrutturare",
      annoCostruzione: 1950,
      prezzo: 280000,
      mq: 638,
      locali: "5+",
      camere: null,
      bagni: 3,
      piano: "Su 2 piani",
      pianiEdificio: 2,
      ascensore: false,
      cucina: "",
      balconi: 1,
      arredato: null,
      boxAuto: "4 posti auto",
      pertinenze: "Terrazzo, terreno",
      riscaldamento: "",
      classeEnergetica: "G",
      descrizione:
        "Lungo la storica e strategica Via Appia a Sparanise, proponiamo in vendita un'esclusiva intera proprietà indipendente dalle straordinarie potenzialità commerciali e residenziali. L’immobile, libero su quattro lati, unisce la comodità di un'ampia abitazione privata alla redditività di un locale commerciale al piano terra, il tutto arricchito da un generoso spazio esterno. Completa la proprietà un immenso valore aggiunto: un terreno edificabile retrostante di ben 1.607 mq, perfetto per futuri ampliamenti strutturali, parcheggi o per la creazione di un'oasi relax.\n\n• Piano Terra (Locale Commerciale): Ampio locale commerciale con eccellente visibilità fronte strada sulla Via Appia, dotato di vetrine e accessi diretti. Uno spazio versatile, perfetto per accogliere un'attività di ristorazione, una reception, una sala colazioni o un negozio al dettaglio.\n\n• Primo Piano (Abitazione): Luminoso appartamento residenziale di generosa metratura, ideale come abitazione principale del proprietario/gestore o riconfigurabile in diverse camere indipendenti con bagno privato per gli ospiti.\n\n• Spazio Esterno & Giardino: Grande cortile interno che garantisce privacy e riservatezza, impreziosito da un patio ideale per allestire zone lounge o aree colazione all'aperto. Il cortile è circondato da un giardino\n\n• Terreno Edificabile: Terreno pianeggiante di 1.607 mq incluso nella proprietà. Rappresenta una vera rarità sul mercato, offrendo la possibilità di edificare ulteriori volumetrie (es. dependance, centro benessere) o di realizzare una piscina con solarium e un ampio parcheggio privato per i clienti.",
      cover:
        "assets/images/annunci/vendita/palazzo-via-appia-francolise/foto-cover.webp",
      coverHover:
        "assets/images/annunci/vendita/palazzo-via-appia-francolise/foto-03.webp",
      planimetria:
        "assets/images/annunci/vendita/palazzo-via-appia-francolise/planimetria1.webp",
      planimetrie: [
        "assets/images/annunci/vendita/palazzo-via-appia-francolise/planimetria1.webp",
        "assets/images/annunci/vendita/palazzo-via-appia-francolise/planimetria2.webp"
      ],
      galleria: [
        "assets/images/annunci/vendita/palazzo-via-appia-francolise/foto-01.webp",
        "assets/images/annunci/vendita/palazzo-via-appia-francolise/foto-02.webp",
        "assets/images/annunci/vendita/palazzo-via-appia-francolise/foto-03.webp",
        "assets/images/annunci/vendita/palazzo-via-appia-francolise/foto-04.webp",
        "assets/images/annunci/vendita/palazzo-via-appia-francolise/foto-05.webp",
        "assets/images/annunci/vendita/palazzo-via-appia-francolise/foto-06.webp",
        "assets/images/annunci/vendita/palazzo-via-appia-francolise/foto-07.webp",
        "assets/images/annunci/vendita/palazzo-via-appia-francolise/foto-08.webp",
        "assets/images/annunci/vendita/palazzo-via-appia-francolise/foto-09.webp",
        "assets/images/annunci/vendita/palazzo-via-appia-francolise/foto-10.webp",
        "assets/images/annunci/vendita/palazzo-via-appia-francolise/foto-11.webp",
        "assets/images/annunci/vendita/palazzo-via-appia-francolise/foto-12.webp",
        "assets/images/annunci/vendita/palazzo-via-appia-francolise/foto-13.webp",
        "assets/images/annunci/vendita/palazzo-via-appia-francolise/foto-14.webp",
        "assets/images/annunci/vendita/palazzo-via-appia-francolise/foto-15.webp",
        "assets/images/annunci/vendita/palazzo-via-appia-francolise/foto-16.webp",
        "assets/images/annunci/vendita/palazzo-via-appia-francolise/foto-17.webp",
        "assets/images/annunci/vendita/palazzo-via-appia-francolise/foto-18.webp"
      ],
      /* Dettaglio superfici (come Palazzo Santa Maria) */
      unita: [
        {
          titolo: "Appartamento",
          piano: "1",
          superficie: "218,0 m²",
          coefficiente: "100%",
          tipoSuperficie: "Principale",
          superficieCommerciale: "218,0 m²",
          icona: "assets/images/icons/icon-planimetria.svg"
        },
        {
          titolo: "Locale commerciale",
          piano: "Piano terra",
          superficie: "57,0 m²",
          coefficiente: "100%",
          tipoSuperficie: "Principale",
          superficieCommerciale: "57,0 m²",
          icona: "assets/images/icons/icon-Shop-Market.svg"
        },
        {
          titolo: "Terreno",
          piano: "Piano terra",
          superficie: "1.607 m²",
          coefficiente: "20%",
          tipoSuperficie: "Accessoria",
          superficieCommerciale: "321,4 m²",
          icona: "assets/images/icons/icon-terreno.svg",
          /* Prova evidenziazione in scheda */
          inEvidenza: true
        },
        {
          titolo: "Terrazzo",
          piano: "Esterno",
          superficie: "55 m²",
          coefficiente: "30%",
          tipoSuperficie: "Accessoria",
          superficieCommerciale: "18,0 m²",
          icona: "assets/images/icons/icon-Terrace.svg"
        },
        {
          titolo: "Altro",
          piano: "Piano terra",
          superficie: "80,0 m²",
          coefficiente: "30%",
          tipoSuperficie: "Principale",
          superficieCommerciale: "24,0 m²",
          icona: "assets/images/icons/icon-planimetria.svg"
        }
      ],
      /* Servizi nell’area (da report, raggio ~2 km) */
      dintorniNota: "Servizi raggiungibili in pochi minuti (entro circa 2 km).",
      dintorni: [
        {
          voce: "Stazione ferroviaria",
          dettaglio: "Staz. di Sparanise entro 2 km.",
          icona: "assets/images/icons/icon-Train.svg"
        },
        {
          voce: "Supermercati",
          dettaglio: "Eurospin, DO.DE.CA. entro 2 km.",
          icona: "assets/images/icons/icon-Shopping-Cart-Full.svg"
        },
        {
          voce: "Scuole",
          dettaglio: "Primaria,  I - II Grado entro 2 km.",
          icona: "assets/images/icons/icon-School.svg"
        },
        {
          voce: "Banca",
          dettaglio: "Intesa San Paolo entro 2 km.",
          icona: "assets/images/icons/icon-Bank.svg"
        },
        {
          voce: "Servizio medico e farmacie",
          dettaglio: "entro 2 km.",
          icona: "assets/images/icons/icon-Medical.svg"
        },
        {
          voce: "Ufficio postale",
          dettaglio: "entro 2 km.",
          icona: "assets/images/icons/icon-Post-Office.svg"
        }
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

/** Tutti gli annunci vendita pubblicati (pagina vendita.html) */
function getAnnunciVenditaTutti() {
  return annunci.vendita.filter((a) => !a.placeholder && a.collegabile);
}

/** Formatta prezzo stile mockup: €. 75.000 */
function formatPrezzo(prezzo) {
  if (prezzo == null) return "";
  return `€. ${prezzo.toLocaleString("it-IT")}`;
}

/** Formatta piano: 2 → "2° piano" ; stringa personalizzata resta invariata */
function formatPiano(piano) {
  if (piano == null) return "—";
  if (typeof piano === "string") return piano;
  if (piano === 0) return "T. piano";
  return `${piano}° piano`;
}
function formatTipologia(annuncio, opzioni = {}) {
  if (annuncio.placeholder) return "Nuovo annuncio";
  const via =
    opzioni.viaBreve && annuncio.viaBreve ? annuncio.viaBreve : annuncio.via;
  if (via) {
    return `${annuncio.tipologia} in ${via}`;
  }
  if (annuncio.categoriaAnnuncio) {
    return `${annuncio.tipologia} - ${annuncio.categoriaAnnuncio}`;
  }
  return annuncio.tipologia;
}
