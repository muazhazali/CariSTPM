"use client"

import { useEffect, useState, useCallback } from 'react'
import { School, fetchSchools, fetchSchoolsWithFilters, PaginatedResponse } from '@/lib/supabase'
import { useInView } from 'react-intersection-observer'
import { Skeleton } from '@/components/ui/skeleton'
import SchoolCard from '@/components/school-card'

interface SchoolListProps {
  filters?: {
    states: string[]
    subjects: string[]
    streams: string[]
  }
  shouldApplyFilters?: boolean
}

export default function SchoolList({ filters, shouldApplyFilters = false }: SchoolListProps) {
  const [schools, setSchools] = useState<School[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  // Create ref and inView for infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  })

  // Group schools by PUSAT (school name) with all their data
  const groupedSchools = schools.reduce((acc, school) => {
    const schoolName = school.PUSAT
    if (!acc[schoolName]) {
      acc[schoolName] = []
    }
    acc[schoolName].push(school)
    return acc
  }, {} as Record<string, School[]>)

  // Reset schools when filters change and shouldApplyFilters is true
  useEffect(() => {
    if (shouldApplyFilters) {
      setSchools([])
      setPage(1)
      setHasMore(true)
      loadMoreSchools(true)
    }
  }, [filters, shouldApplyFilters])

  // Function to load more schools
  const loadMoreSchools = useCallback(async (isFirstLoad: boolean = false) => {
    try {
      setIsLoading(true)
      let response: PaginatedResponse<School>

      const hasFilters = filters && (
        (filters.states && filters.states.length > 0) ||
        (filters.subjects && filters.subjects.length > 0) ||
        (filters.streams && filters.streams.length > 0)
      )

      if (hasFilters) {
        const apiFilters: Partial<School> = {}
        if (filters && filters.states && filters.states.length > 0) {
          apiFilters.NEGERI = filters.states[0]
        }
        response = await fetchSchoolsWithFilters(apiFilters, isFirstLoad ? 1 : page)
      } else {
        response = await fetchSchools(isFirstLoad ? 1 : page)
      }
      
      let filteredData = response.data
      if (filters && filters.states && filters.states.length > 1) {
        filteredData = response.data.filter(school => 
          filters.states.includes(school.NEGERI)
        )
      }
      
      setSchools(prevSchools => isFirstLoad ? filteredData : [...prevSchools, ...filteredData])
      setHasMore(response.hasMore)
      setTotalCount(response.count)
      
      if (response.hasMore && !isFirstLoad) {
        setPage(prev => prev + 1)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch schools')
      console.error('Error loading schools:', err)
    } finally {
      setIsLoading(false)
    }
  }, [page, filters])

  // Load more schools when scrolling to bottom
  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMoreSchools()
    }
  }, [inView, hasMore, isLoading, loadMoreSchools])

  // Initial load
  useEffect(() => {
    loadMoreSchools(true)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Schools</h2>
        <p className="text-sm text-muted-foreground">
          Showing {Object.keys(groupedSchools).length} of {totalCount} schools
        </p>
      </div>

      <div className="grid gap-6">
        {Object.entries(groupedSchools).map(([schoolName, schoolGroup]) => (
          <SchoolCard key={schoolName} schools={schoolGroup} />
        ))}

        {/* Loading skeletons */}
        {isLoading && (
          <>
            {[...Array(3)].map((_, i) => (
              <div key={`skeleton-${i}`} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <div className="h-px bg-gray-200 dark:bg-gray-700 w-full" />
                <div className="space-y-4">
                  <div>
                    <Skeleton className="h-5 w-1/4 mb-2" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Infinite scroll trigger */}
      <div ref={ref} className="h-4" />

      {/* Loading state at bottom */}
      {isLoading && (
        <div className="text-center py-4 text-muted-foreground">
          Loading more schools...
        </div>
      )}

      {/* End of list message */}
      {!hasMore && !isLoading && (
        <div className="text-center py-4 text-muted-foreground">
          No more schools to load
        </div>
      )}
    </div>
  )
}

