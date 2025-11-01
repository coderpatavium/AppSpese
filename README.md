# 💰 App Gestione Spese

Un'applicazione web per gestire le spese condivise tra te e tua moglie.

## Funzionalità

- ➕ Aggiungi spese con descrizione, importo, categoria, data e persona che ha pagato
- 📊 Visualizza totali spese per ciascuno
- 💸 Calcolo automatico del bilancio (chi deve a chi)
- 🗑️ Elimina spese
- 💾 Salvataggio automatico dei dati nel browser (localStorage)
- 📱 Design responsive, utilizzabile anche da smartphone

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

1. Compila il form con i dettagli della spesa
2. Seleziona chi ha pagato (Io o Mia Moglie)
3. Clicca "Aggiungi Spesa"
4. Le spese vengono salvate automaticamente e il bilancio viene calcolato

## Tecnologie utilizzate

- React
- Vite
- CSS3
