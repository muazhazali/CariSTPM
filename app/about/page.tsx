"use client"

import { Info, BookOpen, School, Users } from "lucide-react"
import { useLanguage, type Language } from '@/context/language-context'

type TranslationType = {
  [key in Language]: {
    title: string
    mission: {
      title: string
      content: string
    }
    features: {
      comprehensive: {
        title: string
        content: string
      }
      comparison: {
        title: string
        content: string
      }
      ai: {
        title: string
        content: string
      }
    }
    howItWorks: {
      title: string
      steps: {
        search: {
          title: string
          content: string
        }
        compare: {
          title: string
          content: string
        }
        ai: {
          title: string
          content: string
        }
        decide: {
          title: string
          content: string
        }
      }
    }
    dataSources: {
      title: string
      intro: string
      sources: string[]
      footer: string
    }
  }
}

const translations: TranslationType = {
  en: {
    title: "About CariSTPM",
    mission: {
      title: "Our Mission",
      content: "CariSTPM is dedicated to empowering students, parents, and educators in Malaysia by providing a comprehensive platform for discovering and comparing Form 6 (STPM) schools. Our mission is to simplify the process of finding the right educational institution by consolidating fragmented information into one accessible resource."
    },
    features: {
      comprehensive: {
        title: "Comprehensive Information",
        content: "Access detailed information about Form 6 schools, including subjects offered, streams available, and facilities."
      },
      comparison: {
        title: "Easy Comparison",
        content: "Compare multiple schools side-by-side to make informed decisions about your educational journey."
      },
      ai: {
        title: "AI-Powered Guidance",
        content: "Get personalized answers about entry requirements and eligibility through our intelligent chatbot assistant."
      }
    },
    howItWorks: {
      title: "How It Works",
      steps: {
        search: {
          title: "Search & Filter",
          content: "Use our powerful search and filtering tools to find schools based on location, subjects offered, or stream type."
        },
        compare: {
          title: "Compare Options",
          content: "Add up to 4 schools to your comparison list to evaluate them side-by-side on key factors."
        },
        ai: {
          title: "Get AI Assistance",
          content: "Ask our AI chatbot about entry requirements and eligibility criteria to determine if you qualify."
        },
        decide: {
          title: "Make Informed Decisions",
          content: "Use the comprehensive information provided to choose the Form 6 school that best fits your educational goals."
        }
      }
    },
    dataSources: {
      title: "Data Sources",
      intro: "The information on CariSTPM is sourced from official Ministry of Education data, including:",
      sources: [
        "Official Form 6 website:",
        "Ministry of Education publications and announcements",
        "Direct information from schools (where available)"
      ],
      footer: "We strive to keep all information accurate and up-to-date. If you notice any discrepancies, please contact us."
    }
  },
  ms: {
    title: "Tentang CariSTPM",
    mission: {
      title: "Misi Kami",
      content: "CariSTPM berdedikasi untuk memperkasakan pelajar, ibu bapa, dan pendidik di Malaysia dengan menyediakan platform komprehensif untuk mencari dan membandingkan sekolah Tingkatan 6 (STPM). Misi kami adalah untuk mempermudah proses mencari institusi pendidikan yang tepat dengan menyatukan maklumat yang terpecah-pecah menjadi satu sumber yang mudah diakses."
    },
    features: {
      comprehensive: {
        title: "Maklumat Komprehensif",
        content: "Akses maklumat terperinci tentang sekolah Tingkatan 6, termasuk subjek yang ditawarkan, aliran yang ada, dan kemudahan."
      },
      comparison: {
        title: "Perbandingan Mudah",
        content: "Bandingkan pelbagai sekolah secara bersebelahan untuk membuat keputusan yang tepat tentang perjalanan pendidikan anda."
      },
      ai: {
        title: "Panduan Berkuasa AI",
        content: "Dapatkan jawapan peribadi tentang keperluan kemasukan dan kelayakan melalui pembantu chatbot pintar kami."
      }
    },
    howItWorks: {
      title: "Bagaimana Ia Berfungsi",
      steps: {
        search: {
          title: "Cari & Tapis",
          content: "Gunakan alat carian dan penapisan kami yang berkuasa untuk mencari sekolah berdasarkan lokasi, subjek yang ditawarkan, atau jenis aliran."
        },
        compare: {
          title: "Bandingkan Pilihan",
          content: "Tambah sehingga 4 sekolah ke senarai perbandingan anda untuk menilai mereka secara bersebelahan berdasarkan faktor utama."
        },
        ai: {
          title: "Dapatkan Bantuan AI",
          content: "Tanya chatbot AI kami tentang keperluan kemasukan dan kriteria kelayakan untuk menentukan jika anda layak."
        },
        decide: {
          title: "Buat Keputusan Berinformasi",
          content: "Gunakan maklumat komprehensif yang disediakan untuk memilih sekolah Tingkatan 6 yang paling sesuai dengan matlamat pendidikan anda."
        }
      }
    },
    dataSources: {
      title: "Sumber Data",
      intro: "Maklumat di CariSTPM diperoleh daripada data rasmi Kementerian Pendidikan, termasuk:",
      sources: [
        "Laman web rasmi Tingkatan 6:",
        "Penerbitan dan pengumuman Kementerian Pendidikan",
        "Maklumat langsung dari sekolah (jika ada)"
      ],
      footer: "Kami berusaha untuk memastikan semua maklumat adalah tepat dan terkini. Jika anda perasan sebarang ketidaktepatan, sila hubungi kami."
    }
  }
}

export default function AboutPage() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t.title}</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex items-start mb-4">
            <Info className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t.mission.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">{t.mission.content}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col items-center text-center">
              <BookOpen className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t.features.comprehensive.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t.features.comprehensive.content}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col items-center text-center">
              <School className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t.features.comparison.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t.features.comparison.content}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col items-center text-center">
              <Users className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t.features.ai.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t.features.ai.content}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t.howItWorks.title}</h2>

          <div className="space-y-6">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold text-lg mr-4">1</div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{t.howItWorks.steps.search.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t.howItWorks.steps.search.content}</p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold text-lg mr-4">2</div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{t.howItWorks.steps.compare.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t.howItWorks.steps.compare.content}</p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold text-lg mr-4">3</div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{t.howItWorks.steps.ai.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t.howItWorks.steps.ai.content}</p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-bold text-lg mr-4">4</div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{t.howItWorks.steps.decide.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t.howItWorks.steps.decide.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t.dataSources.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{t.dataSources.intro}</p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-4">
            <li>
              {t.dataSources.sources[0]}{" "}
              <a
                href="https://sst6.moe.gov.my/form6/pakejt6.cfm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                sst6.moe.gov.my
              </a>
            </li>
            <li>{t.dataSources.sources[1]}</li>
            <li>{t.dataSources.sources[2]}</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400">{t.dataSources.footer}</p>
        </div>
      </div>
    </div>
  )
}

