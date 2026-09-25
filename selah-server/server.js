import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectDB from './config/db.js'

import authRoutes from './routes/authRoutes.js'
import galleryRoutes from './routes/galleryRoutes.js'
import menuRoutes from './routes/menuRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import settingsRoutes from './routes/settingsRoutes.js'

import { createInitialAdmin } from './controllers/authController.js'

/* =========================================
   LOAD ENVIRONMENT VARIABLES
========================================= */

dotenv.config()

/* =========================================
   CREATE EXPRESS APP
========================================= */

const app = express()

/* =========================================
   MIDDLEWARE
========================================= */

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:5176',
      'http://localhost:5177',
      'http://localhost:5178',
      'http://localhost:5179',
      'https://selah-murex.vercel.app',
    ],
    credentials: true,
  }),
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* =========================================
   HEALTH CHECK
========================================= */

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Selah Coffee API is running ☕',
  })
})

/* =========================================
   API ROUTES
========================================= */

app.use('/api/auth', authRoutes)

app.use('/api/gallery', galleryRoutes)

app.use('/api/menu', menuRoutes)

app.use('/api/messages', messageRoutes)

app.use('/api/settings', settingsRoutes)

/* =========================================
   ERROR HANDLER
========================================= */

app.use((error, req, res, next) => {
  console.error(error)

  if (error.message) {
    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }

  res.status(500).json({
    success: false,
    message: 'Something went wrong',
  })
})

/* =========================================
   START SERVER
========================================= */

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    await connectDB()

    await createInitialAdmin()

    app.listen(PORT, () => {
      console.log('')
      console.log('====================================')
      console.log('       SELAH COFFEE SERVER')
      console.log('====================================')
      console.log(`Server: http://localhost:${PORT}`)
      console.log(`API:    http://localhost:${PORT}/api`)
      console.log('====================================')
      console.log('')
    })
  } catch (error) {
    console.error('Server startup failed')
    console.error(error.message)
    process.exit(1)
  }
}

startServer()