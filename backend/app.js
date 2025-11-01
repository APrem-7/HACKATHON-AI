import express from 'express'
import fetch from 'node-fetch' // or native fetch in Node 18+
const app = express()
app.use(express.json())

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434/api/generate'

app.post('/api/local-llm', async (req, res) => {
  try {
    const payload = {
      model: req.body.model || 'gemma2:9b',
      prompt: req.body.prompt || req.body.text || '',
      stream: false,
      // copy other options from req.body if you want
    }

    const resp = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const text = await resp.text()
    // forward status (or always 200) — but forwarding preserves LLM error messages
    res.status(resp.status).send(text)
  } catch (err) {
    console.error('Proxy error:', err)
    res.status(500).json({ error: 'Proxy to local LLM failed' })
  }
})

app.listen(3001, () => console.log('Proxy server listening on http://localhost:3001'))
