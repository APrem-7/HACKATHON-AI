import React from 'react'

// MessageBubble renders a single message. It supports two roles:
// - 'user': right-aligned, blue background.
// - 'bot': left-aligned, gray background.

export type Message = {
  id: string
  role: 'user' | 'bot'
  text: string
}

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === 'user'

  return (
    <div
      // flex container to align messages left or right
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
    >
      <div
        // bubble styles: different backgrounds for user and bot, smooth transition
        className={`max-w-[80%] px-4 py-2 rounded-lg shadow-sm transform transition-all duration-200 ease-in-out
          ${isUser ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-100 rounded-bl-none'}`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  )
}

export default MessageBubble
