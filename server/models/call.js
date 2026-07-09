import mongoose from 'mongoose'

const CallSchema = new mongoose.Schema({
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  transcript: { type: String, required: true },
  intentScore: Number,
  dealHealth: String,
  mainConcern: String,
  detectedConcerns: [{
    type: String,
    quote: String,
    timestamp: String
  }],
  recommendedAction: String,
  objections: [{
    type: String,
    percentage: Number,
    customerQuote: String,
    suggestedResponse: String
  }],
  analyzedAt: { type: Date, default: Date.now }
})

export default mongoose.model('Call', CallSchema)