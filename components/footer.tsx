"use client"

import Link from "next/link"
import { useLanguage, type Language } from '@/context/language-context'

type FooterTranslations = {
  [key in Language]: {
    tagline: string
    sections: {
      quickLinks: {
        title: string
        links: {
          home: string
          compare: string
          askAI: string
          about: string
        }
      }
      resources: {
        title: string
        links: {
          form6Website: string
          entryRequirements: string
          faq: string
        }
      }
      coolProjects: {
        title: string
      }
      copyright: string
    }
  }
}

const translations: FooterTranslations = {
  en: {
    tagline: "Empowering students to discover and compare Form 6 (STPM) schools in Malaysia.",
    sections: {
      quickLinks: {
        title: "Quick Links",
        links: {
          home: "Home",
          compare: "Compare Schools",
          askAI: "Ask AI",
          about: "About"
        }
      },
      resources: {
        title: "Resources",
        links: {
          form6Website: "Official Form 6 Website",
          entryRequirements: "Entry Requirements",
          faq: "FAQ"
        }
      },
      coolProjects: {
        title: "Cool Projects"
      },
      copyright: "All rights reserved."
    }
  },
  ms: {
    tagline: "Memperkasakan pelajar untuk meneroka dan membandingkan sekolah Tingkatan 6 (STPM) di Malaysia.",
    sections: {
      quickLinks: {
        title: "Pautan Pantas",
        links: {
          home: "Laman Utama",
          compare: "Bandingkan Sekolah",
          askAI: "Tanya AI",
          about: "Tentang"
        }
      },
      resources: {
        title: "Sumber",
        links: {
          form6Website: "Laman Web Rasmi Tingkatan 6",
          entryRequirements: "Syarat Kemasukan",
          faq: "Soalan Lazim"
        }
      },
      coolProjects: {
        title: "Projek Menarik"
      },
      copyright: "Hak cipta terpelihara."
    }
  }
}

export default function Footer() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">CariSTPM</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t.tagline}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{t.sections.quickLinks.title}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {t.sections.quickLinks.links.home}
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {t.sections.quickLinks.links.compare}
                </Link>
              </li>
              <li>
                <Link
                  href="/chatbot"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {t.sections.quickLinks.links.askAI}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {t.sections.quickLinks.links.about}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{t.sections.resources.title}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://sst6.moe.gov.my/form6/pakejt6.cfm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {t.sections.resources.links.form6Website}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  {t.sections.resources.links.entryRequirements}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  {t.sections.resources.links.faq}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{t.sections.coolProjects.title}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/muazhazali/CariSTPM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  CariSTPM (GitHub)
                </a>
              </li>
              <li>
                <a
                  href="https://sedekahje.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  SedekahJe
                </a>
              </li>
              <li>
                <a
                  href="https://belasungkawa.my/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Belasungkawa
                </a>
              </li>
              <li>
                <a
                  href="https://duaa.my/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Duaa
                </a>
              </li>
              <li>
                <a
                  href="https://pantunis.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Pantunis
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} CariSTPM. {t.sections.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

