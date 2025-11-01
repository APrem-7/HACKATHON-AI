import React, { useState, useRef, useEffect } from 'react'

// ChatInput handles the text input area and send button.
// It calls `onSend(text)` when the user sends a message.

const ChatInput: React.FC<{ onSend: (text: string) => void; disabled?: boolean }> = ({ onSend, disabled }) => {
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  // focus input on mount for convenience
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // send the message then clear input
  const send = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    onSend(trimmed)
    setText('')
    inputRef.current?.focus()
  }

  // handle Enter key
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="mt-3">
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type your message..."
          className="flex-1 rounded-full bg-slate-800/60 text-slate-100 placeholder-slate-400 px-5 py-3 focus:outline-none ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-blue-500 transition shadow-inner"
          disabled={disabled}
        />

        <button
          onClick={send}
          disabled={disabled}
          className="inline-flex items-center px-5 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 text-white shadow-lg transition"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatInput
