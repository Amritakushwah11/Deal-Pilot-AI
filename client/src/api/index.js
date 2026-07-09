const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(err.error || 'Request failed')
  }
  return res.json()
}

export const api = {
  // Leads
  getLeads: () => request('/api/leads'),
  createLead: (data) => request('/api/leads', { method: 'POST', body: JSON.stringify(data) }),
  getLead: (id) => request(`/api/leads/${id}`),
  updateLead: (id, data) => request(`/api/leads/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  // Analyze
  analyzeCall: (transcript, leadId) =>
    request('/api/analyze/call', { method: 'POST', body: JSON.stringify({ transcript, leadId }) }),
  scoreLead: (leadData) =>
    request('/api/analyze/lead-score', { method: 'POST', body: JSON.stringify(leadData) }),
  getLostDealInsights: () =>
    request('/api/analyze/lost-deals', { method: 'POST' }),
  coachRep: (repName, leadIds) =>
    request('/api/analyze/coach', { method: 'POST', body: JSON.stringify({ repName, leadIds }) }),

  // Follow-ups
  generateFollowUp: (leadId, channel) =>
    request('/api/followups/generate', { method: 'POST', body: JSON.stringify({ leadId, channel }) }),
}
