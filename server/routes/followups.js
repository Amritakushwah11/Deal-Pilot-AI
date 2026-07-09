import express from 'express'
import { generateFollowUp } from '../services/claude.js'
import Lead from '../models/Lead.js'

const router = express.Router()

router.post('/generate', async (req, res) => {
  try {
    const { leadId, channel } = req.body
    const lead = await Lead.findById(leadId).populate('calls')
    if (!lead) return res.status(404).json({ error: 'Lead not found' })

    const context = `
      Lead: ${lead.name} from ${lead.company}
      Temperature Score: ${lead.temperatureScore}
      Main risks: ${lead.risks.join(', ')}
      Next best action: ${lead.nextBestAction}
      Last call concern: ${lead.calls[lead.calls.length - 1]?.mainConcern || 'N/A'}
    `

    const message = await generateFollowUp(lead.name, context, channel)
    res.json({ message, leadName: lead.name, channel })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router