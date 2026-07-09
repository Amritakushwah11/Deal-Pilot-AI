import { useState } from 'react'
import { useLeads } from '../hooks/useLeads'
import LeadCard from '../components/LeadCard'
import DealIntel from '../components/DealIntel'
import { api } from '../api'

function MetricTile({ label, value, sub, accent }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '0.5px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: '16px 18px',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.8px',
        marginBottom: '8px',
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '26px',
        color: accent || 'var(--text-primary)',
        lineHeight: 1,
        letterSpacing: '-0.5px',
      }}>
        {value}
      </div>
      {sub && (
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--text-muted)',
          marginTop: '5px',
        }}>
          {sub}
        </div>
      )}
    </div>
  )
}

export default function Dashboard({ onNavigate }) {
  const { leads, loading, error, refetch } = useLeads()
  const [selectedLead, setSelectedLead] = useState(null)
  const [scoring, setScoring] = useState(false)

  const hotLeads = leads.filter(l => l.status === 'hot').length
  const expectedRevenue = leads.reduce((sum, l) => {
    return sum + ((l.dealValue || 0) * (l.closingProbability || 0) / 100)
  }, 0)

  const handleScoreLead = async (lead) => {
    try {
      setScoring(true)
      const result = await api.scoreLead({
        _id: lead._id,
        name: lead.name,
        company: lead.company,
        calls: lead.calls,
        objections: lead.objections,
      })
      await refetch()
      setSelectedLead({ ...lead, ...result })
    } catch (err) {
      alert('Scoring failed: ' + err.message)
    } finally {
      setScoring(false)
    }
  }

  if (loading) return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      color: 'var(--text-muted)',
    }}>
      Loading pipeline...
    </div>
  )

  return (
    <div style={{ padding: '28px 32px', height: '100%', overflowY: 'auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '24px',
          fontWeight: 400,
          color: 'var(--text-primary)',
          letterSpacing: '-0.3px',
        }}>
          Pipeline Overview
        </h1>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--text-muted)',
          marginTop: '3px',
          letterSpacing: '0.3px',
        }}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        marginBottom: '24px',
      }}>
        <MetricTile label="Active Leads" value={leads.length} sub="total in pipeline" />
        <MetricTile label="Hot Leads" value={hotLeads} sub="score above 80" accent="var(--accent)" />
        <MetricTile
          label="Expected Revenue"
          value={`₹${(expectedRevenue / 100000).toFixed(1)}L`}
          sub="weighted by probability"
        />
        <MetricTile label="Avg Score" value={
          leads.length
            ? Math.round(leads.reduce((s, l) => s + (l.temperatureScore || 0), 0) / leads.length)
            : 0
        } sub="across pipeline" />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.4fr',
        gap: '16px',
        alignItems: 'start',
      }}>
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
            }}>
              Lead Temperature
            </span>
            <button
              onClick={() => onNavigate('leads')}
              style={{
                fontSize: '12px',
                color: 'var(--accent)',
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
              }}
            >
              Add lead →
            </button>
          </div>

          {leads.length === 0 ? (
            <div style={{
              background: 'var(--bg-card)',
              border: '0.5px dashed var(--border-strong)',
              borderRadius: 'var(--radius-md)',
              padding: '32px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '13px',
              fontFamily: 'var(--font-mono)',
            }}>
              No leads yet. Add your first lead.
            </div>
          ) : (
            <div style={{ maxHeight: '480px', overflowY: 'auto' }}>
              {leads.map(lead => (
                <LeadCard
                  key={lead._id}
                  lead={lead}
                  isSelected={selectedLead?._id === lead._id}
                  onClick={() => setSelectedLead(lead)}
                />
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <DealIntel lead={selectedLead} />

          {selectedLead && (
            <div style={{
              background: 'var(--bg-card)',
              border: '0.5px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px 20px',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                marginBottom: '12px',
              }}>
                Actions
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleScoreLead(selectedLead)}
                  disabled={scoring}
                  style={{
                    padding: '8px 16px',
                    background: 'var(--accent)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                    fontWeight: '500',
                    opacity: scoring ? 0.6 : 1,
                  }}
                >
                  {scoring ? 'Scoring...' : 'Score with AI'}
                </button>
                <button
                  onClick={() => onNavigate('call-analyzer')}
                  style={{
                    padding: '8px 16px',
                    background: 'none',
                    color: 'var(--text-secondary)',
                    border: '0.5px solid var(--border-strong)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                  }}
                >
                  Analyze call
                </button>
                <button
                  onClick={() => onNavigate('followups')}
                  style={{
                    padding: '8px 16px',
                    background: 'none',
                    color: 'var(--text-secondary)',
                    border: '0.5px solid var(--border-strong)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                  }}
                >
                  Generate follow-up
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
