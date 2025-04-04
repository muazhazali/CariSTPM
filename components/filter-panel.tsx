"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { X } from "lucide-react"

// Sample data - replace with actual data from your database
const states = [
  "Johor",
  "Kedah",
  "Kelantan",
  "Melaka",
  "Negeri Sembilan",
  "Pahang",
  "Perak",
  "Perlis",
  "Pulau Pinang",
  "Sabah",
  "Sarawak",
  "Selangor",
  "Terengganu",
  "Wilayah Persekutuan",
]

const subjects = [
  "Bahasa Melayu",
  "English",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Accounting",
  "Business Studies",
  "History",
  "Geography",
  "Islamic Studies",
  "Moral Education",
]

const streamTypes = ["Science", "Social Science"]

export default function FilterPanel() {
  const [selectedStates, setSelectedStates] = useState<string[]>([])
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedStreams, setSelectedStreams] = useState<string[]>([])

  const handleStateChange = (state: string) => {
    setSelectedStates((prev) => (prev.includes(state) ? prev.filter((s) => s !== state) : [...prev, state]))
  }

  const handleSubjectChange = (subject: string) => {
    setSelectedSubjects((prev) => (prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]))
  }

  const handleStreamChange = (stream: string) => {
    setSelectedStreams((prev) => (prev.includes(stream) ? prev.filter((s) => s !== stream) : [...prev, stream]))
  }

  const resetFilters = () => {
    setSelectedStates([])
    setSelectedSubjects([])
    setSelectedStreams([])
  }

  const hasActiveFilters = selectedStates.length > 0 || selectedSubjects.length > 0 || selectedStreams.length > 0

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 flex items-center"
          >
            <X className="h-4 w-4 mr-1" />
            Reset
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mb-4 flex flex-wrap gap-2">
          {selectedStates.map((state) => (
            <div
              key={`filter-${state}`}
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full flex items-center"
            >
              {state}
              <button
                onClick={() => handleStateChange(state)}
                className="ml-1 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {selectedSubjects.map((subject) => (
            <div
              key={`filter-${subject}`}
              className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full flex items-center"
            >
              {subject}
              <button
                onClick={() => handleSubjectChange(subject)}
                className="ml-1 text-green-600 dark:text-green-300 hover:text-green-800 dark:hover:text-green-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {selectedStreams.map((stream) => (
            <div
              key={`filter-${stream}`}
              className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs px-2 py-1 rounded-full flex items-center"
            >
              {stream}
              <button
                onClick={() => handleStreamChange(stream)}
                className="ml-1 text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <Accordion type="multiple" defaultValue={["states", "subjects", "streams"]}>
        {/* States Filter */}
        <AccordionItem value="states">
          <AccordionTrigger className="text-gray-900 dark:text-white">States</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {states.map((state) => (
                <div key={state} className="flex items-center space-x-2">
                  <Checkbox
                    id={`state-${state}`}
                    checked={selectedStates.includes(state)}
                    onCheckedChange={() => handleStateChange(state)}
                  />
                  <label htmlFor={`state-${state}`} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                    {state}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Subjects Filter */}
        <AccordionItem value="subjects">
          <AccordionTrigger className="text-gray-900 dark:text-white">Subjects</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {subjects.map((subject) => (
                <div key={subject} className="flex items-center space-x-2">
                  <Checkbox
                    id={`subject-${subject}`}
                    checked={selectedSubjects.includes(subject)}
                    onCheckedChange={() => handleSubjectChange(subject)}
                  />
                  <label
                    htmlFor={`subject-${subject}`}
                    className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    {subject}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Stream Types Filter */}
        <AccordionItem value="streams">
          <AccordionTrigger className="text-gray-900 dark:text-white">Stream Types</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {streamTypes.map((stream) => (
                <div key={stream} className="flex items-center space-x-2">
                  <Checkbox
                    id={`stream-${stream}`}
                    checked={selectedStreams.includes(stream)}
                    onCheckedChange={() => handleStreamChange(stream)}
                  />
                  <label
                    htmlFor={`stream-${stream}`}
                    className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    {stream}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full mt-4" variant="default">
        Apply Filters
      </Button>
    </div>
  )
}

