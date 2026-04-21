import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SignIn, SignUp } from '@clerk/clerk-react'
import { useTheme } from '../context/ThemeContext'

const TESTIMONIALS = [
  {
    quote: '"Turned my vague idea into a 10x better prompt instantly"',
    author: 'Software Engineer',
  },
  {
    quote: '"Copy-paste ready prompts for ChatGPT, Claude & Gemini"',
    author: 'Content Creator',
  },
  {
    quote: '"Save and search your entire prompt history"',
    author: 'Product Manager',
  },
  {
    quote: '"50+ prompt templates across 6 categories"',
    author: 'Freelance Designer',
  },
]

function RotatingTestimonials() {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setActive((i) => (i + 1) % TESTIMONIALS.length)
        setAnimating(false)
      }, 350)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  const t = TESTIMONIALS[active]

  return (
    <div style={{ minHeight: '100px', position: 'relative' }}>
      <div
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? 'translateY(8px)' : 'translateY(0)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}
      >
        <div
          className="rounded-xl p-5"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <p
            className="text-base mb-3"
            style={{
              color: '#E2E8F0',
              fontFamily: '"Cabinet Grotesk", system-ui, sans-serif',
              fontWeight: 500,
              lineHeight: 1.5,
            }}
          >
            {t.quote}
          </p>
          <p className="text-xs font-mono" style={{ color: '#A8B4CC' }}>
            — {t.author}
          </p>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-1.5 mt-3">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all duration-200"
              style={{
                width: i === active ? '16px' : '6px',
                height: '6px',
                background: i === active ? 'var(--accent)' : 'rgba(92,107,192,0.25)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function SignInPage({ mode = 'signIn' }) {
  const { theme } = useTheme()

  const clerkAppearance = {
    variables: {
      colorPrimary: '#5C6BC0',
      colorBackground: theme === 'dark' ? '#0D1117' : '#FFFFFF',
      colorInputBackground: theme === 'dark' ? '#111827' : '#F5F7FA',
      colorInputText: theme === 'dark' ? '#E8EDF5' : '#0D1117',
      colorText: theme === 'dark' ? '#E8EDF5' : '#0D1117',
      colorTextSecondary: theme === 'dark' ? '#8898AA' : '#4A5568',
      colorNeutral: theme === 'dark' ? '#1E2A3A' : '#E2E8F0',
      borderRadius: '10px',
      fontFamily: 'system-ui, sans-serif',
    },
    elements: {
      card: {
        background: theme === 'dark' ? '#0D1117' : '#FFFFFF',
        border: `1px solid ${theme === 'dark' ? '#1E2A3A' : '#E2E8F0'}`,
        boxShadow: theme === 'dark'
          ? '0 8px 40px rgba(0,0,0,0.5)'
          : '0 4px 24px rgba(0,0,0,0.08)',
      },
      socialButtonsBlockButton: theme === 'dark' ? {
        background: '#1A2035',
        border: '1px solid #3A4560',
        opacity: '1',
      } : {},
      socialButtonsBlockButtonText: theme === 'dark' ? {
        color: '#F0F4FF',
        opacity: '1',
      } : {},
    },
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>
      {/* ── Left: Auth form ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">
        {/* Back link */}
        <Link
          to="/"
          className="flex items-center gap-1.5 mb-10 text-sm transition-colors"
          style={{ color: '#6B7A99' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#F0F4FF')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7A99')}
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Promptly
        </Link>

        {/* Heading */}
        <div className="w-full max-w-sm mb-6">
          <h1 className="font-heading font-extrabold text-2xl mb-1" style={{ color: 'var(--text-1)' }}>
            {mode === 'signIn' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-2)' }}>
            {mode === 'signIn' ? 'Sign in to your Promptly account' : 'Start enhancing prompts for free'}
          </p>
        </div>

        {/* Clerk component */}
        {mode === 'signIn' ? (
          <SignIn
            routing="path"
            path="/sign-in"
            afterSignInUrl="/dashboard"
            signUpUrl="/sign-up"
            appearance={clerkAppearance}
          />
        ) : (
          <SignUp
            routing="path"
            path="/sign-up"
            afterSignUpUrl="/dashboard"
            signInUrl="/sign-in"
            appearance={clerkAppearance}
          />
        )}

        <p className="mt-5 text-sm" style={{ color: '#6B7A99' }}>
          {mode === 'signIn' ? (
            <>
              Don&apos;t have an account?{' '}
              <Link to="/sign-up" style={{ color: 'var(--accent)' }} className="font-medium hover:underline">
                Sign up →
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link to="/sign-in" style={{ color: 'var(--accent)' }} className="font-medium hover:underline">
                Sign in →
              </Link>
            </>
          )}
        </p>
      </div>

      {/* ── Right: Feature showcase ── */}
      <div
        className="hidden lg:flex flex-1 flex-col justify-center px-14 py-12"
        style={{
          background: 'linear-gradient(160deg, #080B14 0%, #0D1120 100%)',
          borderLeft: '1px solid var(--border)',
        }}
      >
        {/* Star rating */}
        <div className="mb-8">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-mono mb-8"
            style={{
              background: 'rgba(92,107,192,0.1)',
              border: '1px solid rgba(92,107,192,0.25)',
              color: 'var(--accent)',
            }}
          >
            <span style={{ color: '#F6C90E', letterSpacing: '2px' }}>★★★★★</span>
            <span style={{ color: '#F0F4FF', fontSize: '12px' }}>Loved by prompt engineers</span>
          </div>

          <RotatingTestimonials />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {[
            { value: '10×', label: 'Better AI outputs' },
            { value: '<2s', label: 'Enhancement time' },
            { value: '50+', label: 'Prompt templates' },
            { value: '100%', label: 'Free forever' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-4"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}
            >
              <div className="font-heading text-2xl" style={{ color: '#FFFFFF', fontWeight: 700 }}>
                {s.value}
              </div>
              <div className="text-xs font-mono mt-0.5" style={{ color: '#A8B4CC' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <p className="mt-8 text-sm" style={{ color: '#A8B4CC' }}>
          Join developers, writers, and creators using Promptly.
        </p>
      </div>
    </div>
  )
}
