import { useState } from 'react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '▦' },
  { id: 'leads', label: 'Leads', icon: '◎' },
  { id: 'call-analyzer', label: 'Call Analyzer', icon: '◈' },
  { id: 'objections', label: 'Objections', icon: '◇' },
  { id: 'followups', label: 'Follow-ups', icon: '◉' },
  { id: 'coach', label: 'Coach AI', icon: '◐' },
]

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside style={{
      width: '210px',
      minHeight: '100vh',
      background: 'var(--bg-sidebar)',
      borderRight: '0.5px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>
      <div style={{
        padding: '24px 20px 20px',
        borderBottom: '0.5px solid var(--border)',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '19px',
          color: 'var(--text-primary)',
          letterSpacing: '-0.3px',
          lineHeight: 1.2,
        }}>
          DealPilot
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          color: 'var(--text-muted)',
          letterSpacing: '1.5px',
          marginTop: '3px',
          textTransform: 'uppercase',
        }}>
          Sales Intelligence
        </div>
      </div>

      <nav style={{ padding: '12px 10px', flex: 1 }}>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 10px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activePage === item.id ? 'var(--bg-card)' : 'transparent',
              color: activePage === item.id ? 'var(--accent)' : 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: activePage === item.id ? '500' : '400',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'background 0.1s, color 0.1s',
              marginBottom: '2px',
              borderLeft: activePage === item.id ? '2px solid var(--accent)' : '2px solid transparent',
            }}
          >
            <span style={{ fontSize: '13px', opacity: 0.7 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div style={{
        padding: '16px 20px',
        borderTop: '0.5px solid var(--border)',
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        color: 'var(--text-muted)',
      }}>
        v1.0 · Flowzinth 2025
      </div>
    </aside>
  )
}
