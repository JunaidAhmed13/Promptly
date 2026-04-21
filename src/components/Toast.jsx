import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

const CONFIG = {
  success: {
    icon: CheckCircle,
    style: { borderColor: 'rgba(0,229,190,0.3)', background: 'rgba(0,229,190,0.06)', color: 'var(--mint)' },
  },
  error: {
    icon: XCircle,
    style: { borderColor: 'rgba(248,113,113,0.3)', background: 'rgba(248,113,113,0.06)', color: 'var(--error)' },
  },
  info: {
    icon: Info,
    style: { borderColor: 'rgba(79,142,247,0.3)', background: 'rgba(79,142,247,0.06)', color: 'var(--accent)' },
  },
}

function Toast({ message, type = 'info', onClose }) {
  const [visible, setVisible] = useState(false)
  const { icon: Icon, style } = CONFIG[type] || CONFIG.info

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 10)
    const hide = setTimeout(() => { setVisible(false); setTimeout(onClose, 280) }, 3200)
    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [onClose])

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl border pointer-events-auto min-w-[260px] max-w-xs transition-all duration-300"
      style={{
        ...style,
        backdropFilter: 'blur(12px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        background: `${style.background}, var(--surface)`,
      }}
    >
      <Icon size={15} />
      <span className="text-sm font-body flex-1" style={{ color: 'var(--text-1)' }}>
        {message}
      </span>
      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 280) }}
        style={{ color: 'var(--text-3)' }}
        className="transition-colors hover:text-[var(--text-1)]"
      >
        <X size={13} />
      </button>
    </div>
  )
}

export function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <Toast key={t.id} message={t.message} type={t.type} onClose={() => removeToast(t.id)} />
      ))}
    </div>
  )
}
