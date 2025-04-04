"use client"

import { useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useComparison } from "@/context/comparison-context"

export default function ComparisonBanner() {
  const { schools, removeFromComparison, clearComparison } = useComparison()
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible || schools.length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 z-40">
      <div className="container mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-gray-700 dark:text-gray-300 font-medium mr-4">
              {schools.length} {schools.length === 1 ? "school" : "schools"} selected
            </span>
            <div className="hidden md:flex space-x-2">
              {schools.map((school) => (
                <div
                  key={school.id}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {school.pusat}
                  <button
                    onClick={() => removeFromComparison(school.id.toString())}
                    className="ml-1 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                clearComparison()
                setIsVisible(false)
              }}
              className="text-gray-500 dark:text-gray-400"
            >
              Clear All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-gray-500 dark:text-gray-400"
            >
              <X className="h-4 w-4" />
            </Button>
            <Link href="/compare">
              <Button size="sm">Compare Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

