import { useState, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import PromptCard from '../components/PromptCard'

const MAX_CHARS = 2000

const SUGGESTIONS = [
  'write me something about dogs',
  'help me code a login page',
  'make a marketing email',
  'summarize this article for me',
  'create a workout plan',
  'write a pitch for my startup',
  'explain machine learning simply',
  'help me debug this function',
  'write a cover letter',
  'create social media captions',
  'make a study plan for exams',
  'write product descriptions',
]

function Skeleton() {
  return (
    <div>
      <div className="card overflow-hidden">
        <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="shimmer h-3 w-32 rounded" />
          <div className="shimmer h-3 w-12 rounded" />
        </div>
        <div className="px-5 py-5 space-y-2.5">
          <div className="shimmer h-3.5 w-full rounded" />
          <div className="shimmer h-3.5 w-[92%] rounded" />
          <div className="shimmer h-3.5 w-[85%] rounded" />
          <div className="shimmer h-3.5 w-[72%] rounded" />
          <div className="shimmer h-3.5 w-[60%] rounded" />
        </div>
        <div className="px-5 py-3 flex gap-2" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="shimmer h-8 w-20 rounded-md" />
          <div className="shimmer h-8 w-32 rounded-md" />
        </div>
      </div>
      <p className="text-center text-xs mt-3 font-mono" style={{ color: '#6B7A99' }}>
        Enhancing your prompt...
      </p>
    </div>
  )
}

export default function Dashboard({ addToast }) {
  const [prompt, setPrompt] = useState('')
  const [enhanced, setEnhanced] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  // Shuffling placeholder
  const [suggIdx, setSuggIdx] = useState(0)
  const [suggVisible, setSuggVisible] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setSuggVisible(false)
      setTimeout(() => {
        setSuggIdx((i) => (i + 1) % SUGGESTIONS.length)
        setSuggVisible(true)
      }, 280)
    }, 3000)
    return () => clearInterval(t)
  }, [])

  // Prefill from Library
  useEffect(() => {
    const prefill = sessionStorage.getItem('prefillPrompt')
    if (prefill) {
      setPrompt(prefill)
      sessionStorage.removeItem('prefillPrompt')
    }
  }, [])

  async function handleEnhance() {
    if (!prompt.trim()) return
    setLoading(true)
    setEnhanced('')
    setError('')
    setSaved(false)

    try {
      const res = await fetch('http://localhost:8000/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim() }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setEnhanced(data.enhanced_prompt || '')
    } catch {
      setError('Enhancement failed. Check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleSave() {
    if (!enhanced || saved) return
    const history = JSON.parse(localStorage.getItem('promptHistory') || '[]')
    localStorage.setItem('promptHistory', JSON.stringify([
      { id: Date.now(), original: prompt, enhanced, timestamp: new Date().toISOString() },
      ...history,
    ]))
    setSaved(true)
    addToast?.('Saved to history', 'success')
  }

  function handleKeyDown(e) {
    // Tab → fill with current suggestion
    if (e.key === 'Tab' && !prompt.trim()) {
      e.preventDefault()
      setPrompt(SUGGESTIONS[suggIdx])
      return
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleEnhance()
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />

      <main className="max-w-2xl mx-auto px-5 py-14 page-enter">
        {/* Header */}
        <h1 className="font-heading font-extrabold text-3xl mb-2" style={{ color: 'var(--text-1)' }}>
          Enhance a Prompt
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-2)' }}>
          Paste your rough idea and get an AI-ready instruction.
        </p>

        {/* Textarea wrapper */}
        <div
          className="rounded-xl overflow-hidden mb-3 focus-glow transition-all"
          style={{ border: '1px solid var(--border)', background: 'var(--surface)', position: 'relative' }}
        >
          {/* Animated placeholder overlay (shows when textarea empty) */}
          {!prompt && (
            <div
              className="absolute pointer-events-none select-none"
              style={{
                top: '16px',
                left: '20px',
                right: '20px',
                color: 'var(--text-3)',
                fontSize: '14px',
                fontFamily: 'system-ui, sans-serif',
                lineHeight: '1.6',
                opacity: suggVisible ? 1 : 0,
                transform: suggVisible ? 'translateY(0)' : 'translateY(3px)',
                transition: 'opacity 0.28s ease, transform 0.28s ease',
                zIndex: 1,
              }}
            >
              {SUGGESTIONS[suggIdx]}
            </div>
          )}

          <textarea
            value={prompt}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS) setPrompt(e.target.value)
            }}
            onKeyDown={handleKeyDown}
            rows={7}
            className="w-full px-5 py-4 text-sm leading-relaxed relative"
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-1)',
              fontFamily: 'system-ui, sans-serif',
              resize: 'none',
              zIndex: 2,
              caretColor: 'var(--text-1)',
            }}
            /* no placeholder attr — custom overlay handles it */
          />

          <div
            className="flex items-center justify-between px-5 py-2.5"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <span className="text-xs font-mono" style={{ color: '#6B7A99' }}>
              Ctrl+Enter to enhance
            </span>
            <span
              className="text-xs font-mono"
              style={{ color: prompt.length > MAX_CHARS * 0.9 ? 'var(--error)' : '#6B7A99' }}
            >
              {prompt.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Enhance button */}
        <button
          onClick={handleEnhance}
          disabled={loading || !prompt.trim()}
          className="btn-primary w-full py-3.5 text-sm gap-2 mb-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Enhancing...
            </>
          ) : (
            <>
              Enhance
              <ArrowRight size={15} />
            </>
          )}
        </button>

        {/* Inline error */}
        {error && (
          <p className="text-xs text-center font-mono mt-1" style={{ color: 'var(--error)' }}>
            {error}
          </p>
        )}

        {/* Result */}
        <div className="mt-6">
          {loading && <Skeleton />}
          {!loading && enhanced && (
            <>
              <PromptCard enhanced={enhanced} onSave={handleSave} addToast={addToast} />
              {saved && (
                <p className="text-center text-xs mt-2 font-mono" style={{ color: 'var(--mint)' }}>
                  ✓ Saved to history
                </p>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}
