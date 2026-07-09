import { useState } from 'react'
import { useLeads } from '../hooks/useLeads'
import { api } from '../api'

const SAMPLE_TRANSCRIPT = `Sales Rep: Hello Rahul, thanks for taking the time today.
Customer: Sure, let's keep it quick. I have a meeting at 3.
Sales Rep: Absolutely. So we've been helping fintech companies like yours reduce manual reconciliation time by 40%. 
Customer: That sounds interesting but honestly the price seems quite high for what it does.
Sales Rep: I understand. Could you share what budget range you're working with?
Customer: We have budget but I'll need to discuss this with my team and get back to you.
Sales Rep: Of course. One thing I can share is that our clients usually see ROI within 3 months.
Customer: Competitor X is offering something similar at half the price though.
Sales Rep: That's a fair point. Their solution doesn't cover the compliance module which is critical for RBI regulations.
Customer: That's actually a good point. Let me discuss internally and come back next week.`

export default function CallAnalyzer() {
  const { leads } = useLeads()
  const [transcript, setTranscript] = useState('')
  const [selectedLeadId, setSelectedLeadId] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    if (!transcript.trim()) return alert('Paste a transcript first')
    try {
      setLoading(true)
      setResult(null)
      const data = await api.analyzeCall(transcript, selectedLeadId || undefined)
      setResult(data)
    } catch (err) {
      alert('Analysis failed: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const tagColors = {
    'Pricing Objection': { bg: '#FFFBEB', text: '#D97706' },
    'Decision Delay Risk': { bg: '#EFF6FF', text: '#2563EB' },
    'Competitor Mention': { bg: '#FEF2F2', text: '#DC2626' },
    'Feature Gap': { bg: '#F5F3FF', text: '#7C3AED' },
    'Trust Issue': { bg: '#F0FDF4', text: '#16A34A' },
  }

  const labelStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: '10px',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    marginBottom: '6px',
    display: 'block',
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
          Call Analyzer
        </h1>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--text-muted)',
          marginTop: '3px',
        }}>
          Paste a call transcript to extract intent, concerns, and objections
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}>
        <div>
          <div style={{
            background: 'var(--bg-card)',
            border: '0.5px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px',
            marginBottom: '12px',
          }}>
            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Link to Lead (optional)</label>
              <select
                value={selectedLeadId}
                onChange={e => setSelectedLeadId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '0.5px solid var(--border-strong)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  fontFamily: 'var(--font-body)',
                  background: 'var(--bg-page)',
                  color: 'var(--text-primary)',
                }}
              >
                <option value="">No lead selected</option>
                {leads.map(l => (
                  <option key={l._id} value={l._id}>{l.name} — {l.company}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Call Transcript</label>
              <textarea
                value={transcript}
                onChange={e => setTranscript(e.target.value)}
                placeholder="Paste call transcript here..."
                rows={14}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '0.5px solid var(--border-strong)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  fontFamily: 'var(--font-mono)',
                  background: 'var(--bg-page)',
                  color: 'var(--text-primary)',
                  resize: 'vertical',
                  lineHeight: 1.6,
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleAnalyze}
                disabled={loading}
                style={{
                  padding: '9px 20px',
                  background: 'var(--accent)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  fontWeight: '500',
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? 'Analyzing...' : 'Analyze Call'}
              </button>
              <button
                onClick={() => setTranscript(SAMPLE_TRANSCRIPT)}
                style={{
                  padding: '9px 16px',
                  background: 'none',
                  color: 'var(--text-secondary)',
                  border: '0.5px solid var(--border-strong)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                }}
              >
                Load sample
              </button>
            </div>
          </div>
        </div>

        <div>
          {!result && !loading && (
            <div style={{
              background: 'var(--bg-card)',
              border: '0.5px dashed var(--border-strong)',
              borderRadius: 'var(--radius-lg)',
              padding: '48px 32px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
            }}>
              Analysis results will appear here
            </div>
          )}

          {loading && (
            <div style={{
              background: 'var(--bg-card)',
              border: '0.5px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '48px 32px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
            }}>
              Reading transcript...
            </div>
          )}

          {result && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                background: 'var(--bg-card)',
                border: '0.5px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                  {[
                    { label: 'Intent Score', value: `${result.callData.intentScore}%`, color: result.callData.intentScore >= 70 ? 'var(--warm)' : 'var(--lukewarm)' },
                    { label: 'Deal Health', value: result.callData.dealHealth, color: result.callData.dealHealth === 'Good' ? 'var(--warm)' : 'var(--cold)' },
                    { label: 'Main Concern', value: result.callData.mainConcern, color: 'var(--text-primary)' },
                  ].map(m => (
                    <div key={m.label} style={{
                      background: 'var(--bg-page)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '12px',
                    }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '5px' }}>{m.label}</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: m.color }}>{m.value}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <span style={labelStyle}>Detected Concerns</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {result.callData.detectedConcerns.map((c, i) => {
                      const tc = tagColors[c.type] || { bg: '#F9FAFB', text: '#6B7280' }
                      return (
                        <span key={i} style={{
                          fontSize: '11px',
                          fontFamily: 'var(--font-mono)',
                          padding: '3px 10px',
                          borderRadius: '4px',
                          background: tc.bg,
                          color: tc.text,
                          letterSpacing: '0.3px',
                        }}>
                          {c.type}
                        </span>
                      )
                    })}
                  </div>
                </div>

                {result.callData.detectedConcerns.map((c, i) => c.quote && (
                  <div key={i} style={{
                    borderLeft: '2px solid var(--border-strong)',
                    paddingLeft: '12px',
                    marginBottom: '8px',
                  }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '2px' }}>{c.type} · {c.timestamp}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>"{c.quote}"</div>
                  </div>
                ))}

                <div style={{
                  background: 'var(--bg-accent)',
                  border: '0.5px solid #BFDBFE',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 14px',
                  marginTop: '8px',
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Recommended Action</span>
                  <div style={{ fontSize: '13px', color: 'var(--text-primary)', marginTop: '3px' }}>{result.callData.recommendedAction}</div>
                </div>
              </div>

              {result.objections?.length > 0 && (
                <div style={{
                  background: 'var(--bg-card)',
                  border: '0.5px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px',
                }}>
                  <span style={labelStyle}>Objection Breakdown</span>
                  {result.objections.map((obj, i) => (
                    <div key={i} style={{
                      background: 'var(--bg-page)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '12px 14px',
                      marginBottom: '8px',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '500' }}>{obj.type}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>{obj.percentage}%</span>
                      </div>
                      <div style={{ height: '2px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden', marginBottom: '8px' }}>
                        <div style={{ height: '100%', width: `${obj.percentage}%`, background: 'var(--accent)', borderRadius: '2px' }} />
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', borderLeft: '2px solid var(--border-strong)', paddingLeft: '10px', fontStyle: 'italic', lineHeight: 1.6 }}>
                        {obj.suggestedResponse}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
