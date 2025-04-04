"use client"

import { createContext, useContext, useState } from "react"
import { type School } from "@/lib/supabase"

interface ComparisonContextType {
  schools: School[]
  addToComparison: (school: School) => void
  removeFromComparison: (schoolId: string) => void
  isInComparison: (schoolId: string) => boolean
  clearComparison: () => void
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [schools, setSchools] = useState<School[]>([])

  const addToComparison = (school: School) => {
    setSchools((prev) => {
      if (prev.length >= 3) return prev
      if (prev.some((s) => s.ID === school.ID)) return prev
      return [...prev, school]
    })
  }

  const removeFromComparison = (schoolId: string) => {
    setSchools((prev) => prev.filter((school) => school.ID !== schoolId))
  }

  const isInComparison = (schoolId: string) => {
    return schools.some((school) => school.ID === schoolId)
  }

  const clearComparison = () => {
    setSchools([])
  }

  return (
    <ComparisonContext.Provider
      value={{
        schools,
        addToComparison,
        removeFromComparison,
        isInComparison,
        clearComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparison() {
  const context = useContext(ComparisonContext)
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider")
  }
  return context
}

