import { useState } from 'react'
import './index.css'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Leads from './pages/Leads'
import CallAnalyzer from './pages/CallAnalyzer'
import FollowUps from './pages/FollowUps'

export default function App() {
  const [page, setPage] = useState('dashboard')

  const pages = {
    'dashboard':     <Dashboard onNavigate={setPage} />,
    'leads':         <Leads />,
    'call-analyzer': <CallAnalyzer />,
    'followups':     <FollowUps />,
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar activePage={page} onNavigate={setPage} />
      <main style={{
        flex: 1,
        overflowY: 'auto',
        background: 'var(--bg-page)',
      }}>
        {pages[page] || (
          <div style={{
            padding: '28px 32px',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--text-muted)',
          }}>Coming soon.</div>
        )}
      </main>
    </div>
  )
}