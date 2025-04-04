"use client"

import { useEffect, useState, useRef, useCallback } from 'react'
import { School, fetchSchools, PaginatedResponse } from '@/lib/supabase'
import { useInView } from 'react-intersection-observer'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from "@/components/ui/button"

export default function SchoolList() {
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

  // Function to load more schools
  const loadMoreSchools = useCallback(async () => {
    try {
      setIsLoading(true)
      const response: PaginatedResponse<School> = await fetchSchools(page)
      
      setSchools(prevSchools => [...prevSchools, ...response.data])
      setHasMore(response.hasMore)
      setTotalCount(response.count)
      
      if (response.hasMore) {
        setPage(prev => prev + 1)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch schools')
      console.error('Error loading schools:', err)
    } finally {
      setIsLoading(false)
    }
  }, [page])

  // Load more schools when scrolling to bottom
  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMoreSchools()
    }
  }, [inView, hasMore, isLoading, loadMoreSchools])

  // Initial load
  useEffect(() => {
    loadMoreSchools()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleTestInsert = async () => {
    try {
      await loadMoreSchools() // Reload the list after insert
    } catch (err) {
      console.error('Error inserting test school:', err)
      setError(err instanceof Error ? err.message : 'Failed to insert test school')
    }
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">Error Loading Schools</h3>
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <p className="text-sm text-red-500 dark:text-red-300 mt-2">
          Please check your connection and try again. If the problem persists, contact support.
        </p>
        <Button onClick={handleTestInsert} className="mt-4">
          Insert Test School
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Schools</h2>
        <p className="text-sm text-muted-foreground">
          Showing {schools.length} of {totalCount} schools
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {schools.map((school) => (
          <Card key={school.ID}>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{school.PUSAT}</h3>
              <div className="text-sm space-y-1 text-muted-foreground">
                <p>State: {school.NEGERI}</p>
                <p>District: {school.PPD}</p>
                <p>Semester: {school.SEMESTER}</p>
                <p>Field: {school.BIDANG}</p>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Loading skeletons */}
        {isLoading && (
          <>
            {[...Array(6)].map((_, i) => (
              <Card key={`skeleton-${i}`}>
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </div>

      {/* Infinite scroll trigger */}
      <div ref={ref} className="h-4" />

      {/* Loading state at bottom */}
      {isLoading && (
        <div className="text-center py-4">
          Loading more schools...
        </div>
      )}

      {/* End of list message */}
      {!hasMore && !isLoading && (
        <div className="text-center py-4 text-muted-foreground">
          No more schools to load
        </div>
      )}

      <div className="flex justify-center mt-4">
        <Button onClick={handleTestInsert} variant="outline" size="sm">
          Insert Test School
        </Button>
      </div>
    </div>
  )
}

