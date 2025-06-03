"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Send, Bot, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const generateResponse = async (message: string) => {
  try {
    const response = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default function ChatbotPage() {
  const router = useRouter()
  const [showWIPDialog, setShowWIPDialog] = useState(true)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your STPM entry requirements assistant. How can I help you today? You can ask me about eligibility criteria, subject requirements, or any other questions about Form 6 admissions.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      // Get AI response
      const responseContent = await generateResponse(input)
      
      const botMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: responseContent,
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error('Error getting response:', error)
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "I apologize, but I'm having trouble responding right now. Please try again later.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 mt-16">
      <Dialog open={showWIPDialog} onOpenChange={setShowWIPDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Work in Progress</DialogTitle>
            <DialogDescription>
              The chatbot feature is currently under development. This is a prototype version with limited functionality.
              We're working on integrating advanced AI capabilities to provide more accurate and comprehensive responses.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowWIPDialog(false)}>Got it, thanks!</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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

