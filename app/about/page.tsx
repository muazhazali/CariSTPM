import { Info, BookOpen, School, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">About CariSTPM</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex items-start mb-4">
            <Info className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400">
                CariSTPM is dedicated to empowering students, parents, and educators in Malaysia by providing a
                comprehensive platform for discovering and comparing Form 6 (STPM) schools. Our mission is to simplify
                the process of finding the right educational institution by consolidating fragmented information into
                one accessible resource.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col items-center text-center">
              <BookOpen className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Comprehensive Information</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access detailed information about Form 6 schools, including subjects offered, streams available, and
                facilities.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col items-center text-center">
              <School className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy Comparison</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Compare multiple schools side-by-side to make informed decisions about your educational journey.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col items-center text-center">
              <Users className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI-Powered Guidance</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get personalized answers about entry requirements and eligibility through our intelligent chatbot
                assistant.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">How It Works</h2>

          <div className="space-y-6">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold text-lg mr-4">
                1
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Search & Filter</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Use our powerful search and filtering tools to find schools based on location, subjects offered, or
                  stream type.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold text-lg mr-4">
                2
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Compare Options</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Add up to 4 schools to your comparison list to evaluate them side-by-side on key factors.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold text-lg mr-4">
                3
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Get AI Assistance</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Ask our AI chatbot about entry requirements and eligibility criteria to determine if you qualify.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold text-lg mr-4">
                4
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Make Informed Decisions</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Use the comprehensive information provided to choose the Form 6 school that best fits your educational
                  goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Data Sources</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The information on CariSTPM is sourced from official Ministry of Education data, including:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-4">
            <li>
              Official Form 6 website:{" "}
              <a
                href="https://sst6.moe.gov.my/form6/pakejt6.cfm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                sst6.moe.gov.my
              </a>
            </li>
            <li>Ministry of Education publications and announcements</li>
            <li>Direct information from schools (where available)</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400">
            We strive to keep all information accurate and up-to-date. If you notice any discrepancies, please contact
            us.
          </p>
        </div>
      </div>
    </div>
  )
}

