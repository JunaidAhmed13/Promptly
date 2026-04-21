import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { Sun, Moon, Zap, Copy, Clock, ArrowRight, ChevronDown, Sparkles } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

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

const AFTER_EXAMPLE =
  'Write an engaging, well-researched 800-word blog post about the remarkable cognitive abilities of dogs — covering problem-solving, emotional intelligence, and human–dog communication. Use accessible language, cite 2–3 scientific studies, and conclude with actionable tips for owners to stimulate their dog\'s mental development.'

/* ── Logo mark ───────────────────────────────────── */
function LogoMark({ size = 22 }) {
  return <Sparkles size={size} style={{ color: '#5C6BC0' }} />
}

/* ── Landing Navbar ──────────────────────────────── */
function LandingNav() {
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 sm:px-10 h-14 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(8,11,20,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="flex items-center gap-2">
        <LogoMark />
        <span className="font-heading text-base" style={{ color: '#FFFFFF', fontWeight: 700 }}>
          Promptly
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="w-8 h-8 rounded-lg flex items-center justify-center btn-ghost"
          style={{ padding: 0 }}
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        <Link to="/sign-in" className="btn-ghost px-4 py-1.5 text-sm">
          Sign In
        </Link>
        <Link to="/sign-up" className="btn-primary px-4 py-1.5 text-sm gap-1.5">
          Get Started Free
          <ArrowRight size={13} />
        </Link>
      </div>
    </nav>
  )
}

/* ── Shuffling suggestions bar ───────────────────── */
function ShufflingSuggestions() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx((i) => (i + 1) % SUGGESTIONS.length)
        setVisible(true)
      }, 300)
    }, 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="mt-8">
      <p className="text-xs mb-2 font-mono" style={{ color: '#6B7A99' }}>
        Try it → press Tab to paste into the enhancer
      </p>
      <div
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl w-fit"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
        }}
      >
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
          e.g.
        </span>
        <span
          className="text-sm italic"
          style={{
            color: 'var(--text-2)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(4px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            fontFamily: '"Geist Mono", monospace',
            fontSize: '13px',
          }}
        >
          &ldquo;{SUGGESTIONS[idx]}&rdquo;
        </span>
      </div>
    </div>
  )
}

