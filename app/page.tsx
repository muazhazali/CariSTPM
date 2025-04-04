import { Search } from "lucide-react"
import SchoolList from "@/components/school-list"
import FilterPanel from "@/components/filter-panel"
import ComparisonBanner from "@/components/comparison-banner"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Form 6 (STPM) School</h1>
          <p className="text-xl md:text-2xl mb-8">Compare schools, explore subjects, and get personalized guidance</p>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for schools by name..."
              className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Panel */}
          <div className="w-full md:w-1/4">
            <FilterPanel />
          </div>

          {/* School List */}
          <div className="w-full md:w-3/4">
            <SchoolList />
          </div>
        </div>
      </div>

      {/* Comparison Banner */}
      <ComparisonBanner />
    </main>
  )
}

