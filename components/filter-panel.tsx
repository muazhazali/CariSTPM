"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet"
import { X, Filter, ChevronUp, ChevronDown } from "lucide-react"
import { useLanguage } from '@/context/language-context'

interface FilterPanelProps {
  onFilterChange: (filters: {
    states: string[];
    subjects: string[];
    streams: string[];
  }) => void;
  onApplyFilters: () => void;
}

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

export default function FilterPanel({ onFilterChange, onApplyFilters }: FilterPanelProps) {
  const [selectedStates, setSelectedStates] = useState<string[]>([])
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedStreams, setSelectedStreams] = useState<string[]>([])
  const [tempStates, setTempStates] = useState<string[]>([])
  const [tempSubjects, setTempSubjects] = useState<string[]>([])
  const [tempStreams, setTempStreams] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()

  const subjects = [
    language === 'en' ? 'Bahasa Melayu' : 'Bahasa Melayu',
    language === 'en' ? 'English' : 'Bahasa Inggeris',
    language === 'en' ? 'Mathematics' : 'Matematik',
    language === 'en' ? 'Physics' : 'Fizik',
    language === 'en' ? 'Chemistry' : 'Kimia',
    language === 'en' ? 'Biology' : 'Biologi',
    language === 'en' ? 'Economics' : 'Ekonomi',
    language === 'en' ? 'Accounting' : 'Perakaunan',
    language === 'en' ? 'Business Studies' : 'Pengajian Perniagaan',
    language === 'en' ? 'History' : 'Sejarah',
    language === 'en' ? 'Geography' : 'Geografi',
    language === 'en' ? 'Islamic Studies' : 'Pengajian Islam',
    language === 'en' ? 'Moral Education' : 'Pendidikan Moral',
  ]

  const streamTypes = [
    language === 'en' ? 'Science' : 'Sains',
    language === 'en' ? 'Social Science' : 'Sains Sosial',
  ]

  const handleStateChange = (state: string) => {
    const newStates = tempStates.includes(state)
      ? tempStates.filter((s) => s !== state)
      : [...tempStates, state]
    setTempStates(newStates)
  }

  const handleSubjectChange = (subject: string) => {
    const newSubjects = tempSubjects.includes(subject)
      ? tempSubjects.filter((s) => s !== subject)
      : [...tempSubjects, subject]
    setTempSubjects(newSubjects)
  }

  const handleStreamChange = (stream: string) => {
    const newStreams = tempStreams.includes(stream)
      ? tempStreams.filter((s) => s !== stream)
      : [...tempStreams, stream]
    setTempStreams(newStreams)
  }

  const resetFilters = () => {
    setTempStates([])
    setTempSubjects([])
    setTempStreams([])
  }

  const handleSheetOpen = (open: boolean) => {
    setIsOpen(open)
    if (open) {
      // Initialize temp states with current selections when opening
      setTempStates(selectedStates)
      setTempSubjects(selectedSubjects)
      setTempStreams(selectedStreams)
    } else {
      // Apply filters when closing
      setSelectedStates(tempStates)
      setSelectedSubjects(tempSubjects)
      setSelectedStreams(tempStreams)
      onFilterChange({
        states: tempStates,
        subjects: tempSubjects,
        streams: tempStreams,
      })
      onApplyFilters()
    }
  }

  const hasActiveFilters = selectedStates.length > 0 || selectedSubjects.length > 0 || selectedStreams.length > 0
  const hasTempFilters = tempStates.length > 0 || tempSubjects.length > 0 || tempStreams.length > 0
  const totalFilters = selectedStates.length + selectedSubjects.length + selectedStreams.length

  // Desktop view
  const DesktopFilters = () => (
    <div className="hidden lg:block p-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {language === 'en' ? 'Filters' : 'Penapis'}
        </h2>
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

      <FilterAccordion
        states={states}
        subjects={subjects}
        streamTypes={streamTypes}
        selectedStates={selectedStates}
        selectedSubjects={selectedSubjects}
        selectedStreams={selectedStreams}
        onStateChange={handleStateChange}
        onSubjectChange={handleSubjectChange}
        onStreamChange={handleStreamChange}
        language={language}
      />

      <Button className="w-full mt-4" variant="default" onClick={onApplyFilters}>
        {language === 'en' ? 'Apply Filters' : 'Terapkan Penapis'}
      </Button>
    </div>
  )

  // Mobile view with bottom sheet
  return (
    <div className="sticky top-16 h-fit bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Mobile Filter Button and Sheet */}
      <div className="lg:hidden w-full p-4 sticky top-16 z-20 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <Sheet open={isOpen} onOpenChange={handleSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <span>{language === 'en' ? 'Filters' : 'Penapis'}</span>
                {totalFilters > 0 && (
                  <span className="ml-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-0.5 rounded-full">
                    {totalFilters}
                  </span>
                )}
              </div>
              <ChevronUp className="h-4 w-4 ml-2" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] flex flex-col">
            <SheetHeader className="flex flex-row items-center justify-between border-b pb-4">
              <SheetTitle>{language === 'en' ? 'Filters' : 'Penapis'}</SheetTitle>
              <SheetDescription className="sr-only">
                {language === 'en' 
                  ? 'Filter your search by states, subjects, and stream types' 
                  : 'Tapis carian anda mengikut negeri, subjek, dan jenis aliran'}
              </SheetDescription>
              {hasTempFilters && (
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
            </SheetHeader>
            <div className="flex-1 overflow-y-auto mt-4">
              <FilterAccordion
                states={states}
                subjects={subjects}
                streamTypes={streamTypes}
                selectedStates={tempStates}
                selectedSubjects={tempSubjects}
                selectedStreams={tempStreams}
                onStateChange={handleStateChange}
                onSubjectChange={handleSubjectChange}
                onStreamChange={handleStreamChange}
                language={language}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <DesktopFilters />
    </div>
  )
}

