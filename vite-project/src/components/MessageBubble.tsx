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
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}> 
      {/* optional avatar column for bot/user - hidden on small screens */}
      {!isUser && (
        <div className="mr-3 hidden sm:flex items-start">
          <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-sm font-semibold text-slate-100">B</div>
        </div>
      )}

      <div
        // bubble styles: more polished look with rounded-xl, subtle shadow and transition
        className={`max-w-[80%] px-5 py-3 rounded-xl shadow-md transform transition duration-200 ease-in-out
          ${isUser ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white self-end rounded-br-2xl' : 'bg-slate-700/80 text-slate-100 border border-slate-700'}`}
      >
        <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
      </div>

      {/* optional avatar for user on the right */}
      {isUser && (
        <div className="ml-3 hidden sm:flex items-end">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-semibold text-white">Y</div>
        </div>
      )}
    </div>
  )
}

export default MessageBubble
