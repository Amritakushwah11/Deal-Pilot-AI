export default function DealIntel({ lead }) {
  if (!lead) return (
    <div style={{
      background: 'var(--bg-card)',
      border: '0.5px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)',
      fontSize: '13px',
      fontFamily: 'var(--font-mono)',
      minHeight: '200px',
    }}>
      Select a lead to view intel
    </div>
  )

  const prob = lead.closingProbability || 0
  const probColor =
    prob >= 70 ? 'var(--hot)' :
    prob >= 50 ? 'var(--warm)' :
    prob >= 30 ? 'var(--lukewarm)' : 'var(--cold)'

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '0.5px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        color: 'var(--text-muted)',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        marginBottom: '16px',
      }}>
        Deal Intelligence · {lead.name}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
        marginBottom: '16px',
      }}>
        <div style={{
          background: 'var(--bg-page)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 14px',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '6px',
          }}>
            Closing Probability
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            color: probColor,
            lineHeight: 1,
          }}>
            {prob}%
          </div>
        </div>

        <div style={{
          background: 'var(--bg-page)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 14px',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '6px',
          }}>
            Lead Score
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            color: 'var(--text-primary)',
            lineHeight: 1,
          }}>
            {lead.temperatureScore || 0}
          </div>
        </div>
      </div>

      {lead.signals?.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '8px',
          }}>
            Positive Signals
          </div>
          {lead.signals.map((s, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 0',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              borderBottom: '0.5px solid var(--border)',
            }}>
              <span style={{ color: 'var(--warm)', fontSize: '10px' }}>●</span>
              {s}
            </div>
          ))}
        </div>
      )}

      {lead.risks?.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '8px',
          }}>
            Risk Signals
          </div>
          {lead.risks.map((r, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 0',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              borderBottom: '0.5px solid var(--border)',
            }}>
              <span style={{ color: 'var(--lukewarm)', fontSize: '10px' }}>▲</span>
              {r}
            </div>
          ))}
        </div>
      )}

      {lead.nextBestAction && (
        <div style={{
          background: 'var(--bg-accent)',
          border: '0.5px solid #BFDBFE',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 14px',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--accent)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '5px',
          }}>
            Next Best Action
          </div>
          <div style={{
            fontSize: '13px',
            color: 'var(--text-primary)',
            lineHeight: 1.6,
          }}>
            {lead.nextBestAction}
          </div>
        </div>
      )}
    </div>
  )
}