"use client"

import { useState, useCallback } from "react"
import { Search } from "lucide-react"
import SchoolList from "@/components/school-list"
import FilterPanel from "@/components/filter-panel"
import ComparisonBanner from "@/components/comparison-banner"
import { useLanguage } from '@/context/language-context'
import { useDebounce } from '@/hooks/use-debounce'

interface Filters {
  states: string[]
  subjects: string[]
  streams: string[]
}

export default function Home() {
  const [filters, setFilters] = useState<Filters>({
    states: [],
    subjects: [],
    streams: [],
  })
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearch = useDebounce(searchQuery, 300)
  const [shouldApplyFilters, setShouldApplyFilters] = useState(false)
  const { language } = useLanguage()

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters)
  }

  const handleApplyFilters = () => {
    setShouldApplyFilters(true)
    // Reset the flag after a short delay to allow for future filter applications
    setTimeout(() => setShouldApplyFilters(false), 100)
  }

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white w-full flex justify-center px-4 py-10 md:py-14">
        <div className="container max-w-5xl flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 tracking-tight">
            {language === 'en' ? 'Find Your Perfect Form 6 (STPM) School' : 'Cari Sekolah Tingkatan 6 (STPM) Terbaik Anda'}
          </h1>
          <p className="text-md sm:text-lg md:text-xl mb-8 md:mb-10 px-2 text-blue-100 max-w-3xl">
            {language === 'en' ? 'Compare schools, explore subjects, and get personalized guidance' : 'Bandingkan sekolah, terokai subjek, dan dapatkan panduan peribadi'}
          </p>

          {/* Search Bar */}
          <div className="relative w-full max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={language === 'en' ? 'Search for schools by name...' : 'Cari sekolah mengikut nama...'}
              className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border-0 shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container max-w-6xl px-4 py-8 md:py-10 mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Panel */}
          <div className="w-full lg:w-1/4 lg:sticky lg:top-20 lg:self-start">
            <FilterPanel 
              onFilterChange={handleFilterChange}
              onApplyFilters={handleApplyFilters}
            />
          </div>

          {/* School List */}
          <div className="w-full lg:w-3/4">
            <SchoolList 
              filters={filters}
              shouldApplyFilters={shouldApplyFilters}
              searchQuery={debouncedSearch}
            />
          </div>
        </div>
      </div>

      {/* Comparison Banner */}
      <ComparisonBanner />
    </main>
  )
}