// Extracted FilterAccordion component for reuse
function FilterAccordion({
  states,
  subjects,
  streamTypes,
  selectedStates,
  selectedSubjects,
  selectedStreams,
  onStateChange,
  onSubjectChange,
  onStreamChange,
  language,
}: {
  states: string[]
  subjects: string[]
  streamTypes: string[]
  selectedStates: string[]
  selectedSubjects: string[]
  selectedStreams: string[]
  onStateChange: (state: string) => void
  onSubjectChange: (subject: string) => void
  onStreamChange: (stream: string) => void
  language: string
}) {
  return (
    <Accordion type="multiple" defaultValue={["states", "subjects", "streams"]}>
      <AccordionItem value="states">
        <AccordionTrigger className="text-gray-900 dark:text-white">
          <div className="flex items-center justify-between w-full">
            <span>{language === 'en' ? 'States' : 'Negeri'}</span>
            {selectedStates.length > 0 && (
              <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">
                {selectedStates.length}
              </span>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 pr-2">
            {states.map((state) => (
              <div key={state} className="flex items-center space-x-2">
                <Checkbox
                  id={`state-${state}`}
                  checked={selectedStates.includes(state)}
                  onCheckedChange={() => onStateChange(state)}
                />
                <label htmlFor={`state-${state}`} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  {state}
                </label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="subjects">
        <AccordionTrigger className="text-gray-900 dark:text-white">
          <div className="flex items-center justify-between w-full">
            <span>{language === 'en' ? 'Subjects' : 'Subjek'}</span>
            {selectedSubjects.length > 0 && (
              <span className="ml-2 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full">
                {selectedSubjects.length}
              </span>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 pr-2">
            {subjects.map((subject) => (
              <div key={subject} className="flex items-center space-x-2">
                <Checkbox
                  id={`subject-${subject}`}
                  checked={selectedSubjects.includes(subject)}
                  onCheckedChange={() => onSubjectChange(subject)}
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

      <AccordionItem value="streams">
        <AccordionTrigger className="text-gray-900 dark:text-white">
          <div className="flex items-center justify-between w-full">
            <span>{language === 'en' ? 'Stream Types' : 'Jenis Aliran'}</span>
            {selectedStreams.length > 0 && (
              <span className="ml-2 text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-0.5 rounded-full">
                {selectedStreams.length}
              </span>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 pr-2">
            {streamTypes.map((stream) => (
              <div key={stream} className="flex items-center space-x-2">
                <Checkbox
                  id={`stream-${stream}`}
                  checked={selectedStreams.includes(stream)}
                  onCheckedChange={() => onStreamChange(stream)}
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
  )
}

