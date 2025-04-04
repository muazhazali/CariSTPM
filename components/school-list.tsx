"use client"

import { useState } from "react"
import SchoolCard from "./school-card"

// Sample data - replace with actual data from your database
const sampleSchools = [
  {
    id: "1",
    name: "SMK Dato Bentara Luar",
    state: "Johor",
    district: "Batu Pahat",
    streams: ["Science", "Social Science"],
    subjects: [
      "English (MUET)",
      "Pengajian Am",
      "Chemistry",
      "Mathematics",
      "Physics",
      "Bahasa Melayu",
      "Pengajian Perniagaan",
      "Ekonomi",
      "Sejarah",
    ],
    semester: "Semester 1",
  },
  {
    id: "2",
    name: "SMK Tun Habab",
    state: "Johor",
    district: "Kota Tinggi",
    streams: ["Science"],
    subjects: ["English (MUET)", "Pengajian Am", "Chemistry", "Mathematics", "Physics"],
    semester: "Semester 1",
  },
  {
    id: "3",
    name: "SMK Sultan Ibrahim",
    state: "Johor",
    district: "Kulai",
    streams: ["Social Science"],
    subjects: ["English (MUET)", "Pengajian Am", "Bahasa Melayu", "Pengajian Perniagaan", "Ekonomi"],
    semester: "Semester 1",
  },
  {
    id: "4",
    name: "SMK Tunku Abdul Rahman Putra",
    state: "Kedah",
    district: "Kulim",
    streams: ["Science", "Social Science"],
    subjects: [
      "English (MUET)",
      "Pengajian Am",
      "Chemistry",
      "Mathematics",
      "Physics",
      "Bahasa Melayu",
      "Sejarah",
      "Ekonomi",
    ],
    semester: "Semester 1",
  },
  {
    id: "5",
    name: "SMK Sultan Badlishah",
    state: "Kedah",
    district: "Kulim",
    streams: ["Science"],
    subjects: ["English (MUET)", "Pengajian Am", "Chemistry", "Mathematics", "Biology"],
    semester: "Semester 1",
  },
]

export default function SchoolList() {
  const [schools] = useState(sampleSchools)

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Schools ({schools.length})</h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">Showing {schools.length} results</div>
      </div>

      {schools.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">No schools found matching your criteria.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {schools.map((school) => (
            <SchoolCard key={school.id} school={school} />
          ))}
        </div>
      )}
    </div>
  )
}

