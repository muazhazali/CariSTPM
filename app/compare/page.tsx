"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useComparison } from "@/context/comparison-context"
import Link from "next/link"
import { Tooltip } from "@/components/ui/tooltip"
import { useLanguage } from "@/context/language-context"

const translations = {
  en: {
    compareSchools: "Compare Schools",
    noSchoolsSelected: "No Schools Selected",
    noSchoolsMessage: "You haven't selected any schools to compare yet. Browse schools and add them to your comparison list.",
    browseSchools: "Browse Schools",
    back: "Back",
    comparison: "Comparison",
    location: "Location",
    subjectsOffered: "Subjects Offered"
  },
  ms: {
    compareSchools: "Bandingkan Sekolah",
    noSchoolsSelected: "Tiada Sekolah Dipilih",
    noSchoolsMessage: "Anda belum memilih sekolah untuk dibandingkan. Layari sekolah dan tambahkan ke senarai perbandingan anda.",
    browseSchools: "Layari Sekolah",
    back: "Kembali",
    comparison: "Perbandingan",
    location: "Lokasi",
    subjectsOffered: "Mata Pelajaran Ditawarkan"
  }
}

export default function ComparePage() {
  const router = useRouter()
  const { schools, removeFromComparison } = useComparison()
  const [mounted, setMounted] = useState(false)
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (schools.length === 0) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8 mt-24">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => router.push("/")} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            {t.back}
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t.compareSchools}</h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{t.noSchoolsSelected}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t.noSchoolsMessage}
          </p>
          <Link href="/">
            <Button>{t.browseSchools}</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Get all unique subjects from all schools
  const allSubjects = Array.from(new Set(schools.flatMap((school) => school.PAKEJ_MATA_PELAJARAN.split(", ") || []))).sort()

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 mt-24">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.push("/")} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          {t.back}
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t.compareSchools}</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600 sticky left-0 bg-gray-50 dark:bg-gray-700">
                  {t.comparison}
                </th>
                {schools.map((school) => (
                  <th
                    key={school.ID}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600 min-w-[200px]"
                  >
                    <div className="flex justify-between items-center">
                      <span>{school.PUSAT}</span>
                      <button
                        onClick={() => removeFromComparison(school.ID)}
                        className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Basic Information */}
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-gray-800">
                  {t.location}
                </td>
                {schools.map((school) => (
                  <td key={`${school.ID}-location`} className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {school.PPD}, {school.NEGERI}
                  </td>
                ))}
              </tr>

              {/* Subjects Section Header */}
              <tr className="bg-gray-50 dark:bg-gray-700">
                <td
                  colSpan={schools.length + 1}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  {t.subjectsOffered}
                </td>
              </tr>

              {/* Subjects Comparison */}
              {allSubjects.map((subject) => (
                <tr key={subject}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-gray-800">
                    {subject}
                  </td>
                  {schools.map((school) => (
                    <td key={`${school.ID}-${subject}`} className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {(school.PAKEJ_MATA_PELAJARAN.split(", ") || []).includes(subject) ? (
                        <span className="text-green-600 dark:text-green-400">✓</span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400">✗</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

