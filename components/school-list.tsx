"use client"

import { useState, useEffect } from "react"
import { fetchSchools, type School } from "@/lib/supabase"
import SchoolCard from "./school-card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SchoolList() {
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadSchools() {
      console.log('Starting to load schools...')
      try {
        const data = await fetchSchools()
        console.log('Schools loaded:', data)
        setSchools(data || [])
      } catch (err) {
        console.error('Error in loadSchools:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch schools')
      } finally {
        setLoading(false)
      }
    }

    loadSchools()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <Skeleton className="h-6 w-2/3 mb-4" />
            <Skeleton className="h-4 w-1/3 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <div className="flex gap-2 mb-3">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">Error Loading Schools</h3>
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <p className="text-sm text-red-500 dark:text-red-300 mt-2">
          Please check your connection and try again. If the problem persists, contact support.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Schools ({schools.length})</h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">Showing {schools.length} results</div>
      </div>

      {schools.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">No schools found matching your criteria.</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Try adjusting your filters or search terms.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {schools.map((school) => (
            <SchoolCard key={school.ID} school={school} />
          ))}
        </div>
      )}
    </div>
  )
}

