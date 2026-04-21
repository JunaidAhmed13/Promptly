import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Library from './pages/Library'
import SignInPage from './pages/SignInPage'
import { ToastContainer } from './components/Toast'

function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth()
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
      </div>
    )
  }
  if (!isSignedIn) return <Navigate to="/" replace />
  return children
}

let toastId = 0

export default function App() {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info') => {
    const id = ++toastId
    setToasts((prev) => [...prev, { id, message, type }])
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <BrowserRouter>
      {/* Aurora glow – always rendered, hidden in light mode via CSS */}
      <div className="aurora-wrap" />

      <Routes>
        <Route path="/" element={<Landing addToast={addToast} />} />
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignInPage mode="signUp" />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard addToast={addToast} /></ProtectedRoute>}
        />
        <Route
          path="/history"
          element={<ProtectedRoute><History addToast={addToast} /></ProtectedRoute>}
        />
        <Route
          path="/library"
          element={<ProtectedRoute><Library addToast={addToast} /></ProtectedRoute>}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </BrowserRouter>
  )
}
