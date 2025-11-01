import React from 'react'

// SearchBar: full-width search input placed at the top of the page.
// Uses Tailwind classes for styling and is dark-mode friendly.
const SearchBar: React.FC = () => {
  return (
    <div className="w-full">
      {/* container to center and constrain the search bar width on large screens */}
      <div className="w-full">
        <label htmlFor="top-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <input
            id="top-search"
            name="search"
            placeholder="Search…"
            // Full-width, dark input styles using Tailwind
            className="w-full rounded-lg bg-slate-800 text-slate-100 placeholder-slate-400 px-4 py-3 shadow-sm ring-1 ring-inset ring-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>
    </div>
  )
}

export default SearchBar
