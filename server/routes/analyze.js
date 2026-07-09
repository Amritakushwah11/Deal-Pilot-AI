import express from 'express'
import {
  analyzeCall,
  classifyObjections,
  scoreLead,
  generateFollowUp,
  getLostDealInsights,
  coachSalesRep
} from '../services/claude.js'
import Call from '../models/Call.js'
import Lead from '../models/Lead.js'

const router = express.Router()

router.post('/call', async (req, res) => {
  try {
    const { transcript, leadId } = req.body
    if (!transcript) return res.status(400).json({ error: 'Transcript required' })

    const [callData, objectionData] = await Promise.all([
      analyzeCall(transcript),
      classifyObjections(transcript)
    ])

    const call = await Call.create({
      leadId,
      transcript,
      ...callData,
      objections: objectionData.objections
    })

    if (leadId) {
      await Lead.findByIdAndUpdate(leadId, {
        $push: { calls: call._id }
      })
    }

    res.json({ callData, objections: objectionData.objections, callId: call._id })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Analysis failed', details: err.message })
  }
})

router.post('/lead-score', async (req, res) => {
  try {
    const result = await scoreLead(req.body)

    if (req.body._id) {
      const status =
        result.temperatureScore >= 80 ? 'hot' :
        result.temperatureScore >= 60 ? 'warm' :
        result.temperatureScore >= 40 ? 'lukewarm' : 'cold'

      await Lead.findByIdAndUpdate(req.body._id, { ...result, status })
    }

    res.json(result)
  } catch (err) {
    res.status(500).json({ error: 'Scoring failed', details: err.message })
  }
})

router.post('/follow-up', async (req, res) => {
  try {
    const { leadName, context, channel } = req.body
    const message = await generateFollowUp(leadName, context, channel)
    res.json({ message })
  } catch (err) {
    res.status(500).json({ error: 'Follow-up generation failed', details: err.message })
  }
})

router.post('/lost-deals', async (req, res) => {
  try {
    const lostDeals = await Lead.find({ status: 'lost' }).lean()
    const insights = await getLostDealInsights(lostDeals)
    res.json(insights)
  } catch (err) {
    res.status(500).json({ error: 'Lost deal analysis failed', details: err.message })
  }
})

router.post('/coach', async (req, res) => {
  try {
    const { repName, leadIds } = req.body
    const calls = await Call.find({ leadId: { $in: leadIds } }).lean()
    const transcripts = calls.map(c => c.transcript)
    const coaching = await coachSalesRep(repName, transcripts)
    res.json(coaching)
  } catch (err) {
    res.status(500).json({ error: 'Coaching analysis failed', details: err.message })
  }
})

export default router