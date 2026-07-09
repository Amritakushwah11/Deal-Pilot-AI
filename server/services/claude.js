import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function analyzeCall(transcript) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `You are an expert sales intelligence engine.

Analyze this sales call transcript and return ONLY valid JSON, no extra text:
{
  "intentScore": 87,
  "dealHealth": "Good",
  "mainConcern": "Pricing",
  "detectedConcerns": [
    { "type": "Pricing Objection", "quote": "exact customer quote", "timestamp": "08:42" }
  ],
  "recommendedAction": "Offer ROI comparison sheet"
}

Transcript:
${transcript}`
    }]
  })

  const raw = response.content[0].text.replace(/```json|```/g, '').trim()
  return JSON.parse(raw)
}

export async function classifyObjections(transcript) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `Analyze this sales transcript for objections. Return ONLY valid JSON, no extra text:
{
  "objections": [
    {
      "type": "Pricing",
      "percentage": 35,
      "customerQuote": "exact quote here",
      "suggestedResponse": "suggested reply here"
    }
  ]
}

Allowed types: Pricing, Trust, Competition, Feature Gap, Timing, Budget Approval.

Transcript:
${transcript}`
    }]
  })

  const raw = response.content[0].text.replace(/```json|```/g, '').trim()
  return JSON.parse(raw)
}

export async function scoreLead(leadData) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 512,
    messages: [{
      role: 'user',
      content: `Score this sales lead. Return ONLY valid JSON, no extra text:
{
  "temperatureScore": 82,
  "closingProbability": 78,
  "signals": ["Asked for demo", "Discussed pricing"],
  "risks": ["Pricing concern raised"],
  "nextBestAction": "Send case study PDF — do not offer discount yet"
}

Lead data:
${JSON.stringify(leadData)}`
    }]
  })

  const raw = response.content[0].text.replace(/```json|```/g, '').trim()
  return JSON.parse(raw)
}

export async function generateFollowUp(leadName, context, channel) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 512,
    messages: [{
      role: 'user',
      content: `Generate a ${channel} follow-up message for ${leadName}.

Context: ${context}

${channel === 'email'
  ? 'Write a professional but warm email. First line = subject line starting with "Subject:". Then blank line. Then email body.'
  : 'Write a brief WhatsApp message, maximum 60 words. Casual but professional tone.'
}

Return ONLY the message, no extra commentary.`
    }]
  })

  return response.content[0].text.trim()
}

export async function getLostDealInsights(lostDeals) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 512,
    messages: [{
      role: 'user',
      content: `Analyze these lost deals and find patterns. Return ONLY valid JSON:
{
  "totalLost": 42,
  "reasons": [
    { "reason": "Pricing", "percentage": 35 },
    { "reason": "Slow Follow-up", "percentage": 25 },
    { "reason": "Missing Features", "percentage": 20 },
    { "reason": "Competitor Preference", "percentage": 10 },
    { "reason": "Other", "percentage": 10 }
  ],
  "topInsight": "35% deals lost due to pricing — consider flexible payment plans"
}

Lost deals data:
${JSON.stringify(lostDeals)}`
    }]
  })

  const raw = response.content[0].text.replace(/```json|```/g, '').trim()
  return JSON.parse(raw)
}

export async function coachSalesRep(repName, callTranscripts) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 512,
    messages: [{
      role: 'user',
      content: `Evaluate this sales rep's performance from their call transcripts. Return ONLY valid JSON:
{
  "repName": "${repName}",
  "strengths": ["Good product explanation", "Builds rapport quickly"],
  "weaknesses": ["Struggles with pricing objections", "Talks too much, listens too little"],
  "overallScore": 72,
  "trainingFocus": "Practice handling pricing objections with value reframing"
}

Transcripts:
${JSON.stringify(callTranscripts)}`
    }]
  })

  const raw = response.content[0].text.replace(/```json|```/g, '').trim()
  return JSON.parse(raw)
}