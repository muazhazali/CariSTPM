"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function ChatbotPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your STPM entry requirements assistant. How can I help you today? You can ask me about eligibility criteria, subject requirements, or any other questions about Form 6 admissions.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample responses - in a real app, this would be replaced with actual AI processing
  const sampleResponses = {
    requirements:
      "To be eligible for Form 6, you need to have completed SPM with at least 5 credits, including Bahasa Melayu and at least a pass in History. For Science stream, you typically need credits in relevant science subjects and Mathematics.",
    science:
      "For Science stream in Form 6, you generally need credits in at least two of the following subjects: Physics, Chemistry, Biology, or Additional Mathematics in your SPM.",
    social:
      "For Social Science/Arts stream in Form 6, you need credits in relevant subjects like History, Geography, Economics, or other humanities subjects in your SPM.",
    apply:
      "Applications for Form 6 typically open after SPM results are released. You can apply through the official Ministry of Education portal or directly at your preferred school.",
    deadline:
      "The application deadline for Form 6 usually falls within 1-2 weeks after SPM results are announced. It's best to check the official Ministry of Education website for the exact dates.",
    subjects:
      "Form 6 offers various subjects across different streams. Science stream includes subjects like Physics, Chemistry, Biology, and Mathematics. Social Science stream includes subjects like Economics, Business Studies, Accounting, and Literature.",
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let responseContent =
        "I'm not sure about that. Could you please ask something about Form 6 entry requirements or subjects?"

      // Check for keywords in the user's message
      const lowerInput = input.toLowerCase()
      if (lowerInput.includes("requirement") || lowerInput.includes("eligible") || lowerInput.includes("criteria")) {
        responseContent = sampleResponses.requirements
      } else if (lowerInput.includes("science") && (lowerInput.includes("stream") || lowerInput.includes("subject"))) {
        responseContent = sampleResponses.science
      } else if (
        (lowerInput.includes("social") || lowerInput.includes("art")) &&
        (lowerInput.includes("stream") || lowerInput.includes("subject"))
      ) {
        responseContent = sampleResponses.social
      } else if (lowerInput.includes("apply") || lowerInput.includes("application")) {
        responseContent = sampleResponses.apply
      } else if (lowerInput.includes("deadline")) {
        responseContent = sampleResponses.deadline
      } else if (lowerInput.includes("subject") || lowerInput.includes("course")) {
        responseContent = sampleResponses.subjects
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: responseContent,
      }
      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.push("/")} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Entry Requirements Assistant</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden flex flex-col h-[70vh]">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`flex max-w-[80%] ${
                  message.role === "assistant"
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    : "bg-blue-600 text-white"
                } rounded-lg px-4 py-3`}
              >
                <div className="mr-2 mt-1">
                  {message.role === "assistant" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                </div>
                <div>{message.content}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="mb-4 flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-3 flex">
                <Bot className="h-5 w-5 mr-2" />
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="h-2 w-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-2 w-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Form 6 entry requirements..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              <Send className="h-5 w-5" />
            </Button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            This AI assistant can answer questions about Form 6 entry requirements, subject offerings, and application
            processes.
          </p>
        </div>
      </div>
    </div>
  )
}

