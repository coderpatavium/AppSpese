import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([])
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Alimentari')
  const [paidBy, setPaidBy] = useState('Io')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  // Carica spese dal localStorage
  useEffect(() => {
    const saved = localStorage.getItem('expenses')
    if (saved) {
      setExpenses(JSON.parse(saved))
    }
  }, [])

  // Salva spese nel localStorage
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const addExpense = (e) => {
    e.preventDefault()
    if (!description || !amount) return

    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      category,
      paidBy,
      date
    }

    setExpenses([newExpense, ...expenses])
    setDescription('')
    setAmount('')
    setCategory('Alimentari')
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id))
  }

  const totals = expenses.reduce((acc, exp) => {
    if (exp.paidBy === 'Io') {
      acc.me += exp.amount
    } else {
      acc.spouse += exp.amount
    }
    acc.total += exp.amount
    return acc
  }, { me: 0, spouse: 0, total: 0 })

  const balance = totals.me - totals.spouse
  const balanceText = balance > 0
    ? `Tua moglie ti deve ${balance.toFixed(2)}€`
    : balance < 0
    ? `Tu devi a tua moglie ${Math.abs(balance).toFixed(2)}€`
    : 'Siete pari!'

  return (
    <div className="app">
      <h1>💰 Gestione Spese</h1>

      <div className="summary">
        <div className="summary-card">
          <h3>Totale Spese</h3>
          <p className="amount">{totals.total.toFixed(2)}€</p>
        </div>
        <div className="summary-card">
          <h3>Io</h3>
          <p className="amount">{totals.me.toFixed(2)}€</p>
        </div>
        <div className="summary-card">
          <h3>Mia Moglie</h3>
          <p className="amount">{totals.spouse.toFixed(2)}€</p>
        </div>
      </div>

      <div className="balance">
        <h3>{balanceText}</h3>
      </div>

      <form onSubmit={addExpense} className="expense-form">
        <h2>Aggiungi Spesa</h2>
        <input
          type="text"
          placeholder="Descrizione"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Importo"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Alimentari</option>
          <option>Casa</option>
          <option>Trasporti</option>
          <option>Salute</option>
          <option>Svago</option>
          <option>Altro</option>
        </select>
        <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
          <option>Io</option>
          <option>Mia Moglie</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Aggiungi Spesa</button>
      </form>

      <div className="expenses-list">
        <h2>Spese ({expenses.length})</h2>
        {expenses.length === 0 ? (
          <p className="no-expenses">Nessuna spesa registrata</p>
        ) : (
          expenses.map(exp => (
            <div key={exp.id} className="expense-item">
              <div className="expense-info">
                <div className="expense-header">
                  <strong>{exp.description}</strong>
                  <span className="expense-amount">{exp.amount.toFixed(2)}€</span>
                </div>
                <div className="expense-details">
                  <span className="category">{exp.category}</span>
                  <span className="paid-by">Pagato da: {exp.paidBy}</span>
                  <span className="date">{new Date(exp.date).toLocaleDateString('it-IT')}</span>
                </div>
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteExpense(exp.id)}
                title="Elimina"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
