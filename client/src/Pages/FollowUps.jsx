import { useState } from 'react'
import { useLeads } from '../hooks/useLeads'
import { api } from '../api'

export default function FollowUps() {
  const { leads } = useLeads()
  const [selectedLeadId, setSelectedLeadId] = useState('')
  const [channel, setChannel] = useState('email')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!selectedLeadId) return alert('Select a lead first')
    try {
      setLoading(true)
      setResult(null)
      const data = await api.generateFollowUp(selectedLeadId, channel)
      setResult(data)
    } catch (err) {
      alert('Generation failed: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result.message)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const selectStyle = {
    padding: '8px 12px',
    border: '0.5px solid var(--border-strong)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '13px',
    fontFamily: 'var(--font-body)',
    background: 'var(--bg-page)',
    color: 'var(--text-primary)',
    outline: 'none',
  }

  return (
    <div style={{ padding: '28px 32px', height: '100%', overflowY: 'auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '24px',
          fontWeight: 400,
          letterSpacing: '-0.3px',
        }}>
          Follow-up Generator
        </h1>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--text-muted)',
          marginTop: '3px',
        }}>
          AI-written follow-ups tailored to each lead's context
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '20px', alignItems: 'start' }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '0.5px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
        }}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              display: 'block',
              marginBottom: '6px',
            }}>
              Select Lead
            </label>
            <select
              value={selectedLeadId}
              onChange={e => setSelectedLeadId(e.target.value)}
              style={{ ...selectStyle, width: '100%' }}
            >
              <option value="">Choose a lead...</option>
              {leads.map(l => (
                <option key={l._id} value={l._id}>{l.name} — {l.company}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              display: 'block',
              marginBottom: '8px',
            }}>
              Channel
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['email', 'whatsapp'].map(ch => (
                <button
                  key={ch}
                  onClick={() => setChannel(ch)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    border: '0.5px solid',
                    borderColor: channel === ch ? 'var(--accent)' : 'var(--border-strong)',
                    borderRadius: 'var(--radius-sm)',
                    background: channel === ch ? 'var(--bg-accent)' : 'none',
                    color: channel === ch ? 'var(--accent)' : 'var(--text-secondary)',
                    fontSize: '12px',
                    fontWeight: channel === ch ? '500' : '400',
                    textTransform: 'capitalize',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                  }}
                >
                  {ch === 'email' ? 'Email' : 'WhatsApp'}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              background: 'var(--accent)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              fontWeight: '500',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Writing...' : 'Generate Message'}
          </button>
        </div>

        <div>
          {!result && !loading && (
            <div style={{
              background: 'var(--bg-card)',
              border: '0.5px dashed var(--border-strong)',
              borderRadius: 'var(--radius-lg)',
              padding: '60px 32px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
            }}>
              Select a lead and channel, then generate
            </div>
          )}

          {loading && (
            <div style={{
              background: 'var(--bg-card)',
              border: '0.5px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '60px 32px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
            }}>
              Composing message...
            </div>
          )}

          {result && (
            <div style={{
              background: 'var(--bg-card)',
              border: '0.5px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  {result.channel} · {result.leadName}
                </div>
                <button
                  onClick={handleCopy}
                  style={{
                    padding: '6px 14px',
                    background: copied ? '#F0FDF4' : 'none',
                    color: copied ? 'var(--warm)' : 'var(--text-secondary)',
                    border: '0.5px solid var(--border-strong)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div style={{
                fontSize: '13px',
                color: 'var(--text-primary)',
                lineHeight: 1.8,
                whiteSpace: 'pre-wrap',
                fontFamily: channel === 'whatsapp' ? 'var(--font-body)' : 'var(--font-mono)',
              }}>
                {result.message}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
