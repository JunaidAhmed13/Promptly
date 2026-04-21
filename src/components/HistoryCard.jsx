import { useState } from 'react'
import { Copy, Check, Trash2 } from 'lucide-react'

export default function HistoryCard({ item, onDelete, addToast }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(item.enhanced).then(() => {
      setCopied(true)
      addToast?.('Copied to clipboard', 'success')
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const date = new Date(item.timestamp)
  const ts = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    + ' · '
    + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <div
      className="card flex flex-col gap-3 p-4 group transition-all"
    >
      {/* Original */}
      <div>
        <p className="text-[10px] font-heading font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--text-3)' }}>
          Original
        </p>
        <p className="text-sm line-clamp-2" style={{ color: 'var(--text-2)' }}>
          {item.original}
        </p>
      </div>

      {/* Enhanced */}
      <div>
        <p className="text-[10px] font-heading font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--mint)' }}>
          Enhanced
        </p>
        <p className="text-sm line-clamp-3 font-mono" style={{ color: 'var(--text-1)', fontFamily: '"Geist Mono", monospace', fontSize: '12px', lineHeight: '1.6' }}>
          {item.enhanced}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1" style={{ borderTop: '1px solid var(--border)' }}>
        <span className="text-xs" style={{ color: 'var(--text-3)' }}>{ts}</span>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-heading font-medium transition-all btn-ghost"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={onDelete}
            className="w-7 h-7 rounded-md flex items-center justify-center transition-all"
            style={{ color: 'var(--text-3)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--error-dim)'
              e.currentTarget.style.color = 'var(--error)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--text-3)'
            }}
            title="Delete"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}
