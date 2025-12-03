// Schema fisso per l'estrazione dati trasformatore
// Basato sul capitolato tecnico con priorità definite

export const transformerSchema = {
  sections: [
    {
      title: "Dati Principali",
      color: "#ff6b6b",
      fields: [
        {
          priority: "Tutti",
          keyEng: "referenceStandards",
          keyIta: "Norme di riferimento",
          label: "Norme di riferimento",
          examples: "IEC / IEEE / ANSI / AS / ATEX / ...",
          required: true
        },
        {
          priority: "Tutti",
          keyEng: "ecoDesign",
          keyIta: "Eco Design",
          label: "Eco Design (EU) No 548/2014?",
          examples: "Si / No",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "insulationType",
          keyIta: "Tipologia trasformatore",
          label: "Tipologia trasformatore",
          examples: "Resina - Olio",
          required: true
        },
        {
          priority: "Tutti",
          keyEng: "coolingSystem",
          keyIta: "Sistema di raffreddamento",
          label: "Sistema di raffreddamento",
          examples: "AN / ONAN / AN/AF / ONAN/ONAF / ...",
          required: true
        },
        {
          priority: "Tutti",
          keyEng: "ambientTemperature",
          keyIta: "Range temperatura ambiente",
          label: "Range temperatura ambiente",
          examples: "-25 / +40 °C",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "altitude",
          keyIta: "Altitudine",
          label: "Altitudine",
          examples: "1000 metri",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "installationType",
          keyIta: "Tipo di installazione",
          label: "Tipo di installazione",
          examples: "Interna / Esterna",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "loadingConditions",
          keyIta: "Caratteristiche di carico",
          label: "Caratteristiche di carico",
          examples: "Distribuzione / Conversione / Trazione / ...",
          required: false
        }
      ]
    },
    {
      title: "Caratteristiche Elettriche",
      color: "#4ecdc4",
      fields: [
        {
          priority: "Tutti",
          keyEng: "nominalPower",
          keyIta: "Potenza nominale",
          label: "Potenza nominale",
          examples: "kVA",
          required: true
        },
        {
          priority: "Tutti",
          keyEng: "numberOfPhases",
          keyIta: "Numero di fasi",
          label: "Numero di fasi",
          examples: "1 o 3",
          required: true
        },
        {
          priority: "Tutti",
          keyEng: "frequency",
          keyIta: "Frequenza",
          label: "Frequenza",
          examples: "50, 60 o 50/60 Hz",
          required: true
        },
        {
          priority: "Tutti",
          keyEng: "primaryVoltage",
          keyIta: "Tensione primaria",
          label: "Tensione primaria",
          examples: "V o kV",
          required: true
        },
        {
          priority: "Tutti",
          keyEng: "tappings",
          keyIta: "Posizioni",
          label: "Posizioni (Tappings)",
          examples: "± 2 x 2,5 %",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "tapChangerType",
          keyIta: "Tipo di commutatore",
          label: "Tipo di commutatore",
          examples: "Vuoto / Sotto carico",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "tapChangerBrand",
          keyIta: "Brand commutatore preferenziale",
          label: "Brand commutatore preferenziale",
          examples: "MR / Hitachi / Huaming",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "secondaryVoltage",
          keyIta: "Tensione a vuoto secondaria",
          label: "Tensione a vuoto secondaria",
          examples: "V o kV",
          required: true
        },
        {
          priority: "Tutti",
          keyEng: "vectorGroup",
          keyIta: "Gruppo vettoriale",
          label: "Gruppo vettoriale",
          examples: "Dyn11",
          required: true
        },
        {
          priority: "Tutti",
          keyEng: "noLoadLosses",
          keyIta: "Perdite a vuoto",
          label: "Perdite a vuoto",
          examples: "W o kW",
          required: false
        }
      ]
    },
    {
      title: "Perdite e Efficienza",
      color: "#95e1d3",
      fields: [
        {
          priority: "Tutti",
          keyEng: "loadLosses75",
          keyIta: "Perdite a carico a 75°C",
          label: "Perdite a carico a 75°C",
          examples: "W o kW",
          required: false
        },
        {
          priority: "Resina",
          keyEng: "loadLosses120",
          keyIta: "Perdite a carico a 120°C",
          label: "Perdite a carico a 120°C",
          examples: "W o kW",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "peakEfficiency",
          keyIta: "PEI (Peak Efficiency Index)",
          label: "PEI (Peak Efficiency Index)",
          examples: "%",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "noLoadCurrent",
          keyIta: "Corrente a vuoto",
          label: "Corrente a vuoto",
          examples: "%",
          required: false
        }
      ]
    },
    {
      title: "Isolamento",
      color: "#ff9ff3",
      fields: [
        {
          priority: "Tutti",
          keyEng: "impedanceVoltage",
          keyIta: "Impedenza di cortocircuito",
          label: "Impedenza di cortocircuito",
          examples: "%",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "primaryThermalClass",
          keyIta: "Classe termica isolamento primario",
          label: "Classe termica isolamento primario",
          examples: "F / H / ...",
          required: true
        },
        {
          priority: "Tutti",
          keyEng: "secondaryThermalClass",
          keyIta: "Classe termica isolamento secondario",
          label: "Classe termica isolamento secondario",
          examples: "F / H / ...",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "primaryInsulationLevel",
          keyIta: "Classe isolamento primario",
          label: "Classe isolamento primario",
          examples: "24 / 50 / 125",
          required: true
        },
        {
          priority: "Tutti",
          keyEng: "secondaryInsulationLevel",
          keyIta: "Classe isolamento secondario",
          label: "Classe isolamento secondario",
          examples: "1,1 / 3",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "windingsMaterial",
          keyIta: "Materiale avvolgimenti",
          label: "Materiale avvolgimenti",
          examples: "Cu / Al",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "windingsTemperatureRise",
          keyIta: "Sovratempetarura avvolgimenti",
          label: "Sovratempetarura avvolgimenti",
          examples: "100 / 100 K",
          required: false
        }
      ]
    },
    {
      title: "Caratteristiche Meccaniche",
      color: "#feca57",
      fields: [
        {
          priority: "Tutti",
          keyEng: "maxSoundPressure",
          keyIta: "Massima pressione sonora LPA",
          label: "Massima pressione sonora LPA",
          examples: "65 dBA @ 1 m",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "maxSoundPower",
          keyIta: "Massima potenza sonora LWA",
          label: "Massima potenza sonora LWA",
          examples: "75 dBA",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "maxDimensions",
          keyIta: "Dimensioni massime",
          label: "Dimensioni massime",
          examples: "L x W x H mm",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "paintingProtection",
          keyIta: "Protezione superficiale",
          label: "Protezione superficiale",
          examples: "C2 / C3 / C4 / C5 / CX e relativa durabilità secondo ISO 12944",
          required: false
        }
      ]
    },
    {
      title: "Protezioni e Tolleranze",
      color: "#48dbfb",
      fields: [
        {
          priority: "Tutti",
          keyEng: "shortCircuitTime",
          keyIta: "Durata del cortocircuito",
          label: "Durata del cortocircuito",
          examples: "2 sec",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "toleranceImpedance",
          keyIta: "Tolleranza richiesta su impedenza di cortocircuito",
          label: "Tolleranza richiesta su impedenza di cortocircuito",
          examples: "-0 / +7,5%",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "toleranceLosses",
          keyIta: "Tolleranza richiesta su perdite a carico e a vuoto",
          label: "Tolleranza richiesta su perdite a carico e a vuoto",
          examples: "+0%",
          required: false
        },
        {
          priority: "Resina",
          keyEng: "fireClass",
          keyIta: "Classe ambientale / climatica / resistenza al fuoco richiesta",
          label: "Classe ambientale / climatica / resistenza al fuoco richiesta",
          examples: "E3-C2-F1",
          required: false
        }
      ]
    },
    {
      title: "Accessori",
      color: "#a8e6cf",
      fields: [
        {
          priority: "Tutti",
          keyEng: "ratingPlate",
          keyIta: "Targhetta dei dati, targhette identificative, altre marcature",
          label: "Targhetta dei dati",
          examples: "Testo libero",
          required: false
        },
        {
          priority: "Resina",
          keyEng: "thermoresistances",
          keyIta: "Termoresistenze PT100",
          label: "Termoresistenze PT100",
          examples: "Sì / No",
          required: false
        },
        {
          priority: "Resina",
          keyEng: "temperatureMonitoring",
          keyIta: "Dispositivo digitale di monitoraggio della temperatura",
          label: "Dispositivo digitale di monitoraggio della temperatura",
          examples: "Sì / No",
          required: false
        },
        {
          priority: "Resina",
          keyEng: "enclosure",
          keyIta: "Involucro del trasformatore / IP RAL / Protezione superficiale",
          label: "Involucro del trasformatore / IP / RAL",
          examples: "Testo libero",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "truck",
          keyIta: "Carrello con ruote regolabili nelle due direzioni principali",
          label: "Carrello con ruote regolabili",
          examples: "Sì / No",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "liftingLugs",
          keyIta: "Golfari di sollevamento",
          label: "Golfari di sollevamento",
          examples: "Sì / No",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "towingEyelets",
          keyIta: "Occhielli per il traino",
          label: "Occhielli per il traino",
          examples: "Sì / No",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "electrostaticScreen",
          keyIta: "Schermo elettrostatico tra primario e secondario",
          label: "Schermo elettrostatico",
          examples: "Sì / No",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "antiVibrationPads",
          keyIta: "Supporti antivibranti",
          label: "Supporti antivibranti",
          examples: "Sì / No",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "earthingBalls",
          keyIta: "Sfere di messa a terra Ø25mm sui terminali AT e BT",
          label: "Sfere di messa a terra",
          examples: "Sì / No",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "coolingKit",
          keyIta: "Kit di raffreddamento ad aria forzata / Ventole per ventilazione forzata",
          label: "Kit di raffreddamento ad aria forzata",
          examples: "Sì / No",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "surgeArresters",
          keyIta: "Scaricatori di sovratensione",
          label: "Scaricatori di sovratensione",
          examples: "Sì / No",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "auxiliaryCabinet",
          keyIta: "Quadro ausiliario e requisiti",
          label: "Quadro ausiliario e requisiti",
          examples: "Testo libero",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "currentTransformers",
          keyIta: "Trasformatori di corrente TA",
          label: "Trasformatori di corrente TA",
          examples: "Testo libero",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "voltageTransformers",
          keyIta: "Trasformatori di tensione TV",
          label: "Trasformatori di tensione TV",
          examples: "Testo libero",
          required: false
        }
      ]
    },
    {
      title: "Test e Prove",
      color: "#dfe6e9",
      fields: [
        {
          priority: "Tutti",
          keyEng: "routineTests",
          keyIta: "Prove di routine",
          label: "Prove di routine",
          examples: "Testo libero",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "specialTests",
          keyIta: "Prove speciali",
          label: "Prove speciali",
          examples: "Testo libero",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "typeTests",
          keyIta: "Prove di tipo",
          label: "Prove di tipo",
          examples: "Testo libero",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "otherTests",
          keyIta: "Altre prove speciali richieste",
          label: "Altre prove speciali richieste",
          examples: "Testo libero",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "fatTest",
          keyIta: "Collaudo in fabbrica FAT",
          label: "Collaudo in fabbrica FAT",
          examples: "Sì / No",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "satTest",
          keyIta: "Collaudo in sito SAT",
          label: "Collaudo in sito SAT",
          examples: "Sì / No",
          required: false
        }
      ]
    },
    {
      title: "Altre Informazioni",
      color: "#b8e994",
      fields: [
        {
          priority: "Tutti",
          keyEng: "deliveryPenalties",
          keyIta: "Penali su consegna",
          label: "Penali su consegna",
          examples: "Testo libero",
          required: false
        },
        {
          priority: "Tutti",
          keyEng: "documentationPenalties",
          keyIta: "Penali consegna documentazione",
          label: "Penali consegna documentazione",
          examples: "Testo libero",
          required: false
        }
      ]
    }
  ]
}

// Funzione helper per ottenere tutti i campi in ordine
export const getAllFields = () => {
  return transformerSchema.sections.flatMap(section =>
    section.fields.map(field => ({
      ...field,
      sectionTitle: section.title,
      sectionColor: section.color
    }))
  )
}

// Funzione helper per ottenere campi per priorità
export const getFieldsByPriority = (priority) => {
  return getAllFields().filter(field =>
    field.priority === priority || field.priority === "Tutti"
  )
}
