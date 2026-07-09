import mongoose from 'mongoose'

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  email: String,
  phone: String,
  temperatureScore: { type: Number, default: 0 },
  closingProbability: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['hot', 'warm', 'lukewarm', 'cold', 'lost', 'closed'],
    default: 'cold'
  },
  signals: [String],
  risks: [String],
  nextBestAction: String,
  objections: [{
    type: String,
    quote: String,
    suggestedResponse: String,
    detectedAt: { type: Date, default: Date.now }
  }],
  calls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Call' }],
  dealValue: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Lead', LeadSchema)