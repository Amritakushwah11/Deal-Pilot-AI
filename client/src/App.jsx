import './index.css'

export default function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{
        width: '200px',
        background: 'var(--bg-secondary)',
        borderRight: '0.5px solid var(--border)',
        padding: '20px 0'
      }}>
        <div style={{ padding: '0 16px 20px', borderBottom: '0.5px solid var(--border)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '16px' }}>DealPilot</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px', letterSpacing: '0.5px' }}>SALES INTELLIGENCE</div>
        </div>
        <nav style={{ marginTop: '12px' }}>
          {['Dashboard', 'Leads', 'Call Analyzer', 'Objections', 'Follow-ups'].map(item => (
            <div key={item} style={{
              padding: '9px 16px',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}>{item}</div>
          ))}
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '24px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>Pipeline Overview</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Setup working. Ab features banate hain.</p>
      </main>
    </div>
  )
}