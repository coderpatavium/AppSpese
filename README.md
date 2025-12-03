# Estrattore Dati Trasformatore

Un'applicazione web intelligente che estrae automaticamente i dati tecnici di trasformatori da file di capitolato.

## Funzionalità

- 📄 Caricamento file PDF e TXT
- 🔍 Estrazione automatica dei dati tecnici del trasformatore
- 📊 Visualizzazione strutturata dei risultati
- ✅ Identificazione visiva dei dati trovati/non trovati
- 📱 Design responsive e moderno
- 🎯 Pattern matching intelligente per riconoscimento dati

## Dati Estratti

L'applicazione è in grado di estrarre i seguenti dati tecnici:

- **Potenza nominale** (kVA, MVA, VA)
- **Tensione primaria** (kV, V)
- **Tensione secondaria** (kV, V)
- **Frequenza** (Hz)
- **Tipo di trasformatore** (olio, resina, secco)
- **Classe di isolamento** (A, B, F, H)
- **Sistema di raffreddamento** (ONAN, ONAF, OFAF, etc.)
- **Numero di fasi** (monofase, trifase)
- **Gruppo vettoriale** (Dy11, Dyn11, etc.)
- **Marca/Costruttore**
- **Modello**
- **Normativa di riferimento** (CEI, IEC, EN)
- **Peso** (kg, t)
- **Perdite** (W, kW)

## Come avviare l'app

1. Installa le dipendenze (solo la prima volta):
   ```bash
   npm install
   ```

2. Avvia l'applicazione:
   ```bash
   npm run dev
   ```

3. Apri il browser all'indirizzo che ti viene mostrato (solitamente http://localhost:5173)

## Come usarla

1. Clicca su "Scegli file" e seleziona un file PDF o TXT contenente il capitolato del trasformatore
2. Clicca su "Estrai Dati" per avviare l'analisi
3. Visualizza i risultati estratti nella sezione sottostante
4. I dati trovati saranno evidenziati in verde, quelli non trovati in arancione
5. Clicca su "Mostra testo estratto" per vedere il contenuto completo del file

## Formati Supportati

- **PDF**: file di capitolato in formato PDF
- **TXT**: file di testo semplice contenenti le specifiche tecniche

## Tecnologie utilizzate

- React 19
- Vite
- PDF.js (per l'estrazione da PDF)
- CSS3 con design moderno e responsive

## Note Tecniche

L'estrazione utilizza pattern matching avanzato con espressioni regolari per identificare automaticamente i dati tecnici all'interno del testo. Il sistema è ottimizzato per riconoscere diverse varianti di scrittura e formati comunemente usati nei capitolati tecnici italiani e internazionali.
