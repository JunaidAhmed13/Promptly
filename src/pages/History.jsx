import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import Navbar from '../components/Navbar'
import HistoryCard from '../components/HistoryCard'

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-28 text-center">
      <div
        className="w-16 h-16 rounded-xl flex items-center justify-center mb-5"
        style={{ background: 'var(--surface-raised)', border: '1px solid var(--border)' }}
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#6B7A99' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <p className="font-heading font-bold text-lg mb-1" style={{ color: 'var(--text-1)' }}>No history yet</p>
      <p className="text-sm mb-6" style={{ color: 'var(--text-2)' }}>
        Enhance your first prompt to get started.
      </p>
      <a href="/dashboard" className="btn-primary px-5 py-2.5 text-sm">
        Enhance a prompt →
      </a>
    </div>
  )
}

export default function History({ addToast }) {
  const [history, setHistory] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem('promptHistory') || '[]'))
  }, [])

  function handleDelete(id) {
    const updated = history.filter((h) => h.id !== id)
    setHistory(updated)
    localStorage.setItem('promptHistory', JSON.stringify(updated))
    addToast?.('Entry deleted', 'info')
  }

  function handleClearAll() {
    setHistory([])
    localStorage.setItem('promptHistory', '[]')
    addToast?.('History cleared', 'info')
  }

  const filtered = history.filter((h) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return h.original.toLowerCase().includes(q) || h.enhanced.toLowerCase().includes(q)
  })

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />

      <main className="max-w-5xl mx-auto px-5 py-12 page-enter">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading font-extrabold text-3xl" style={{ color: 'var(--text-1)' }}>
              Prompt History
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>
              {history.length} saved {history.length === 1 ? 'entry' : 'entries'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            {history.length > 0 && (
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#6B7A99' }} />
                <input
                  type="text"
                  placeholder="Search your history..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-4 py-2 text-sm w-64"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-1)' }}
                />
              </div>
            )}
            {history.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs font-mono transition-colors"
                style={{ color: '#6B7A99' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--error)'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6B7A99'}
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {history.length === 0 && <EmptyState />}

        {history.length > 0 && filtered.length === 0 && (
          <p className="text-center py-20 text-sm" style={{ color: 'var(--text-2)' }}>
            No results for &ldquo;{search}&rdquo;
          </p>
        )}

        {filtered.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map((item) => (
              <HistoryCard
                key={item.id}
                item={item}
                onDelete={() => handleDelete(item.id)}
                addToast={addToast}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
