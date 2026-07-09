import express from 'express'
import Lead from '../models/Lead.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ temperatureScore: -1 })
    res.json(leads)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const lead = await Lead.create(req.body)
    res.status(201).json(lead)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).populate('calls')
    if (!lead) return res.status(404).json({ error: 'Lead not found' })
    res.json(lead)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(lead)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router