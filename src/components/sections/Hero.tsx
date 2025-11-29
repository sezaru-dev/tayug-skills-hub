import React from "react"
import SearchBar from "../custom/SearchBar"

export default function Hero() {
  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-20">
        
        {/* Highlight Tag */}
        <div className="text-sm px-3 py-1 rounded-full bg-blue-600/10 text-blue-700 mb-4">
          Find Local Professionals Faster
        </div>

        {/* Heading */}
        <h1 className="text-5xl max-w-4xl font-semibold text-foreground">
          Your One-Stop Hub to Find Skilled Professionals
        </h1>

        {/* Subtext */}
        <p className="text-lg text-muted-foreground mt-3 max-w-xl">
          Easily search, hire, and collaborate with Tayug’s best local talent.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-2xl mt-6">
          <SearchBar placeholder="What skills are you looking for?" />
        </div>

      </div>
    </section>
  )
}
