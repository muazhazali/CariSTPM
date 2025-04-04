"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { MapPin, Phone, Mail, Globe, ArrowLeft, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useComparison } from "@/context/comparison-context"

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
    address: "Jalan Kluang, 83000 Batu Pahat, Johor",
    phone: "07-4343434",
    email: "smkdbl@moe.gov.my",
    website: "https://smkdbl.edu.my",
    facilities: ["Library", "Science Labs", "Computer Lab", "Sports Field", "Cafeteria"],
    activities: ["Debate Club", "Sports", "Robotics", "Music"],
  },
  {
    id: "2",
    name: "SMK Tun Habab",
    state: "Johor",
    district: "Kota Tinggi",
    streams: ["Science"],
    subjects: ["English (MUET)", "Pengajian Am", "Chemistry", "Mathematics", "Physics"],
    semester: "Semester 1",
    address: "Jalan Tun Habab, 81900 Kota Tinggi, Johor",
    phone: "07-8832244",
    email: "smkth@moe.gov.my",
    website: "https://smkth.edu.my",
    facilities: ["Library", "Science Labs", "Computer Lab"],
    activities: ["Debate Club", "Sports"],
  },
  {
    id: "3",
    name: "SMK Sultan Ibrahim",
    state: "Johor",
    district: "Kulai",
    streams: ["Social Science"],
    subjects: ["English (MUET)", "Pengajian Am", "Bahasa Melayu", "Pengajian Perniagaan", "Ekonomi"],
    semester: "Semester 1",
    address: "Jalan Sultan Ibrahim, 81000 Kulai, Johor",
    phone: "07-6611234",
    email: "smksi@moe.gov.my",
    website: "https://smksi.edu.my",
    facilities: ["Library", "Computer Lab", "Sports Field"],
    activities: ["Debate Club", "Music", "Arts"],
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
    address: "Jalan TARP, 09000 Kulim, Kedah",
    phone: "04-4901234",
    email: "smktarp@moe.gov.my",
    website: "https://smktarp.edu.my",
    facilities: ["Library", "Science Labs", "Computer Lab", "Sports Field"],
    activities: ["Debate Club", "Sports", "Robotics"],
  },
  {
    id: "5",
    name: "SMK Sultan Badlishah",
    state: "Kedah",
    district: "Kulim",
    streams: ["Science"],
    subjects: ["English (MUET)", "Pengajian Am", "Chemistry", "Mathematics", "Biology"],
    semester: "Semester 1",
    address: "Jalan Sultan Badlishah, 09000 Kulim, Kedah",
    phone: "04-4905678",
    email: "smksb@moe.gov.my",
    website: "https://smksb.edu.my",
    facilities: ["Library", "Science Labs", "Computer Lab"],
    activities: ["Debate Club", "Sports"],
  },
]

export default function SchoolDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToComparison, isInComparison } = useComparison()
  const [school, setSchool] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data from API
    const fetchSchool = () => {
      const foundSchool = sampleSchools.find((s) => s.id === params.id)
      setSchool(foundSchool || null)
      setLoading(false)
    }

    fetchSchool()
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  if (!school) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => router.push("/")} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">School Not Found</h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The school you are looking for does not exist or has been removed.
          </p>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </div>
      </div>
    )
  }

  const isAdded = isInComparison(school.id)

  const handleCompare = () => {
    addToComparison(school)
  }

  // Group subjects by stream
  const scienceSubjects = ["Chemistry", "Physics", "Biology", "Mathematics"]
  const groupedSubjects = {
    science: school.subjects.filter((subject) => scienceSubjects.some((s) => subject.includes(s))),
    social: school.subjects.filter((subject) => !scienceSubjects.some((s) => subject.includes(s))),
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.push("/")} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">School Details</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{school.name}</h2>
              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                {school.address}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
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
            </div>

            <Button
              variant={isAdded ? "outline" : "default"}
              onClick={handleCompare}
              disabled={isAdded}
              className={isAdded ? "border-green-500 text-green-600 dark:border-green-400 dark:text-green-400" : ""}
            >
              {isAdded ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Added to Comparison
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Comparison
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-600 dark:text-gray-300">{school.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
              <a href={`mailto:${school.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                {school.email}
              </a>
            </div>
            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
              <a
                href={school.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Visit Website
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Subjects Offered */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Subjects Offered</h3>

            {school.streams.includes("Science") && (
              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Science Stream</h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                  {groupedSubjects.science.map((subject) => (
                    <li key={subject}>{subject}</li>
                  ))}
                </ul>
              </div>
            )}

            {school.streams.includes("Social Science") && (
              <div>
                <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Social Science Stream</h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                  {groupedSubjects.social.map((subject) => (
                    <li key={subject}>{subject}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Facilities and Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Facilities & Activities</h3>

            <div className="mb-4">
              <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Facilities</h4>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                {school.facilities.map((facility) => (
                  <li key={facility}>{facility}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Extracurricular Activities</h4>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                {school.activities.map((activity) => (
                  <li key={activity}>{activity}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Location</h3>
          <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400">Map will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

