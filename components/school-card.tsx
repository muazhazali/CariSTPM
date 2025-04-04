"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, BookOpen, GraduationCap, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useComparison } from "@/context/comparison-context"
import { School } from "@/lib/supabase"

interface SchoolCardProps {
  school: School
}

export default function SchoolCard({ school }: SchoolCardProps) {
  const { addToComparison, isInComparison } = useComparison()
  const [isExpanded, setIsExpanded] = useState(false)

  const isAdded = isInComparison(school.ID)
  const subjects = school.PAKEJ_MATA_PELAJARAN.split(", ")

  const handleCompare = () => {
    addToComparison(school)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              <Link href={`/schools/${school.ID}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                {school.PUSAT}
              </Link>
            </h3>
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {school.PPD}, {school.NEGERI}
            </div>
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

        <div className="flex flex-wrap gap-2 mb-3">
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
          >
            {school.BIDANG}
          </Badge>
          <Badge variant="outline" className="text-gray-600 dark:text-gray-400">
            {school.SEMESTER}
          </Badge>
        </div>

        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
          <BookOpen className="h-4 w-4 mr-1" />
          <span className="font-medium">Subjects:</span>
          <span className="ml-1 truncate">
            {isExpanded
              ? subjects.join(", ")
              : `${subjects.slice(0, 3).join(", ")}${subjects.length > 3 ? "..." : ""}`}
          </span>
        </div>

        {subjects.length > 3 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 dark:text-blue-400 p-0 h-auto"
          >
            {isExpanded ? "Show less" : "Show all subjects"}
          </Button>
        )}
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
          <GraduationCap className="h-4 w-4 mr-1" />
          {subjects.length} subjects available
        </div>
        <Link href={`/schools/${school.ID}`}>
          <Button variant="link" size="sm" className="text-blue-600 dark:text-blue-400">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  )
}

