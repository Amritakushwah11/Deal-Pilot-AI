import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import analyzeRoutes from './routes/analyze.js'
import leadsRoutes from './routes/leads.js'
import followupsRoutes from './routes/followups.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/analyze', analyzeRoutes)
app.use('/api/leads', leadsRoutes)
app.use('/api/followups', followupsRoutes)

app.get('/', (req, res) => res.send('DealPilot API running'))

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    })
  })
  .catch(err => console.error(err))