/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { PORT } from './config'
import bodyParser from 'body-parser'
import cors from 'cors'
import { convertToPDF } from './actions/convert'

// App Declaration
const app = express()

// Settings
app.set('port', PORT !== '' ? PORT : 4000)

// Middlewares
app.use(cors())
app.use(bodyParser.text({ type: 'text/html' }))

// Routes
app.get('/ping', (_req, res) => {
  res.status(200).json({ test: 'todo piola en el microservicio' })
})

app.post('/convert', async (req, res) => {
  console.log('HTML Body: ', req.body)
  const pdf = await convertToPDF(req.body)
  console.log('Converted PDF Buffer: ', pdf)
  return res.set('content-type', 'application/pdf').send(pdf)
})

// Starting the server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})
