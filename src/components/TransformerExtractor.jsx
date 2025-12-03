import { useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'

// Configura il worker di PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

function TransformerExtractor() {
  const [file, setFile] = useState(null)
  const [extractedData, setExtractedData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [rawText, setRawText] = useState('')

  const extractTransformerData = (text) => {
    // Normalizza il testo
    const normalizedText = text.replace(/\s+/g, ' ').toLowerCase()

    const data = {
      potenza: null,
      tensionePrimaria: null,
      tensioneSecondaria: null,
      frequenza: null,
      tipo: null,
      classe: null,
      raffreddamento: null,
      numeroFasi: null,
      gruppo: null,
      marca: null,
      modello: null,
      normativa: null,
      peso: null,
      perdite: null
    }

    // Estrazione Potenza (kVA, MVA, VA)
    const potenzaPatterns = [
      /potenza\s*(?:nominale)?[:\s]+(\d+(?:[.,]\d+)?)\s*(kva|mva|va)/i,
      /(\d+(?:[.,]\d+)?)\s*(kva|mva|va)/i,
      /rated\s*power[:\s]+(\d+(?:[.,]\d+)?)\s*(kva|mva|va)/i
    ]
    for (const pattern of potenzaPatterns) {
      const match = text.match(pattern)
      if (match) {
        data.potenza = `${match[1]} ${match[2].toUpperCase()}`
        break
      }
    }

    // Estrazione Tensione Primaria
    const tensPrimPatterns = [
      /tensione\s*primaria?[:\s]+(\d+(?:[.,]\d+)?)\s*(kv|v)/i,
      /primary\s*voltage[:\s]+(\d+(?:[.,]\d+)?)\s*(kv|v)/i,
      /alta\s*tensione[:\s]+(\d+(?:[.,]\d+)?)\s*(kv|v)/i,
      /mt[:\s]+(\d+(?:[.,]\d+)?)\s*(kv|v)/i
    ]
    for (const pattern of tensPrimPatterns) {
      const match = text.match(pattern)
      if (match) {
        data.tensionePrimaria = `${match[1]} ${match[2].toUpperCase()}`
        break
      }
    }

    // Estrazione Tensione Secondaria
    const tensSecPatterns = [
      /tensione\s*secondaria?[:\s]+(\d+(?:[.,]\d+)?)\s*(kv|v)/i,
      /secondary\s*voltage[:\s]+(\d+(?:[.,]\d+)?)\s*(kv|v)/i,
      /bassa\s*tensione[:\s]+(\d+(?:[.,]\d+)?)\s*(kv|v)/i,
      /bt[:\s]+(\d+(?:[.,]\d+)?)\s*(kv|v)/i
    ]
    for (const pattern of tensSecPatterns) {
      const match = text.match(pattern)
      if (match) {
        data.tensioneSecondaria = `${match[1]} ${match[2].toUpperCase()}`
        break
      }
    }

    // Estrazione Frequenza
    const freqMatch = text.match(/frequenza[:\s]+(\d+)\s*hz/i) ||
                      text.match(/frequency[:\s]+(\d+)\s*hz/i) ||
                      text.match(/(\d+)\s*hz/i)
    if (freqMatch) {
      data.frequenza = `${freqMatch[1]} Hz`
    }

    // Estrazione Tipo
    const tipoPatterns = [
      /tipo[:\s]+(trasformatore\s+\w+)/i,
      /type[:\s]+(\w+\s*\w*)/i,
      /(trasformatore\s+(?:in\s+)?(?:olio|resina|secco))/i
    ]
    for (const pattern of tipoPatterns) {
      const match = text.match(pattern)
      if (match) {
        data.tipo = match[1]
        break
      }
    }

    // Estrazione Classe di isolamento
    const classeMatch = text.match(/classe\s*(?:di\s*)?isolamento[:\s]+([a-h]\d?)/i) ||
                        text.match(/insulation\s*class[:\s]+([a-h]\d?)/i)
    if (classeMatch) {
      data.classe = classeMatch[1].toUpperCase()
    }

    // Estrazione Raffreddamento
    const raffreddamentoMatch = text.match(/raffreddamento[:\s]+(\w+)/i) ||
                                 text.match(/cooling[:\s]+(\w+)/i) ||
                                 text.match(/(onan|onaf|ofaf|ofwf|odan)/i)
    if (raffreddamentoMatch) {
      data.raffreddamento = raffreddamentoMatch[1].toUpperCase()
    }

    // Estrazione Numero Fasi
    const fasiMatch = text.match(/(\d)\s*fasi/i) ||
                      text.match(/trifase/i) ||
                      text.match(/monofase/i)
    if (fasiMatch) {
      if (fasiMatch[0].toLowerCase().includes('trifase')) {
        data.numeroFasi = '3'
      } else if (fasiMatch[0].toLowerCase().includes('monofase')) {
        data.numeroFasi = '1'
      } else {
        data.numeroFasi = fasiMatch[1]
      }
    }

    // Estrazione Gruppo vettoriale
    const gruppoMatch = text.match(/gruppo\s*(?:vettoriale)?[:\s]+([dy]y?\d+)/i) ||
                        text.match(/vector\s*group[:\s]+([dy]y?\d+)/i)
    if (gruppoMatch) {
      data.gruppo = gruppoMatch[1].toUpperCase()
    }

    // Estrazione Marca
    const marcaPatterns = [
      /marca[:\s]+(\w+(?:\s+\w+)?)/i,
      /manufacturer[:\s]+(\w+(?:\s+\w+)?)/i,
      /costruttore[:\s]+(\w+(?:\s+\w+)?)/i
    ]
    for (const pattern of marcaPatterns) {
      const match = text.match(pattern)
      if (match) {
        data.marca = match[1]
        break
      }
    }

    // Estrazione Normativa
    const normativaMatch = text.match(/(cei\s+\d+-\d+(?:-\d+)?)/i) ||
                           text.match(/(iec\s+\d+(?:-\d+)?)/i) ||
                           text.match(/(en\s+\d+(?:-\d+)?)/i)
    if (normativaMatch) {
      data.normativa = normativaMatch[1].toUpperCase()
    }

    // Estrazione Peso
    const pesoMatch = text.match(/peso[:\s]+(\d+(?:[.,]\d+)?)\s*(kg|t|ton)/i) ||
                      text.match(/weight[:\s]+(\d+(?:[.,]\d+)?)\s*(kg|t|ton)/i)
    if (pesoMatch) {
      data.peso = `${pesoMatch[1]} ${pesoMatch[2]}`
    }

    // Estrazione Perdite
    const perditeMatch = text.match(/perdite\s*(?:totali)?[:\s]+(\d+(?:[.,]\d+)?)\s*(w|kw)/i) ||
                         text.match(/losses[:\s]+(\d+(?:[.,]\d+)?)\s*(w|kw)/i)
    if (perditeMatch) {
      data.perdite = `${perditeMatch[1]} ${perditeMatch[2].toUpperCase()}`
    }

    return data
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

  return (
    <div className="transformer-extractor">
      <div className="upload-section">
        <h2>Carica Capitolato</h2>
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
      </div>

      {extractedData && (
        <div className="results-section">
          <h2>Dati Estratti</h2>
          <div className="data-grid">
            {Object.entries(extractedData).map(([key, value]) => (
              <div key={key} className={`data-item ${value ? 'found' : 'not-found'}`}>
                <span className="data-label">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                </span>
                <span className="data-value">
                  {value || 'Non trovato'}
                </span>
              </div>
            ))}
          </div>

          {rawText && (
            <details className="raw-text-section">
              <summary>Mostra testo estratto</summary>
              <pre className="raw-text">{rawText}</pre>
            </details>
          )}
        </div>
      )}
    </div>
  )
}

export default TransformerExtractor
