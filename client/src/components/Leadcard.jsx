function ScoreBar({ score }) {
  const color =
    score >= 80 ? 'var(--hot)' :
    score >= 60 ? 'var(--warm)' :
    score >= 40 ? 'var(--lukewarm)' : 'var(--cold)'

  return (
    <div style={{ marginTop: '10px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '5px',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          color: 'var(--text-muted)',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}>
          Lead Score
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          fontWeight: '500',
          color,
        }}>
          {score}
        </span>
      </div>
      <div style={{
        height: '3px',
        background: 'var(--border)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${score}%`,
          background: color,
          borderRadius: '2px',
          transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }} />
      </div>
    </div>
  )
}

export default function LeadCard({ lead, onClick, isSelected }) {
  const initials = lead.name.split(' ').map(n => n[0]).join('').slice(0, 2)

  const statusColors = {
    hot: { bg: '#EFF6FF', text: '#2563EB' },
    warm: { bg: '#F0FDF4', text: '#16A34A' },
    lukewarm: { bg: '#FFFBEB', text: '#D97706' },
    cold: { bg: '#FEF2F2', text: '#DC2626' },
    lost: { bg: '#F9FAFB', text: '#6B7280' },
    closed: { bg: '#F0FDF4', text: '#15803D' },
  }

  const sc = statusColors[lead.status] || statusColors.cold

  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--bg-card)',
        border: isSelected
          ? '0.5px solid var(--accent)'
          : '0.5px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '14px 16px',
        cursor: 'pointer',
        transition: 'border-color 0.15s',
        marginBottom: '8px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'var(--bg-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: '500',
            color: 'var(--accent)',
            flexShrink: 0,
          }}>
            {initials}
          </div>
          <div>
            <div style={{
              fontSize: '13px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              lineHeight: 1.3,
            }}>
              {lead.name}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-muted)',
              marginTop: '1px',
            }}>
              {lead.company}
            </div>
          </div>
        </div>
        <span style={{
          fontSize: '10px',
          fontFamily: 'var(--font-mono)',
          padding: '3px 8px',
          borderRadius: '4px',
          background: sc.bg,
          color: sc.text,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          flexShrink: 0,
        }}>
          {lead.status}
        </span>
      </div>
      <ScoreBar score={lead.temperatureScore || 0} />
    </div>
  )
}