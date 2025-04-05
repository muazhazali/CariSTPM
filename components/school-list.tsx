"use client"

import { useEffect, useState } from 'react'
import { School, fetchSchools, fetchSchoolsWithFilters, searchSchools, CursorPaginatedResponse } from '@/lib/supabase'
import { useInView } from 'react-intersection-observer'
import { Skeleton } from '@/components/ui/skeleton'
import SchoolCard from '@/components/school-card'
import { useLanguage } from '@/context/language-context'
import { useQuery } from '@tanstack/react-query'

interface SchoolListProps {
  filters?: {
    states: string[]
    subjects: string[]
    streams: string[]
  }
  shouldApplyFilters?: boolean
  searchQuery?: string
}

export default function SchoolList({ filters, shouldApplyFilters = false, searchQuery = '' }: SchoolListProps) {
  const [cursor, setCursor] = useState<string | undefined>(undefined)
  const [schools, setSchools] = useState<School[]>([])
  const { language } = useLanguage()

  // Create ref and inView for infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '200px',
  })

  // React Query for fetching schools
  const { data, isLoading, error, isFetching } = useQuery<CursorPaginatedResponse<School>>({
    queryKey: ['schools', { filters, searchQuery, cursor }],
    queryFn: async () => {
      if (searchQuery) {
        return searchSchools(searchQuery, cursor)
      } else if (filters && Object.values(filters).some(f => f.length > 0)) {
        const apiFilters: Partial<School> = {}
        if (filters.states && filters.states.length > 0) {
          apiFilters.NEGERI = filters.states[0]
        }
        return fetchSchoolsWithFilters(apiFilters, cursor)
      }
      return fetchSchools(cursor)
    },
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
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

  // Reset schools when filters or search query changes
  useEffect(() => {
    setSchools([])
    setCursor(undefined)
  }, [filters, searchQuery, shouldApplyFilters])

  // Update schools when data changes
  useEffect(() => {
    if (data?.data) {
      if (!cursor) {
        setSchools(data.data)
      } else {
        setSchools(prev => [...prev, ...data.data])
      }
    }
  }, [data, cursor])

  // Load more when scrolling to bottom
  useEffect(() => {
    if (inView && data?.hasMore && !isFetching) {
      setCursor(data.nextCursor)
    }
  }, [inView, data?.hasMore, isFetching, data?.nextCursor])

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl p-4">
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">
          {language === 'en' ? 'Error Loading Schools' : 'Ralat Memuatkan Sekolah'}
        </h3>
        <p className="text-red-600 dark:text-red-400">
          {error.message}
        </p>
        <p className="text-sm text-red-500 dark:text-red-300 mt-2">
          {language === 'en' ? 'Please check your connection and try again. If the problem persists, contact support.' : 'Sila periksa sambungan anda dan cuba lagi. Jika masalah berterusan, hubungi sokongan.'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {language === 'en' ? 'Schools' : 'Sekolah'}
        </h2>
        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
          {language === 'en' ? `Showing ${Object.keys(groupedSchools).length} of ${data?.count || 0} schools` : `Menunjukkan ${Object.keys(groupedSchools).length} daripada ${data?.count || 0} sekolah`}
        </p>
      </div>

      <div className="grid gap-5">
        {Object.entries(groupedSchools).map(([schoolName, schoolGroup]) => (
          <SchoolCard key={schoolName} schools={schoolGroup} />
        ))}

        {/* Loading skeletons */}
        {(isLoading || isFetching) && (
          <>
            {[...Array(3)].map((_, i) => (
              <div key={`skeleton-${i}`} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <Skeleton className="h-6 w-2/3 mb-4" />
                <div className="h-px bg-gray-100 dark:bg-gray-700 w-full mb-4" />
                <div className="space-y-4">
                  <div>
                    <Skeleton className="h-5 w-1/4 mb-3" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="space-y-2">
                          <Skeleton className="h-4 w-1/2 mb-1" />
                          <Skeleton className="h-3 w-full" />
                          <Skeleton className="h-3 w-2/3" />
                          <Skeleton className="h-3 w-3/4" />
                        </div>
                      ))}
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
      {(isLoading || isFetching) && (
        <div className="text-center py-4 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-1 animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-1 animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      )}

      {/* End of list message */}
      {!data?.hasMore && !isLoading && !isFetching && schools.length > 0 && (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm font-medium">
          {language === 'en' ? "You've reached the end of the list" : 'Anda telah mencapai penghujung senarai'}
        </div>
      )}
    </div>
  )
}

