"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface School {
  id: string
  name: string
  state: string
  district: string
  streams: string[]
  subjects: string[]
  semester: string
}

interface ComparisonContextType {
  comparisonList: School[]
  addToComparison: (school: School) => void
  removeFromComparison: (id: string) => void
  clearComparison: () => void
  isInComparison: (id: string) => boolean
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [comparisonList, setComparisonList] = useState<School[]>([])

  const addToComparison = (school: School) => {
    if (comparisonList.length < 4 && !comparisonList.some((s) => s.id === school.id)) {
      setComparisonList((prev) => [...prev, school])
    }
  }

  const removeFromComparison = (id: string) => {
    setComparisonList((prev) => prev.filter((school) => school.id !== id))
  }

  const clearComparison = () => {
    setComparisonList([])
  }

  const isInComparison = (id: string) => {
    return comparisonList.some((school) => school.id === id)
  }

  return (
    <ComparisonContext.Provider
      value={{
        comparisonList,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
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

