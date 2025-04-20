"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Mail, Phone, Send, Linkedin, Github, Twitter } from "lucide-react"
import Link from "next/link"

export default function Contact() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    submitted: false,
    loading: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState({ ...formState, loading: true })

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setFormState({
      name: "",
      email: "",
      message: "",
      submitted: true,
      loading: false,
    })
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-16">
      <div className="max-w-5xl mx-auto px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-[#0a192f] hover:underline mb-8 group">
          <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
          Back
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold text-[#0a192f] mb-2">Let's Connect</h1>
          <p className="text-lg text-gray-600 mb-12">
            I'm always open to discussing product strategy, leadership opportunities, or innovative ideas.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-[#0a192f] mb-6">Get in Touch</h2>

              {formState.submitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                    <Send className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <Button
                    className="mt-4 bg-[#0046b8] hover:bg-[#0046b8]/90"
                    onClick={() => setFormState({ ...formState, submitted: false })}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0046b8] focus:border-[#0046b8] outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0046b8] focus:border-[#0046b8] outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0046b8] focus:border-[#0046b8] outline-none min-h-[150px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#0046b8] hover:bg-[#0046b8]/90"
                    disabled={formState.loading}
                  >
                    {formState.loading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0a192f] mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#0046b8]/10 text-[#0046b8]">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#0a192f]">Email</h3>
                    <a href="mailto:w.tapanat@gmail.com" className="text-[#0046b8] hover:underline">
                      w.tapanat@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#0046b8]/10 text-[#0046b8]">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#0a192f]">Phone</h3>
                    <a href="tel:+66835356641" className="text-[#0046b8] hover:underline">
                      +66-83-535-6641
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#0046b8]/10 text-[#0046b8]">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#0a192f]">Schedule a Meeting</h3>
                    <a href="#" className="text-[#0046b8] hover:underline">
                      Book a 30-minute call
                    </a>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-200">
                  <h3 className="font-medium text-[#0a192f] mb-4">Connect on Social Media</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-[#0046b8]/10 text-[#0046b8] hover:bg-[#0046b8]/20 transition-colors"
                    >
                      <Linkedin className="h-6 w-6" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-[#0046b8]/10 text-[#0046b8] hover:bg-[#0046b8]/20 transition-colors"
                    >
                      <Github className="h-6 w-6" />
                      <span className="sr-only">GitHub</span>
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-[#0046b8]/10 text-[#0046b8] hover:bg-[#0046b8]/20 transition-colors"
                    >
                      <Twitter className="h-6 w-6" />
                      <span className="sr-only">Twitter</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
