import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { ComparisonProvider } from "@/context/comparison-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CariSTPM - Find and Compare Form 6 Schools in Malaysia",
  description: "Discover, compare and find the perfect Form 6 (STPM) school in Malaysia with CariSTPM.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ComparisonProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex-grow">{children}</div>
              <Footer />
            </div>
          </ComparisonProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'