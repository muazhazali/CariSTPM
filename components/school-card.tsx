"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, BookOpen, GraduationCap, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useComparison } from "@/context/comparison-context"

interface School {
  id: string
  name: string
  state: string
  district: string
  streams: string[]
  subjects: string[]
  semester: string
}

interface SchoolCardProps {
  school: School
}

export default function SchoolCard({ school }: SchoolCardProps) {
  const { addToComparison, isInComparison } = useComparison()
  const [isExpanded, setIsExpanded] = useState(false)

  const isAdded = isInComparison(school.id)

  const handleCompare = () => {
    addToComparison(school)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              <Link href={`/schools/${school.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                {school.name}
              </Link>
            </h3>
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {school.district}, {school.state}
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
          {school.streams.map((stream) => (
            <Badge
              key={stream}
              variant="secondary"
              className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {stream}
            </Badge>
          ))}
          <Badge variant="outline" className="text-gray-600 dark:text-gray-400">
            {school.semester}
          </Badge>
        </div>

        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
          <BookOpen className="h-4 w-4 mr-1" />
          <span className="font-medium">Subjects:</span>
          <span className="ml-1 truncate">
            {isExpanded
              ? school.subjects.join(", ")
              : `${school.subjects.slice(0, 3).join(", ")}${school.subjects.length > 3 ? "..." : ""}`}
          </span>
        </div>

        {school.subjects.length > 3 && (
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
          {school.subjects.length} subjects available
        </div>
        <Link href={`/schools/${school.id}`}>
          <Button variant="link" size="sm" className="text-blue-600 dark:text-blue-400">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  )
}

