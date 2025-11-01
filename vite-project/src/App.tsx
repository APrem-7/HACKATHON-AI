import React, { useEffect } from 'react'
import SearchBar from './components/SearchBar'
import ChatContainer from './components/ChatContainer'

// Root app component. Sets dark mode class on the <html> element and
// renders the SearchBar and ChatContainer components.
const App: React.FC = () => {
  // Ensure the app opens in dark mode by default. Tailwind is configured
  // with `darkMode: ['class']` so adding the `dark` class to the html
  // element enables dark theme styling across the site.
  useEffect(() => {
    document.documentElement.classList.add('dark')
    // Optional: return a cleanup if you later want to remove it
    return () => {
      // keep dark mode by default; remove only if you implement a toggle
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* App container: responsive centered layout */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search bar at the top */}
        <SearchBar />

        {/* Chat container below search bar */}
        <div className="mt-6">
          <ChatContainer />
        </div>
      </div>
    </div>
  )
}

export default App
