import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { ThemeProvider } from './context/ThemeContext'
import App from './App'
import './index.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  // eslint-disable-next-line no-console
  console.error(
    '[PromptCraft] Missing VITE_CLERK_PUBLISHABLE_KEY in .env.local\n' +
    'Get your key at https://dashboard.clerk.com'
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY ?? ''} afterSignOutUrl="/">
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>
)
