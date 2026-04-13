import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'
import { initialize } from './db.js'
import authRoutes from './routes/auth.js'

const app = express()
const PORT = process.env.PORT || 4173

// Body parsing
app.use(express.json())

// API routes
app.use('/api/auth', authRoutes)

// Serve built SPA
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.resolve(__dirname, '..', 'dist')
app.use(express.static(distPath))

// SPA catch-all — any non-API, non-static request serves index.html
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api/')) {
    res.sendFile(path.join(distPath, 'index.html'))
  } else {
    next()
  }
})

// Error handler
app.use((err, req, res, next) => {
  console.error('[server] Error:', err.message)
  res.status(500).json({ error: 'Internal server error' })
})

// Start
async function start() {
  try {
    const hasDb = process.env.DATABASE_URL || process.env.DATABASE_PRIVATE_URL || process.env.DATABASE_PUBLIC_URL
    if (hasDb) {
      await initialize()
    } else {
      console.log('[server] No DATABASE_URL — running without database (API endpoints will fail)')
    }
  } catch (err) {
    console.error('[server] Database init failed:', err.message)
    console.log('[server] Continuing without database — API endpoints will fail')
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[server] Running on port ${PORT}`)
  })
}

start()
