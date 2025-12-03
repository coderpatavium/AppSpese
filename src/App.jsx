import './App.css'
import TransformerExtractor from './components/TransformerExtractor'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Estrattore Dati Trasformatore</h1>
        <p className="subtitle">Carica un capitolato per estrarre automaticamente i dati tecnici del trasformatore</p>
      </header>

      <TransformerExtractor />

      <footer className="app-footer">
        <p>Supporta file PDF e TXT | Estrazione automatica tramite pattern matching</p>
      </footer>
    </div>
  )
}

export default App
