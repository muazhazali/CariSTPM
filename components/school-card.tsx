"use client"

import { useState } from "react"
import { GraduationCap, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useComparison } from "@/context/comparison-context"
import { School } from "@/lib/supabase"
import { useLanguage } from '@/context/language-context'

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
  const { language } = useLanguage()

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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-blue-100 dark:border-blue-900/30 transition-all hover:shadow-md">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 border-b border-blue-100 dark:border-blue-900/30">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {schools[0].PUSAT}
        </h3>
      </div>
      
      <div className="p-4">
        {Object.entries(groupedSubjects).map(([semester, bidangGroups]) => (
          <div key={semester} className="mb-6 last:mb-0">
            {Object.entries(bidangGroups).map(([bidang, { combinations }]) => (
              <div key={`${semester}-${bidang}`} className="mb-5 last:mb-0">
                <div className="flex items-center mb-3">
                  <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                    {semester}
                  </Badge>
                  <span className="mx-2 text-gray-400">—</span>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">
                    {bidang}
                  </h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {combinations.map((subjects, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-800/80 rounded-md p-3 border border-gray-100 dark:border-gray-700">
                      <div className="mb-2 pb-1 border-b border-gray-200 dark:border-gray-700 flex items-center">
                        <Badge variant="secondary" className="text-xs bg-blue-100/50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-none">
                          {language === 'en' ? `Class ${idx + 1}` : `Kelas ${idx + 1}`}
                        </Badge>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        {subjects.map((subject, subjectIdx) => (
                          <li key={subjectIdx} className="flex items-start">
                            <span className="mr-2 text-blue-500 dark:text-blue-400">•</span>
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
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700/50 flex justify-between items-center">
        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
          <GraduationCap className="h-4 w-4 mr-1.5 text-blue-600 dark:text-blue-400" />
          {language === 'en' ? `${Object.values(groupedSubjects).reduce((total, bidangGroups) => total + Object.values(bidangGroups).reduce((sum, { combinations }) => sum + combinations.length, 0), 0)} classes available` : `${Object.values(groupedSubjects).reduce((total, bidangGroups) => total + Object.values(bidangGroups).reduce((sum, { combinations }) => sum + combinations.length, 0), 0)} jumlah kelas`}
        </div>
        <Button
          variant={isAdded ? "outline" : "default"}
          size="sm"
          onClick={handleCompare}
          disabled={isAdded}
          className={isAdded 
            ? "border-green-500 text-green-600 dark:border-green-400 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/10" 
            : "bg-blue-600 hover:bg-blue-700 text-white"}
        >
          {isAdded ? (
            <>
              <Check className="h-3.5 w-3.5 mr-1" />
              {language === 'en' ? 'Added' : 'Ditambah'}
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5 mr-1" />
              {language === 'en' ? 'Compare' : 'Bandingkan'}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

