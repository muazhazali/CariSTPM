import { Search } from "lucide-react"
import SchoolList from "@/components/school-list"
import FilterPanel from "@/components/filter-panel"
import ComparisonBanner from "@/components/comparison-banner"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white w-full flex justify-center px-4 py-8 md:py-16">
        <div className="container max-w-6xl flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">Find Your Perfect Form 6 (STPM) School</h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 px-2">Compare schools, explore subjects, and get personalized guidance</p>

          {/* Search Bar */}
          <div className="relative w-full max-w-2xl px-2">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for schools by name..."
              className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base md:text-lg"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container max-w-6xl px-4 py-6 md:py-8 w-full">
        <div className="flex flex-col lg:flex-row gap-6 justify-center">
          {/* Filter Panel */}
          <div className="w-full lg:w-1/4 sticky top-4">
            <FilterPanel />
          </div>

          {/* School List */}
          <div className="w-full lg:w-3/4">
            <SchoolList />
          </div>
        </div>
      </div>

      {/* Comparison Banner */}
      <ComparisonBanner />
    </main>
  )
}

