import { useState } from 'react'
import { Copy, Check, BookmarkPlus } from 'lucide-react'

export default function PromptCard({ enhanced, onSave, addToast }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(enhanced).then(() => {
      setCopied(true)
      addToast?.('Copied to clipboard', 'success')
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const wordCount = enhanced.trim().split(/\s+/).filter(Boolean).length

  return (
    <div className="card animate-slide-up" style={{ overflow: 'hidden' }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: 'var(--mint)' }}
          />
          <span className="text-xs font-heading font-semibold uppercase tracking-widest" style={{ color: 'var(--mint)' }}>
            Enhanced Prompt
          </span>
        </div>
        <span className="text-xs" style={{ color: 'var(--text-3)' }}>
          {wordCount} words
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <p className="font-mono text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-1)', fontFamily: '"Geist Mono", monospace' }}>
          {enhanced}
        </p>
      </div>

      {/* Footer */}
      <div
        className="flex items-center gap-2 px-5 py-3 flex-wrap"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-heading font-medium transition-all btn-ghost"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? 'Copied ✓' : 'Copy'}
        </button>

        <button
          onClick={onSave}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-heading font-medium transition-all btn-ghost"
        >
          <BookmarkPlus size={13} />
          Save to History
        </button>
      </div>

      {/* Disclaimer */}
      <p
        className="px-5 pb-3 text-xs italic"
        style={{ color: 'var(--text-3)' }}
      >
        AI may make mistakes — review before using.
      </p>
    </div>
  )
}