/* ── Before/After Card ───────────────────────────── */
function BeforeAfterCard() {
  return (
    <div
      className="rounded-2xl overflow-hidden w-full max-w-md"
      style={{
        background: 'rgba(13,17,23,0.9)',
        border: '1px solid #1E2A3A',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center gap-1.5 px-4 py-3"
        style={{ borderBottom: '1px solid #1E2A3A', background: 'rgba(17,24,39,0.8)' }}
      >
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(248,113,113,0.7)' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(250,189,47,0.7)' }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(0,229,190,0.7)' }} />
        <span className="ml-3 text-xs font-mono" style={{ color: '#6B7A99' }}>prompt-enhancer.txt</span>
      </div>

      {/* BEFORE */}
      <div className="px-5 py-4" style={{ background: 'rgba(248,113,113,0.04)', borderBottom: '1px solid #1E2A3A' }}>
        <p className="text-[10px] font-mono font-semibold uppercase tracking-widest mb-2" style={{ color: '#F87171' }}>
          — before
        </p>
        <p className="text-sm font-mono" style={{ color: '#A8B4CC', fontFamily: '"Geist Mono", monospace' }}>
          write me something about dogs
        </p>
      </div>

      {/* Divider */}
      <div
        className="flex items-center justify-center gap-2 py-2.5 px-4"
        style={{ borderBottom: '1px solid #1E2A3A', background: 'rgba(92,107,192,0.04)' }}
      >
        <span style={{ color: 'var(--accent)', fontSize: '12px' }}>✨</span>
        <span className="text-xs font-mono" style={{ color: '#6B7A99' }}>Enhanced by Promptly</span>
        <span style={{ color: 'var(--accent)', fontSize: '12px' }}>→</span>
      </div>

      {/* AFTER */}
      <div className="px-5 py-4" style={{ background: 'rgba(0,229,190,0.03)' }}>
        <p className="text-[10px] font-mono font-semibold uppercase tracking-widest mb-2" style={{ color: '#00E5BE' }}>
          + after
        </p>
        <p style={{ color: '#E8EDF5', fontFamily: '"Geist Mono", monospace', fontSize: '12px', lineHeight: '1.65' }}>
          {AFTER_EXAMPLE}
        </p>
      </div>
    </div>
  )
}

/* ── Features ────────────────────────────────────── */
function Features() {
  const items = [
    {
      Icon: Zap,
      title: 'Instant Enhancement',
      desc: 'From vague to precise in under 2 seconds. Paste it, click enhance, done.',
    },
    {
      Icon: Copy,
      title: 'One-Click Copy',
      desc: 'Copy and paste your enhanced prompt directly into any AI tool.',
    },
    {
      Icon: Clock,
      title: 'Saved History',
      desc: 'Every enhanced prompt is saved automatically. Search and reuse anytime.',
    },
  ]

  return (
    <section className="py-20 px-6 sm:px-10" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-5">
        {items.map(({ Icon, title, desc }) => (
          <div key={title} className="card p-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'var(--accent-dim)', border: '1px solid rgba(92,107,192,0.2)' }}
            >
              <Icon size={18} style={{ color: 'var(--accent)' }} />
            </div>
            <h3 className="font-heading font-bold text-base mb-1.5" style={{ color: 'var(--text-1)' }}>
              {title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── How It Works ────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { n: '01', title: 'Paste your rough prompt', desc: 'Write anything — a sentence, a note, a fragment. No formatting needed.' },
    { n: '02', title: 'AI rewrites it', desc: 'Promptly adds clarity, context, and structure your idea was missing.' },
    { n: '03', title: 'Copy and use anywhere', desc: 'Paste directly into ChatGPT, Claude, Gemini, or any AI tool.' },
  ]

  return (
    <section id="how-it-works" className="py-20 px-6 sm:px-10" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
            HOW IT WORKS
          </p>
          <h2 className="font-heading font-extrabold text-3xl" style={{ color: 'var(--text-1)' }}>
            Three steps. Better results.
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {steps.map((s) => (
            <div key={s.n} className="card p-6">
              <span
                className="block font-mono font-bold text-3xl mb-4"
                style={{ color: '#5C6BC0' }}
              >
                {s.n}
              </span>
              <h3 className="font-heading font-bold text-base mb-2" style={{ color: 'var(--text-1)' }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── About ───────────────────────────────────────── */
function About() {
  return (
    <section className="py-20 px-6 sm:px-10" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs font-mono font-semibold uppercase tracking-widest mb-6" style={{ color: '#6B7A99' }}>
          ABOUT THE BUILDER
        </p>
        <h2
          className="font-heading text-3xl sm:text-4xl mb-6"
          style={{ color: 'var(--text-1)', fontStyle: 'italic', fontWeight: 700, lineHeight: 1.2 }}
        >
          "Built by someone who kept getting bad AI outputs."
        </h2>
        <p className="text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>
          I&apos;m Maddy — Founder of AskDocs and LeadIQ.
        </p>
      </div>
    </section>
  )
}

/* ── Footer ──────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-7 px-6 sm:px-10" style={{ borderTop: '1px solid var(--border)' }}>
      <div
        className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono"
        style={{ color: 'var(--text-3)' }}
      >
        <span>Promptly © 2025 Maddy</span>
        <span className="text-center max-w-xs">
          AI outputs may not always be accurate. Always review before use.
        </span>
      </div>
    </footer>
  )
}

/* ── Landing Page ────────────────────────────────── */
export default function Landing() {
  const navigate = useNavigate()
  const { isSignedIn, isLoaded } = useAuth()

  useEffect(() => {
    if (isLoaded && isSignedIn) navigate('/dashboard', { replace: true })
  }, [isLoaded, isSignedIn, navigate])

  function scrollToHow(e) {
    e.preventDefault()
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <LandingNav />

      {/* ── Hero ── */}
      <section className="pt-14 min-h-screen flex flex-col lg:flex-row">
        {/* Left 60% */}
        <div className="flex-[3] flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-20 lg:py-0">
          <div className="max-w-xl page-enter">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium mb-7"
              style={{
                border: '1px solid rgba(92,107,192,0.35)',
                background: 'rgba(92,107,192,0.07)',
                color: 'var(--accent)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--accent)', animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite' }}
              />
              AI-Powered · Free Forever
            </div>

            {/* Headline */}
            <h1
              className="font-heading font-extrabold text-5xl sm:text-6xl mb-5"
              style={{ color: 'var(--text-1)', lineHeight: 1.06 }}
            >
              Write better<br />prompts.<br />
              <span style={{ color: 'var(--accent)' }}>Get better AI results.</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-2)', maxWidth: '440px' }}>
              Paste any rough idea. Promptly rewrites it into a precise, structured instruction
              that ChatGPT, Claude, and Gemini actually understand.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <Link
                to="/sign-up"
                className="btn-primary px-6 py-3 text-sm gap-2"
              >
                Start Enhancing Free
                <ArrowRight size={15} />
              </Link>
              <a
                href="#how-it-works"
                onClick={scrollToHow}
                className="btn-ghost px-6 py-3 text-sm"
              >
                See examples
              </a>
            </div>

            <ShufflingSuggestions />
          </div>
        </div>

        {/* Right 40% */}
        <div
          className="hidden lg:flex flex-[2] items-center justify-center px-10 py-20"
          style={{ borderLeft: '1px solid var(--border)' }}
        >
          <BeforeAfterCard />
        </div>
      </section>

      {/* Mobile: show card below hero */}
      <div className="lg:hidden px-6 pb-12">
        <BeforeAfterCard />
      </div>

      <Features />
      <HowItWorks />
      <About />
      <Footer />
    </div>
  )
}
