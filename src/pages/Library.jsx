import { useNavigate } from 'react-router-dom'
import { PenLine, Code2, Megaphone, Palette, Search, Briefcase } from 'lucide-react'
import Navbar from '../components/Navbar'

const CATEGORIES = [
  {
    Icon: PenLine,
    title: 'Writing',
    description: 'Blog posts, emails, stories, and essays.',
    prompts: [
      'Write a compelling blog post intro about remote work productivity',
      'Draft a professional apology email to a client for a delayed project',
      'Write a short story opening set in a dystopian future city',
      'Create a LinkedIn post announcing a new product launch',
      'Write a persuasive essay arguing for a 4-day work week',
    ],
  },
  {
    Icon: Code2,
    title: 'Coding',
    description: 'Code reviews, debugging, and architecture.',
    prompts: [
      'Review this React component for performance issues and best practices',
      'Write unit tests for a function that validates email addresses',
      'Explain this Python code to a beginner developer',
      'Debug this async JavaScript function that isn\'t returning data',
      'Create a REST API endpoint in FastAPI for user authentication',
    ],
  },
  {
    Icon: Megaphone,
    title: 'Marketing',
    description: 'Ad copy, landing pages, and social campaigns.',
    prompts: [
      'Write a Facebook ad for a productivity app targeting busy professionals',
      'Create a landing page headline for a SaaS product focused on saving time',
      'Write a cold outreach email for a freelance web developer',
      'Create 5 Instagram caption variations for a coffee brand',
      'Write a product description for a minimalist leather wallet',
    ],
  },
  {
    Icon: Palette,
    title: 'Design',
    description: 'UI/UX briefs, visual concepts, and style guides.',
    prompts: [
      'Describe a modern dashboard UI design system for a fintech app',
      'Write a design brief for a minimalist logo for a wellness startup',
      'Create a color palette description for a luxury fashion brand',
      'Write UX copy for a mobile onboarding flow with 3 steps',
    ],
  },
  {
    Icon: Search,
    title: 'Research',
    description: 'Literature reviews, summaries, and analysis.',
    prompts: [
      'Summarize recent advances in large language model alignment research',
      'Compare pros and cons of SQL vs NoSQL for a high-traffic web app',
      'Explain the key differences between transformer and diffusion models',
      'Write a literature review outline on AI bias in hiring algorithms',
    ],
  },
  {
    Icon: Briefcase,
    title: 'Business',
    description: 'Strategy, pitch decks, and planning docs.',
    prompts: [
      'Write an executive summary for a Series A pitch deck for a B2B SaaS',
      'Create a 90-day onboarding plan template for a new sales hire',
      'Write a SWOT analysis for a food delivery startup entering a new city',
      'Draft a client proposal for a 3-month social media management contract',
    ],
  },
]

export default function Library({ addToast }) {
  const navigate = useNavigate()

  function loadPrompt(text) {
    sessionStorage.setItem('prefillPrompt', text)
    addToast?.('Prompt loaded — ready to enhance', 'success')
    navigate('/dashboard')
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />

      <main className="max-w-5xl mx-auto px-5 py-12 page-enter">
        <h1 className="font-heading font-extrabold text-3xl mb-2" style={{ color: 'var(--text-1)' }}>
          Prompt Templates
        </h1>
        <p className="text-sm mb-10" style={{ color: 'var(--text-2)' }}>
          Click any example to auto-fill the enhancer.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map(({ Icon, title, description, prompts }) => (
            <div key={title} className="card p-5 flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'var(--accent-dim)',
                    border: '1px solid rgba(92,107,192,0.18)',
                  }}
                >
                  <Icon size={16} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm" style={{ color: 'var(--text-1)' }}>
                    {title}
                  </h3>
                  <p className="text-xs" style={{ color: 'var(--text-3)' }}>{description}</p>
                </div>
              </div>

              {/* Prompt chips */}
              <div className="flex flex-col gap-1.5">
                {prompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => loadPrompt(p)}
                    className="text-left px-3 py-2.5 rounded-lg text-xs leading-relaxed transition-all duration-150"
                    style={{
                      background: 'var(--surface-raised)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-2)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(92,107,192,0.4)'
                      e.currentTarget.style.color = 'var(--text-1)'
                      e.currentTarget.style.background = 'var(--accent-dim)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.color = 'var(--text-2)'
                      e.currentTarget.style.background = 'var(--surface-raised)'
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
