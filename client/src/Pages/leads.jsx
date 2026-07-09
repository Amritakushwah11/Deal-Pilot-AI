import { useState } from 'react'
import { useLeads } from '../hooks/useLeads'
import { api } from '../api'

export default function Leads() {
  const { leads, loading, refetch } = useLeads()
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', dealValue: '' })
  const [adding, setAdding] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const inputStyle = {
    width: '100%',
    padding: '9px 12px',
    border: '0.5px solid var(--border-strong)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '13px',
    fontFamily: 'var(--font-body)',
    background: 'var(--bg-page)',
    color: 'var(--text-primary)',
    outline: 'none',
  }

  const handleAdd = async () => {
    if (!form.name || !form.company) return alert('Name and company are required')
    try {
      setAdding(true)
      await api.createLead({ ...form, dealValue: Number(form.dealValue) || 0 })
      setForm({ name: '', company: '', email: '', phone: '', dealValue: '' })
      setShowForm(false)
      await refetch()
    } catch (err) {
      alert('Failed: ' + err.message)
    } finally {
      setAdding(false)
    }
  }

  return (
    <div style={{ padding: '28px 32px', height: '100%', overflowY: 'auto' }}>
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: '24px',
      }}>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            fontWeight: 400,
            letterSpacing: '-0.3px',
          }}>
            Leads
          </h1>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-muted)',
            marginTop: '3px',
          }}>
            {leads.length} leads in pipeline
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '8px 18px',
            background: 'var(--accent)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            fontSize: '13px',
            fontWeight: '500',
          }}
        >
          {showForm ? 'Cancel' : '+ Add Lead'}
        </button>
      </div>

      {showForm && (
        <div style={{
          background: 'var(--bg-card)',
          border: '0.5px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
          marginBottom: '20px',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            marginBottom: '16px',
          }}>
            New Lead
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Name *</label>
              <input style={inputStyle} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Rahul Kapoor" />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Company *</label>
              <input style={inputStyle} value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} placeholder="Finova Tech" />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Email</label>
              <input style={inputStyle} value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="rahul@finova.com" />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Deal Value (₹)</label>
              <input style={inputStyle} type="number" value={form.dealValue} onChange={e => setForm(p => ({ ...p, dealValue: e.target.value }))} placeholder="500000" />
            </div>
          </div>
          <button
            onClick={handleAdd}
            disabled={adding}
            style={{
              padding: '9px 20px',
              background: 'var(--accent)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              fontWeight: '500',
              opacity: adding ? 0.6 : 1,
            }}
          >
            {adding ? 'Adding...' : 'Add Lead'}
          </button>
        </div>
      )}

      {loading ? (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>Loading...</div>
      ) : (
        <div style={{
          background: 'var(--bg-card)',
          border: '0.5px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '0.5px solid var(--border)' }}>
                {['Name', 'Company', 'Score', 'Close Prob.', 'Deal Value', 'Status'].map(h => (
                  <th key={h} style={{
                    padding: '10px 16px',
                    textAlign: 'left',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontWeight: '500',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, i) => (
                <tr key={lead._id} style={{
                  borderBottom: i < leads.length - 1 ? '0.5px solid var(--border)' : 'none',
                }}>
                  <td style={{ padding: '11px 16px', fontSize: '13px', fontWeight: '500' }}>{lead.name}</td>
                  <td style={{ padding: '11px 16px', fontSize: '13px', color: 'var(--text-secondary)' }}>{lead.company}</td>
                  <td style={{ padding: '11px 16px', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: '500', color: lead.temperatureScore >= 80 ? 'var(--hot)' : lead.temperatureScore >= 60 ? 'var(--warm)' : 'var(--lukewarm)' }}>{lead.temperatureScore || '—'}</td>
                  <td style={{ padding: '11px 16px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-secondary)' }}>{lead.closingProbability ? `${lead.closingProbability}%` : '—'}</td>
                  <td style={{ padding: '11px 16px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-secondary)' }}>{lead.dealValue ? `₹${lead.dealValue.toLocaleString('en-IN')}` : '—'}</td>
                  <td style={{ padding: '11px 16px' }}>
                    <span style={{
                      fontSize: '10px',
                      fontFamily: 'var(--font-mono)',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: lead.status === 'hot' ? '#EFF6FF' : lead.status === 'warm' ? '#F0FDF4' : '#F9FAFB',
                      color: lead.status === 'hot' ? 'var(--hot)' : lead.status === 'warm' ? 'var(--warm)' : 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}>
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {leads.length === 0 && (
            <div style={{
              padding: '40px',
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--text-muted)',
            }}>
              No leads yet. Add your first one above.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
