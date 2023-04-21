import express from 'express'
import * as dotenv from 'dotenv'
import { PlausibleExporter } from './plausible-exporter.js'

dotenv.config()

// https://stackoverflow.com/questions/30585540/process-send-is-conditionally-defined-in-node-js
process.send = process.send || function () {};

const app = express()
const PORT = 9100

const config = {
  site_id: process.env.SITE_ID || 'default',
  api_key: process.env.API_KEY || 'empty',
  protocol: process.env.PROTOCOL || 'http',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8000,
  prefix: process.env.PREFIX || 'plausible'
}
// console.debug(config)

let worker = new PlausibleExporter(config)

app.get('/', (req, res) => {
  console.debug('/', req.params)
  res.set("Content-Type","text/plain; version=0.0.4")
    .send('nothing to see here... try /metrics/<site_id>')
})

app.get('/metrics/:site_id', async (req, res) => {
  console.debug('/metrics/:site_id', req.params)
  if (!req.params.site_id) {
    res.status(500).json({error: 'did you mean /metrics/<site_id>'})
  }
  try {
    let data = await worker.query(req.params.site_id)
    res.set("Content-Type","text/plain; version=0.0.4")
    res.send(data)
  } catch (err) {
    res.status(500).send(err)
  }
})

app.listen(PORT, (err) => {
  if (err) console.log("Error in server setup")
  console.log(`Server listening on http://localhost:${PORT}`)
  process.send('ready')
})
