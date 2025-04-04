"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { X, Filter, ChevronUp, ChevronDown } from "lucide-react"

// Sample data - replace with actual data from your database
const states = [
  "JOHOR",
  "KEDAH",
  "KELANTAN",
  "MELAKA",
  "NEGERI SEMBILAN",
  "PAHANG",
  "PERAK",
  "PERLIS",
  "PULAU PINANG",
  "SABAH",
  "SARAWAK",
  "SELANGOR",
  "TERENGGANU",
  "WILAYAH PERSEKUTUAN",
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

interface FilterPanelProps {
  onFilterChange: (filters: {
    states: string[]
    subjects: string[]
    streams: string[]
  }) => void
  onApplyFilters: () => void
}

export default function FilterPanel({ onFilterChange, onApplyFilters }: FilterPanelProps) {
  const [selectedStates, setSelectedStates] = useState<string[]>([])
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedStreams, setSelectedStreams] = useState<string[]>([])
  const [isCollapsed, setIsCollapsed] = useState(true)

  const handleStateChange = (state: string) => {
    const newStates = selectedStates.includes(state)
      ? selectedStates.filter((s) => s !== state)
      : [...selectedStates, state]
    setSelectedStates(newStates)
    onFilterChange({
      states: newStates,
      subjects: selectedSubjects,
      streams: selectedStreams,
    })
  }

  const handleSubjectChange = (subject: string) => {
    const newSubjects = selectedSubjects.includes(subject)
      ? selectedSubjects.filter((s) => s !== subject)
      : [...selectedSubjects, subject]
    setSelectedSubjects(newSubjects)
    onFilterChange({
      states: selectedStates,
      subjects: newSubjects,
      streams: selectedStreams,
    })
  }

  const handleStreamChange = (stream: string) => {
    const newStreams = selectedStreams.includes(stream)
      ? selectedStreams.filter((s) => s !== stream)
      : [...selectedStreams, stream]
    setSelectedStreams(newStreams)
    onFilterChange({
      states: selectedStates,
      subjects: selectedSubjects,
      streams: newStreams,
    })
  }

  const resetFilters = () => {
    setSelectedStates([])
    setSelectedSubjects([])
    setSelectedStreams([])
    onFilterChange({
      states: [],
      subjects: [],
      streams: [],
    })
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const hasActiveFilters = selectedStates.length > 0 || selectedSubjects.length > 0 || selectedStreams.length > 0

  return (
    <div className="sticky top-16 h-fit bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden w-full p-4 sticky top-16 z-20 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleCollapse}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="ml-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-0.5 rounded-full">
                {selectedStates.length + selectedSubjects.length + selectedStreams.length}
              </span>
            )}
          </div>
          {isCollapsed ? (
            <ChevronDown className="h-4 w-4 ml-2" />
          ) : (
            <ChevronUp className="h-4 w-4 ml-2" />
          )}
        </Button>
      </div>

      {/* Filter Content */}
      <div className={`${isCollapsed ? 'hidden lg:block' : 'block'} p-4 max-h-[calc(100vh-4rem)] overflow-y-auto`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white hidden lg:block">Filters</h2>
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

        <Button className="w-full mt-4" variant="default" onClick={onApplyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  )
}

