"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm fixed top-0 left-0 right-0 h-16 z-50">
      <div className="container mx-auto max-w-6xl px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">CariSTPM</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
              Home
            </Link>
            <Link
              href="/compare"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Compare
            </Link>
            <Link
              href="/chatbot"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Ask AI
            </Link>
            <Link
              href="/about"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            >
              About
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mr-2"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow-lg py-4 px-4 space-y-4">
            <Link
              href="/"
              className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/compare"
              className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Compare
            </Link>
            <Link
              href="/chatbot"
              className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Ask AI
            </Link>
            <Link
              href="/about"
              className="block text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

