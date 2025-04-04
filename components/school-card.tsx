"use client"

import { useState } from "react"
import { GraduationCap, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useComparison } from "@/context/comparison-context"
import { School } from "@/lib/supabase"

interface SchoolCardProps {
  schools: School[]
}

interface GroupedSubjects {
  [semester: string]: {
    [bidang: string]: {
      combinations: string[][]
    }
  }
}

export default function SchoolCard({ schools }: SchoolCardProps) {
  const { addToComparison, isInComparison } = useComparison()
  const isAdded = isInComparison(schools[0].ID)

  // Group subjects by semester and BIDANG, keeping each class separate
  const groupedSubjects = schools.reduce((acc, schoolData) => {
    const semester = schoolData.SEMESTER
    const bidang = schoolData.BIDANG
    const subjects = schoolData.PAKEJ_MATA_PELAJARAN.split(", ")

    if (!acc[semester]) {
      acc[semester] = {}
    }
    if (!acc[semester][bidang]) {
      acc[semester][bidang] = { combinations: [] }
    }
    
    // Add this class if it's not already present
    const combinationExists = acc[semester][bidang].combinations.some(
      existing => existing.join(",") === subjects.join(",")
    )
    if (!combinationExists) {
      acc[semester][bidang].combinations.push(subjects)
    }

    return acc
  }, {} as GroupedSubjects)

  const handleCompare = () => {
    addToComparison(schools[0])
  }

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        {schools[0].PUSAT}
      </h3>
      <div className="h-px bg-gray-300 dark:bg-gray-700 my-2 w-full" />
      
      <div className="space-y-8 mt-4">
        {Object.entries(groupedSubjects).map(([semester, bidangGroups]) => (
          <div key={semester} className="space-y-6">
            {Object.entries(bidangGroups).map(([bidang, { combinations }]) => (
              <div key={`${semester}-${bidang}`}>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                  {semester} - {bidang}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {combinations.map((subjects, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 rounded-md p-4 shadow-sm">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        Class {idx + 1}
                      </div>
                      <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                        {subjects.map((subject, subjectIdx) => (
                          <li key={subjectIdx} className="flex items-start">
                            <span className="mr-2">-</span>
                            <span>{subject}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Card Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
          <GraduationCap className="h-4 w-4 mr-1" />
          {Object.values(groupedSubjects).reduce((total, bidangGroups) => 
            total + Object.values(bidangGroups).reduce((sum, { combinations }) => 
              sum + combinations.length, 0
            ), 0
          )} classes available
        </div>
        <Button
          variant={isAdded ? "outline" : "default"}
          size="sm"
          onClick={handleCompare}
          disabled={isAdded}
          className={isAdded ? "border-green-500 text-green-600 dark:border-green-400 dark:text-green-400" : ""}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4 mr-1" />
              Added
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-1" />
              Compare
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

