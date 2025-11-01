import React, { useEffect, useRef, useState } from 'react'
import MessageBubble from './MessageBubble'
import type { Message } from './MessageBubble'
import ChatInput from './ChatInput'

// ChatContainer manages the chat state and renders messages inside a
// scrollable area. It simulates a call to a local LLM API at
// `/api/local-llm` but will fall back to a placeholder response when that
// endpoint is not available.

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // helper to scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [messages])

  // Try to call local API; fallback to local simulated reply.
  const simulateLocalLLM = async (userText: string): Promise<string> => {
    // Attempt to POST to /api/local-llm. This lets the UI be ready to
    // connect to a real local LLM backend later. If fetch fails (no
    // backend), return a placeholder response after a short delay.
    try {
      const controller = new AbortController()
     
      const res = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         model: "gemma2:9b",
        prompt: userText,
        max_tokens: 200  // adjust as needed
        }),
        signal: controller.signal,
      })
    

      if (!res.ok) throw new Error('non-2xx')
      const data = await res.json()
      // expect { reply: string } shape from local LLM
      return data.reply || 'No reply from local LLM.'
    } catch (err) {
      // Fallback placeholder responses to simulate a local LLM.
     
      // small pseudo-random selection to vary responses
      const reply ="Sorry LLM not connected womp womp!"
      await new Promise((r) => setTimeout(r, 700 + Math.random() * 800))
      return reply
    }
  }

  // Handles sending a user message and obtaining a bot reply.
  const handleSend = async (text: string) => {
    const userMsg: Message = { id: String(Date.now()) + '-u', role: 'user', text }
    setMessages((m) => [...m, userMsg])
    setLoading(true)

    try {
      const botText = await simulateLocalLLM(text)
      const botMsg: Message = { id: String(Date.now()) + '-b', role: 'bot', text: botText }
      setMessages((m) => [...m, botMsg])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-transparent">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left column for LLMResponse info -- placeholder section to show local LLM responses */}
        <aside className="md:col-span-1 bg-slate-800/40 rounded-lg p-4 text-slate-200">
          <h3 className="text-sm font-semibold mb-2">Local LLM</h3>
          <p className="text-sm text-slate-300 mb-3">This area shows responses from your local model.</p>
          <div className="text-xs text-slate-400">
            Placeholder: responses here mirror the chatbot's bot messages. When you connect a real
            LLM to <code className="bg-slate-700 px-1 rounded">/api/local-llm</code> the content will
            originate from your model.
          </div>
        </aside>

        {/* Main chat area */}
        <section className="md:col-span-3 flex flex-col h-[60vh] md:h-[70vh]">
          {/* messages area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto pr-2 pb-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
            aria-live="polite"
          >
            <div className="p-4">
              {messages.length === 0 && (
                <div className="text-center text-slate-400">No messages yet — say hello 👋</div>
              )}

              {/* render messages */}
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}
            </div>
          </div>

          {/* input area */}
          <div className="mt-2">
            <ChatInput onSend={handleSend} disabled={loading} />
            {loading && <div className="text-xs text-slate-400 mt-2">Thinking…</div>}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ChatContainer
