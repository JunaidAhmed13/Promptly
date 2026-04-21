import { Link, useLocation } from 'react-router-dom'
import { UserButton } from '@clerk/clerk-react'
import { Sun, Moon, Sparkles } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const NAV_LINKS = [
  { to: '/dashboard', label: 'Enhance' },
  { to: '/history', label: 'History' },
  { to: '/library', label: 'Library' },
]

function Logo() {
  return (
    <Link to="/dashboard" className="flex items-center gap-2 select-none">
      <Sparkles size={20} style={{ color: '#5C6BC0' }} />
      <span
        className="font-heading text-sm"
        style={{ color: '#FFFFFF', fontWeight: 700 }}
      >
        Promptly
      </span>
    </Link>
  )
}

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="w-8 h-8 rounded-lg flex items-center justify-center btn-ghost transition-all"
      style={{ padding: 0 }}
    >
      {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  )
}

export default function Navbar() {
  const location = useLocation()

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-xl"
      style={{
        background: 'rgba(8,11,20,0.88)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center gap-6">
        <Logo />

        {/* Center nav — desktop */}
        <div className="hidden sm:flex items-center gap-1 mx-auto">
          {NAV_LINKS.map(({ to, label }) => {
            const active = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                className="relative px-3 py-1.5 text-sm font-heading font-medium transition-colors"
                style={{
                  color: active ? '#FFFFFF' : '#A8B4CC',
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.color = '#F0F4FF'
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.color = '#A8B4CC'
                }}
              >
                {label}
                {/* Underline */}
                <span
                  className="absolute bottom-0 left-3 right-3 rounded-full transition-all duration-200"
                  style={{
                    height: '2px',
                    background: 'var(--accent)',
                    opacity: active ? 1 : 0,
                    transform: active ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'center',
                  }}
                />
              </Link>
            )
          })}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 ml-auto sm:ml-0">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      {/* Mobile nav */}
      <div className="sm:hidden flex items-center gap-1 px-5 pb-2.5">
        {NAV_LINKS.map(({ to, label }) => {
          const active = location.pathname === to
          return (
            <Link
              key={to}
              to={to}
              className="px-3 py-1 rounded-md text-xs font-heading font-medium transition-all"
              style={{
                color: active ? '#FFFFFF' : '#A8B4CC',
                borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
              }}
            >
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
