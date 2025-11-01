import express from "express";
import { PORT } from "./env.js";

const app = express();

app.use(express.json());

//get request
app.get('/',(req,res)=>{
  res.send('Welcome the the Subscription Tracker API')
});

app.listen(PORT, async () => {
  console.log(`Subscription Tracker API ig on PORT ${PORT} `);

});

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "No message provided" });

  try {
    // Call local LLM server
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         model: "gemma2:9b",
        prompt: message,
        max_tokens: 200  // adjust as needed
        })
    });

    const data = await response.json();

    // Assuming LLM returns { text: "..." }
    res.json({ reply: data.text });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get response from local LLM' });
  }
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});