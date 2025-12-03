import { useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import { transformerSchema } from '../utils/transformerSchema'

// Configura il worker di PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

function TransformerExtractor() {
  const [file, setFile] = useState(null)
  const [extractedData, setExtractedData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [rawText, setRawText] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('Tutti')

  const extractTransformerData = (text) => {
    const data = {}

    // Itera su tutte le sezioni e campi dello schema
    transformerSchema.sections.forEach(section => {
      section.fields.forEach(field => {
        data[field.keyEng] = extractFieldValue(text, field)
      })
    })

    return data
  }

  const extractFieldValue = (text, field) => {
    const patterns = getPatternsByField(field.keyEng)

    for (const pattern of patterns) {
      const match = text.match(pattern)
      if (match) {
        // Restituisce il gruppo catturato o l'intero match
        return match[1] || match[0]
      }
    }

    return null
  }

  const getPatternsByField = (keyEng) => {
    const patterns = {
      // Dati Principali
      referenceStandards: [
        /(?:reference\s*standards?|norme?\s*(?:di\s*)?riferimento)[:\s]+([^\n]+)/i,
        /(iec|ieee|ansi|cei|en|atex)[\s\/][\d\-]+/gi
      ],
      ecoDesign: [
        /eco\s*design[:\s]+(si|no|yes|no)/i,
        /548\/2014[:\s]+(si|no|yes|no)/i
      ],
      insulationType: [
        /(?:insulation\s*type|tipologia\s*trasformatore)[:\s]+([^\n]+)/i,
        /(resina|olio|secco|dry|oil|resin)/i
      ],
      coolingSystem: [
        /(?:cooling\s*system|(?:sistema\s*(?:di\s*)?)?raffreddamento)[:\s]+([^\n]+)/i,
        /(onan|onaf|ofaf|ofwf|odan|an\/af)/i
      ],
      ambientTemperature: [
        /(?:ambient\s*temperature|(?:range\s*)?temperatura\s*ambiente)[:\s]+([^\n]+)/i,
        /([-+]?\d+)\s*[\/°]\s*([-+]?\d+)\s*°?c/i
      ],
      altitude: [
        /(?:altitude|altitudine)[:\s]+(\d+(?:[.,]\d+)?)\s*(?:m|metri|meters?)/i
      ],
      installationType: [
        /(?:installation\s*type|tipo\s*(?:di\s*)?installazione)[:\s]+([^\n]+)/i,
        /(intern[ao]|estern[ao]|indoor|outdoor)/i
      ],
      loadingConditions: [
        /(?:loading\s*conditions|caratteristiche\s*(?:di\s*)?carico)[:\s]+([^\n]+)/i,
        /(distribuzione|conversione|trazione|distribution|conversion|traction)/i
      ],

      // Caratteristiche Elettriche
      nominalPower: [
        /(?:nominal\s*power|potenza\s*nominale)[:\s]+(\d+(?:[.,]\d+)?)\s*(kva|mva|va)/i,
        /(\d+(?:[.,]\d+)?)\s*(kva|mva)/i
      ],
      numberOfPhases: [
        /(?:number\s*of\s*phases?|numero\s*(?:di\s*)?fasi)[:\s]+(\d)/i,
        /(trifase|monofase|three[-\s]phase|single[-\s]phase)/i
      ],
      frequency: [
        /(?:frequency|frequenza)[:\s]+(\d+(?:\/\d+)?)\s*hz/i,
        /(\d+)\s*hz/i
      ],
      primaryVoltage: [
        /(?:primary\s*voltage|tensione\s*primaria?|alta\s*tensione|mt)[:\s]+(\d+(?:[.,]\d+)?)\s*(kv|v)/i,
        /at[:\s]+(\d+(?:[.,]\d+)?)\s*(kv|v)/i
      ],
      tappings: [
        /(?:tappings?|posizioni)[:\s]+([^\n]+)/i,
        /([±]\s*\d+\s*x\s*\d+(?:[.,]\d+)?%)/i
      ],
      tapChangerType: [
        /(?:tap\s*changer\s*type|tipo\s*(?:di\s*)?commutatore)[:\s]+([^\n]+)/i,
        /(vuoto|sotto\s*carico|off[-\s]load|on[-\s]load|oltc)/i
      ],
      tapChangerBrand: [
        /(?:tap\s*changer\s*brand|brand\s*commutatore)[:\s]+([^\n]+)/i,
        /(mr|hitachi|huaming|abb|maschinenfabrik)/i
      ],
      secondaryVoltage: [
        /(?:secondary\s*voltage|tensione\s*(?:a\s*vuoto\s*)?secondaria?|bassa\s*tensione|bt)[:\s]+(\d+(?:[.,]\d+)?)\s*(kv|v)/i
      ],
      vectorGroup: [
        /(?:vector\s*group|gruppo\s*vettoriale)[:\s]+([dy]y?n?\d+)/i,
        /\b([dy]y?n?\d+)\b/i
      ],
      noLoadLosses: [
        /(?:no[-\s]load\s*losses?|perdite?\s*(?:a\s*)?vuoto)[:\s]+(\d+(?:[.,]\d+)?)\s*(w|kw)/i
      ],

      // Perdite e Efficienza
      loadLosses75: [
        /(?:load\s*losses?.*?75|perdite?\s*(?:a\s*)?carico.*?75)[^\d]*(\d+(?:[.,]\d+)?)\s*(w|kw)/i
      ],
      loadLosses120: [
        /(?:load\s*losses?.*?120|perdite?\s*(?:a\s*)?carico.*?120)[^\d]*(\d+(?:[.,]\d+)?)\s*(w|kw)/i
      ],
      peakEfficiency: [
        /(?:pei|peak\s*efficiency\s*index)[:\s]+(\d+(?:[.,]\d+)?)\s*%/i
      ],
      noLoadCurrent: [
        /(?:no[-\s]load\s*current|corrente\s*(?:a\s*)?vuoto)[:\s]+(\d+(?:[.,]\d+)?)\s*%/i
      ],

      // Isolamento
      impedanceVoltage: [
        /(?:impedance\s*voltage|impedenza\s*(?:di\s*)?cortocircuito)[:\s]+(\d+(?:[.,]\d+)?)\s*%/i,
        /\bvcc[:\s]+(\d+(?:[.,]\d+)?)\s*%/i
      ],
      primaryThermalClass: [
        /(?:primary.*?thermal\s*class|classe\s*termica.*?primario)[:\s]+([a-h])/i,
        /(?:classe\s*termica.*?primario|primary.*?insulation\s*class)[:\s]+([a-h])/i
      ],
      secondaryThermalClass: [
        /(?:secondary.*?thermal\s*class|classe\s*termica.*?secondario)[:\s]+([a-h])/i
      ],
      primaryInsulationLevel: [
        /(?:primary.*?insulation\s*level|classe\s*isolamento\s*primario)[:\s]+(\d+(?:\/\d+)?)/i
      ],
      secondaryInsulationLevel: [
        /(?:secondary.*?insulation\s*level|classe\s*isolamento\s*secondario)[:\s]+(\d+(?:[.,]\d+)?(?:\/\d+)?)/i
      ],
      windingsMaterial: [
        /(?:windings?\s*material|materiale\s*avvolgimenti)[:\s]+([^\n]+)/i,
        /\b(cu|al|rame|alluminio|copper|aluminium)\b/i
      ],
      windingsTemperatureRise: [
        /(?:windings?\s*temperature\s*rise|sovratemperatura\s*avvolgimenti)[:\s]+(\d+(?:\/\d+)?)\s*k/i
      ],

      // Caratteristiche Meccaniche
      maxSoundPressure: [
        /(?:max.*?sound\s*pressure|massima\s*pressione\s*sonora).*?lpa[:\s]+(\d+)\s*dba/i
      ],
      maxSoundPower: [
        /(?:max.*?sound\s*power|massima\s*potenza\s*sonora).*?lwa[:\s]+(\d+)\s*dba/i
      ],
      maxDimensions: [
        /(?:max.*?dimensions?|dimensioni\s*massime)[:\s]+([^\n]+)/i,
        /(\d+\s*x\s*\d+\s*x\s*\d+)\s*mm/i
      ],
      paintingProtection: [
        /(?:painting\s*protection|protezione\s*superficiale)[:\s]+([^\n]+)/i,
        /(c[2-5]|cx)/i
      ],

      // Protezioni e Tolleranze
      shortCircuitTime: [
        /(?:short[-\s]circuit.*?time|durata.*?cortocircuito)[:\s]+(\d+)\s*se?c/i
      ],
      toleranceImpedance: [
        /(?:tolerance.*?impedance|tolleranza.*?impedenza)[:\s]+([-+]?\d+(?:[.,]\d+)?)\s*\/?\s*([-+]?\d+(?:[.,]\d+)?)\s*%/i
      ],
      toleranceLosses: [
        /(?:tolerance.*?losses?|tolleranza.*?perdite)[:\s]+([-+]?\d+(?:[.,]\d+)?)\s*%/i
      ],
      fireClass: [
        /(?:fire\s*class|classe.*?fuoco)[:\s]+([^\n]+)/i,
        /(e\d[-]c\d[-]f\d)/i
      ],

      // Accessori (Sì/No per la maggior parte)
      thermoresistances: [
        /pt100[:\s]+(si|no|yes|s[íì])/i,
        /(?:thermoresistances?|termoresistenz[ei])[:\s]+(si|no|yes)/i
      ],
      temperatureMonitoring: [
        /(?:temperature\s*monitoring|monitoraggio.*?temperatura)[:\s]+(si|no|yes)/i,
        /(?:dispositivo.*?digitale)[:\s]+(si|no|yes)/i
      ],
      enclosure: [
        /(?:enclosure|involucro)[:\s]+([^\n]+)/i,
        /ip\s*\d{2}/i
      ],
      truck: [
        /(?:truck|carrello)[:\s]+(si|no|yes)/i,
        /(?:ruote\s*regolabili)[:\s]+(si|no|yes)/i
      ],
      liftingLugs: [
        /(?:lifting\s*lugs?|golfari)[:\s]+(si|no|yes)/i
      ],
      towingEyelets: [
        /(?:towing\s*eyelets?|occhielli.*?traino)[:\s]+(si|no|yes)/i
      ],
      electrostaticScreen: [
        /(?:electrostatic\s*screen|schermo\s*elettrostatico)[:\s]+(si|no|yes)/i
      ],
      antiVibrationPads: [
        /(?:anti[-\s]vibration\s*pads?|supporti\s*antivibranti)[:\s]+(si|no|yes)/i
      ],
      earthingBalls: [
        /(?:earthing\s*balls?|sfere.*?messa.*?terra)[:\s]+(si|no|yes)/i,
        /ø\s*25\s*mm[:\s]+(si|no|yes)/i
      ],
      coolingKit: [
        /(?:cooling\s*kit|kit.*?raffreddamento)[:\s]+(si|no|yes)/i,
        /(?:ventole?|fans?)[:\s]+(si|no|yes)/i
      ],
      surgeArresters: [
        /(?:surge\s*arresters?|scaricatori)[:\s]+(si|no|yes)/i
      ],
      auxiliaryCabinet: [
        /(?:auxiliary\s*cabinet|quadro\s*ausiliario)[:\s]+([^\n]+)/i
      ],
      currentTransformers: [
        /(?:current\s*transformers?|trasformatori.*?corrente|ta)[:\s]+([^\n]+)/i
      ],
      voltageTransformers: [
        /(?:voltage\s*transformers?|trasformatori.*?tensione|tv)[:\s]+([^\n]+)/i
      ],

      // Test e Prove
      routineTests: [
        /(?:routine\s*tests?|prove.*?routine)[:\s]+([^\n]+)/i
      ],
      specialTests: [
        /(?:special\s*tests?|prove\s*speciali)[:\s]+([^\n]+)/i
      ],
      typeTests: [
        /(?:type\s*tests?|prove.*?tipo)[:\s]+([^\n]+)/i
      ],
      otherTests: [
        /(?:other.*?tests?|altre\s*prove)[:\s]+([^\n]+)/i
      ],
      fatTest: [
        /(?:fat|factory\s*acceptance\s*test|collaudo.*?fabbrica)[:\s]+(si|no|yes)/i
      ],
      satTest: [
        /(?:sat|site\s*acceptance\s*test|collaudo.*?sito)[:\s]+(si|no|yes)/i
      ],

      // Altre Informazioni
      deliveryPenalties: [
        /(?:delivery\s*penalties|penali.*?consegna)[:\s]+([^\n]+)/i
      ],
      documentationPenalties: [
        /(?:documentation\s*penalties|penali.*?documentazione)[:\s]+([^\n]+)/i
      ],

      ratingPlate: [
        /(?:rating\s*plate|targhetta)[:\s]+([^\n]+)/i
      ]
    }

    return patterns[keyEng] || []
  }

  const extractTextFromPDF = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      let fullText = ''

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        const pageText = textContent.items.map(item => item.str).join(' ')
        fullText += pageText + '\n'
      }

      return fullText
    } catch (err) {
      throw new Error('Errore nella lettura del PDF: ' + err.message)
    }
  }

  const extractTextFromTxt = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.onerror = (e) => reject(new Error('Errore nella lettura del file'))
      reader.readAsText(file)
    })
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)
      setExtractedData(null)
      setRawText('')
    }
  }

  const handleExtract = async () => {
    if (!file) {
      setError('Seleziona un file prima di procedere')
      return
    }

    setLoading(true)
    setError(null)

    try {
      let text = ''

      if (file.type === 'application/pdf') {
        text = await extractTextFromPDF(file)
      } else if (file.type === 'text/plain') {
        text = await extractTextFromTxt(file)
      } else {
        throw new Error('Formato file non supportato. Usa PDF o TXT')
      }

      setRawText(text)
      const data = extractTransformerData(text)
      setExtractedData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setExtractedData(null)
    setRawText('')
    setError(null)
  }

  const getFieldsToDisplay = () => {
    return transformerSchema.sections.map(section => ({
      ...section,
      fields: section.fields.filter(field =>
        selectedPriority === 'Tutti' ||
        field.priority === 'Tutti' ||
        field.priority === selectedPriority
      )
    })).filter(section => section.fields.length > 0)
  }

  const formatValue = (value, field) => {
    if (!value) return 'Non trovato'

    // Normalizza sì/no
    if (/^(si|yes|s[íì])$/i.test(value)) return 'Sì'
    if (/^no$/i.test(value)) return 'No'

    // Normalizza fasi
    if (field.keyEng === 'numberOfPhases') {
      if (/trifase|three/i.test(value)) return '3'
      if (/monofase|single/i.test(value)) return '1'
    }

    return value.trim()
  }

  const countFoundFields = () => {
    if (!extractedData) return { found: 0, total: 0 }

    const displaySections = getFieldsToDisplay()
    const totalFields = displaySections.reduce((sum, section) => sum + section.fields.length, 0)
    const foundFields = displaySections.reduce((sum, section) =>
      sum + section.fields.filter(field => extractedData[field.keyEng]).length, 0
    )

    return { found: foundFields, total: totalFields }
  }

  return (
    <div className="transformer-extractor">
      <div className="upload-section">
        <h2>Carica Capitolato</h2>

        <div className="priority-selector">
          <label>Filtra per priorità:</label>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="priority-select"
          >
            <option value="Tutti">Tutti i campi</option>
            <option value="Resina">Solo Resina</option>
            <option value="Olio">Solo Olio</option>
          </select>
        </div>

        <div className="file-input-wrapper">
          <input
            type="file"
            accept=".pdf,.txt"
            onChange={handleFileChange}
            id="file-input"
          />
          <label htmlFor="file-input" className="file-label">
            {file ? file.name : 'Scegli file (PDF o TXT)'}
          </label>
        </div>

        <div className="button-group">
          <button
            onClick={handleExtract}
            disabled={!file || loading}
            className="extract-btn"
          >
            {loading ? 'Estrazione in corso...' : 'Estrai Dati'}
          </button>

          {(file || extractedData) && (
            <button onClick={handleReset} className="reset-btn">
              Reset
            </button>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}

        {extractedData && (
          <div className="stats-badge">
            Dati trovati: {countFoundFields().found} / {countFoundFields().total}
          </div>
        )}
      </div>

      {extractedData && (
        <div className="results-section">
          <h2>Dati Estratti - Schema Fisso</h2>

          {getFieldsToDisplay().map((section, sectionIdx) => (
            <div key={sectionIdx} className="data-section">
              <h3
                className="section-title"
                style={{ borderLeftColor: section.color }}
              >
                {section.title}
              </h3>

              <div className="data-grid">
                {section.fields.map((field, fieldIdx) => {
                  const value = extractedData[field.keyEng]
                  const formattedValue = formatValue(value, field)
                  const isFound = value !== null && value !== undefined

                  return (
                    <div
                      key={fieldIdx}
                      className={`data-item ${isFound ? 'found' : 'not-found'}`}
                    >
                      <div className="data-header">
                        <span className="data-label">{field.label}</span>
                        <span className="data-priority">{field.priority}</span>
                      </div>
                      <span className="data-value">{formattedValue}</span>
                      {!isFound && field.examples && (
                        <span className="data-example">Es: {field.examples}</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {rawText && (
            <details className="raw-text-section">
              <summary>Mostra testo estratto completo</summary>
              <pre className="raw-text">{rawText}</pre>
            </details>
          )}
        </div>
      )}
    </div>
  )
}

export default TransformerExtractor
