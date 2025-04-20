"use client"

import type React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import {
  TrendingUp,
  Award,
  Lightbulb,
  Target,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  DollarSign,
  Menu,
  X,
  FileText,
  Users,
  Shield,
  PenToolIcon as Tool,
  Clock,
  Car,
  Code,
  Home,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Import the constants at the top of the file
import { PERFORMANCE_METRICS, COLORS } from "@/lib/constants"

export default function EngineeringDesignSolutions() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const fadeInStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  // Add state and functions for the sidebar
  const [activeSection, setActiveSection] = useState("overview")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Add these refs and state variables right after the existing state declarations
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const sections = [
    { id: "overview", name: "Overview", icon: <FileText className="h-5 w-5" /> },
    { id: "project-chr-door", name: "C-HR Project", icon: <Car className="h-5 w-5" /> },
    { id: "project-seatbelt", name: "Hilux Project", icon: <Car className="h-5 w-5" /> },
    { id: "project-vba", name: "VBA Project", icon: <Code className="h-5 w-5" /> },
    { id: "business-impact", name: "Business Impact", icon: <TrendingUp className="h-5 w-5" /> },
    { id: "key-insights", name: "Key Insights", icon: <Lightbulb className="h-5 w-5" /> },
  ]

  // Improved handleScroll function to better detect the last section
  const handleScroll = () => {
    const sectionElements = sections
      .map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }))
      .filter((section) => section.element)

    // Get current scroll position plus a small offset to detect sections earlier
    const currentPosition = window.scrollY + 150

    // Check if we're near the bottom of the page
    const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200

    // If near bottom, set the last section as active
    if (isNearBottom && sections.length > 0) {
      setActiveSection(sections[sections.length - 1].id)
      return
    }

    // Find the section that is currently in view
    let currentSection = null

    // First pass: check if any section is directly in view
    for (let i = 0; i < sectionElements.length; i++) {
      const { id, element } = sectionElements[i]
      if (element) {
        const elementTop = element.offsetTop
        const elementBottom = elementTop + element.offsetHeight

        // If current scroll position is within this section
        if (currentPosition >= elementTop && currentPosition < elementBottom) {
          currentSection = id
          break
        }
      }
    }

    // If no section is directly in view, find the closest one
    if (!currentSection && sectionElements.length > 0) {
      // Default to the first section
      currentSection = sectionElements[0].id

      // Find the section closest to the current position
      for (let i = 0; i < sectionElements.length; i++) {
        const { id, element } = sectionElements[i]
        if (element && element.offsetTop <= currentPosition) {
          currentSection = id
        }
      }
    }

    if (currentSection) {
      setActiveSection(currentSection)
    }
  }

  useEffect(() => {
    // Initial check on mount
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  // Improved scrollToSection function to set active section immediately
  const scrollToSection = (id: string) => {
    if (id === "home") {
      window.location.href = "/"
      return
    }

    const element = document.getElementById(id)
    if (element) {
      // Set active section immediately when clicked
      setActiveSection(id)

      // Then scroll to the section
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })

      setMobileMenuOpen(false)
    }
  }

  // Add these touch handler functions before the return statement
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX

    // Calculate the distance swiped
    const distance = touchStartX.current - touchEndX.current

    // If swiping left and sidebar is open
    if (distance > 0 && mobileMenuOpen && sidebarRef.current) {
      // Apply transform directly for a smooth drag effect
      sidebarRef.current.style.transform = `translateX(-${distance}px)`
    }
  }

  const handleTouchEnd = () => {
    // Calculate the distance swiped
    const distance = touchStartX.current - touchEndX.current

    // If swiped left more than 100px, close the sidebar
    if (distance > 100 && mobileMenuOpen) {
      setMobileMenuOpen(false)
    }

    // Reset the transform
    if (sidebarRef.current) {
      sidebarRef.current.style.transform = ""
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f8fafc]">
      {/* Mobile menu button */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-white shadow-md"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar for desktop */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#0a192f] to-[#0a192f] text-white z-40 transition-transform duration-300 ease-in-out",
          "hidden md:block",
        )}
      >
        <div className="p-6">
          <div className="mb-8">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
              <Image
                src="/profile-image.png"
                alt="Tapanat Chaigosi"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "50% 45%",
                }}
              />
            </div>
            <h1 className="text-xl font-bold text-center">Tapanat Chaigosi</h1>
            <div className="mt-2 pt-2 border-t border-[#ffffff]/50">
              <p className="text-base text-center text-white font-medium">Engineering Solutions</p>
            </div>
          </div>

          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "flex items-center w-full px-4 py-3 rounded-lg transition-colors whitespace-nowrap",
                  activeSection === section.id ? "bg-[#172a46] text-white" : "text-gray-300 hover:bg-[#172a46]",
                )}
              >
                <span className="mr-3">{section.icon}</span>
                <span>{section.name}</span>
              </button>
            ))}
            <div className="my-3 border-t border-[#ffffff]/30"></div>
            <button
              onClick={() => (window.location.href = "/")}
              className="flex items-center w-full px-4 py-3 rounded-lg transition-colors whitespace-nowrap text-white hover:bg-[#172a46]"
            >
              <span className="mr-3">
                <Home className="h-5 w-5" />
              </span>
              <span>Go to home</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <aside
        ref={sidebarRef}
        className={cn(
          "fixed inset-0 bg-gradient-to-b from-[#0a192f] to-[#0a192f] text-white z-40 transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-lg font-bold text-center">Tapanat Chaigosi</h1>
            <div className="mt-2 pt-2 border-t border-[#ffffff]/50">
              <p className="text-base text-center text-white font-medium">Senior Engineer | Toyota</p>
            </div>
          </div>

          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "flex items-center w-full px-4 py-3 rounded-lg transition-colors whitespace-nowrap",
                  activeSection === section.id ? "bg-[#172a46] text-white" : "text-gray-300 hover:bg-[#172a46]",
                )}
              >
                <span className="mr-3">{section.icon}</span>
                <span>{section.name}</span>
              </button>
            ))}
            <div className="my-3 border-t border-[#ffffff]/30"></div>
            <button
              onClick={() => (window.location.href = "/")}
              className="flex items-center w-full px-4 py-3 rounded-lg transition-colors whitespace-nowrap text-white hover:bg-[#172a46]"
            >
              <span className="mr-3">
                <Home className="h-5 w-5" />
              </span>
              <span>Go to home</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed top-0 left-64 right-0 bottom-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      )}

      {/* Main content */}
      <main className="flex-1 md:ml-64">
        <div className="bg-white overflow-hidden">
          {/* Hero Section */}
          <div id="overview" className="relative h-[400px] w-full overflow-hidden">
            <Image
              src="/images/engineering-design.png"
              alt="Toyota Engineering Design Solutions"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Engineering Design Solutions</h1>
            </div>
          </div>

          {/* KPI Dashboard Section */}
          <div className="bg-[#0a192f]/5 p-8">
            <h2 className="text-2xl font-bold text-[#0a192f] mb-6 text-center">Performance Metrics</h2>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6"
              variants={fadeInStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={item} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex flex-col items-center sm:items-center md:items-start lg:items-start">
                  <div className="p-3 rounded-full bg-[#0046b8]/10 text-[#0046b8] mb-4 sm:mb-4 md:mb-0 md:mr-4">
                    <Shield className="h-8 w-8" />
                  </div>
                  <div className="text-center sm:text-center md:text-left">
                    <p className="text-sm text-gray-500">Safety Rating</p>
                    <h3 className="text-2xl font-bold text-[#0a192f]">
                      {PERFORMANCE_METRICS.engineeringSolutions.safetyRating}
                    </h3>
                    <p className="text-[#0046b8] text-sm font-medium">AU-NCAP Rating</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={item} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex flex-col items-center sm:items-center md:items-start lg:items-start">
                  <div className="p-3 rounded-full bg-[#0046b8]/10 text-[#0046b8] mb-4 sm:mb-4 md:mb-0 md:mr-4">
                    <Clock className="h-8 w-8" />
                  </div>
                  <div className="text-center sm:text-center md:text-left">
                    <p className="text-sm text-gray-500">Process Efficiency</p>
                    <h3 className="text-2xl font-bold text-[#0a192f]">
                      {PERFORMANCE_METRICS.engineeringSolutions.processEfficiency}
                    </h3>
                    <p className="text-[#0046b8] text-sm font-medium">Lead Time Reduction</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={item} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex flex-col items-center sm:items-center md:items-start lg:items-start">
                  <div className="p-3 rounded-full bg-[#0046b8]/10 text-[#0046b8] mb-4 sm:mb-4 md:mb-0 md:mr-4">
                    <Award className="h-8 w-8" />
                  </div>
                  <div className="text-center sm:text-center md:text-left">
                    <p className="text-sm text-gray-500">Recognition</p>
                    <h3 className="text-2xl font-bold text-[#0a192f]">
                      {PERFORMANCE_METRICS.engineeringSolutions.awardYear}
                    </h3>
                    <p className="text-[#0046b8] text-sm font-medium">Toyota Quality Award</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={item} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex flex-col items-center sm:items-center md:items-start lg:items-start">
                  <div className="p-3 rounded-full bg-[#0046b8]/10 text-[#0046b8] mb-4 sm:mb-4 md:mb-0 md:mr-4">
                    <DollarSign className="h-8 w-8" />
                  </div>
                  <div className="text-center sm:text-center md:text-left">
                    <p className="text-sm text-gray-500">Annual Savings</p>
                    <h3 className="text-2xl font-bold text-[#0a192f]">
                      {PERFORMANCE_METRICS.engineeringSolutions.annualSavings}
                    </h3>
                    <p className="text-[#0046b8] text-sm font-medium">VBA Automation</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              {/* My Role Section */}
              <motion.div
                id="overview"
                className="mb-12 sm:mb-14 md:mb-16 bg-[#0a192f]/5 p-4 sm:p-5 md:p-6 rounded-lg border border-[#0a192f]/10"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-[#0a192f] mb-4">Overview</h2>
                <p className="text-gray-700 mb-6">
                  As a Design Engineer at Toyota Motor Asia Pacific, I led multiple cross-functional initiatives to
                  improve safety, compliance, and process efficiency. These projects highlight my ability to identify
                  root causes, propose innovative ideas, implement automation, and deliver measurable cost
                  optimizations.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-[#0a192f] mb-2">Key Projects</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Car className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                        <span>Safety Redesign for Toyota C-HR Back Door</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                        <span>AU-NCAP Compliance with Intelligent Seat Belt Reminder</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Code className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                        <span>Engineering Process Automation with VBA Tool</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#0a192f] mb-2">Key Contributions</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                        <span>Enabled 5-star AU-NCAP safety rating achievement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                        <span>Redesigned safety-critical components to prevent injuries</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                        <span>Developed VBA automation tool saving $57K annually</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                        <span>Received Toyota Quality Award (2019)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Business Challenge Section */}
              <motion.div
                id="business-challenges"
                className="mb-16"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-[#0046b8]/10">
                    <Target className="h-6 w-6 text-[#0046b8]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0a192f]">Business Challenges</h2>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-700">
                    Toyota Motor Asia Pacific faced significant challenges in safety, compliance, and operational
                    efficiency:
                  </p>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                      <h3 className="flex items-center gap-2 text-lg font-medium text-red-800 mb-3">
                        <AlertTriangle className="h-5 w-5" />
                        Safety Issues
                      </h3>
                      <ul className="space-y-2 text-red-700">
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <span>Field reports of finger injuries when closing the C-HR back door</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <span>Hand cover design too deep, causing fingers to break upon door closure</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <span>Potential liability and reputation damage</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                      <h3 className="flex items-center gap-2 text-lg font-medium text-red-800 mb-3">
                        <AlertTriangle className="h-5 w-5" />
                        Compliance Gaps
                      </h3>
                      <ul className="space-y-2 text-red-700">
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <span>Hilux not compliant with AU-NCAP standards</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <span>Lacking seat belt reminder system for second-row passengers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <span>Limited market access in safety-sensitive regions</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                      <h3 className="flex items-center gap-2 text-lg font-medium text-red-800 mb-3">
                        <AlertTriangle className="h-5 w-5" />
                        Process Inefficiencies
                      </h3>
                      <ul className="space-y-2 text-red-700">
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <span>Manual engineering documentation consuming excessive hours</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <span>Validation processes prone to errors</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <span>Difficult to scale processes across teams in different regions</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Project 1: Toyota C-HR Section */}
              <motion.div
                id="project-chr-door"
                className="mb-16"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-[#0046b8]/10">
                    <Car className="h-6 w-6 text-[#0046b8]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0a192f]">
                    Project 1: Safety Redesign for Toyota C-HR Back Door
                  </h2>
                </div>

                <div className="space-y-8">
                  <p className="text-gray-700">
                    Field reports indicated that users were experiencing serious finger injuries when manually closing
                    the back door. The existing hand cover design was too deep, and during the door's motion, fingers
                    could remain trapped inside, causing them to break upon full closure.
                  </p>

                  <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#0a192f] mb-4">My Role & Actions</h3>

                      <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mt-4 sm:mt-5 md:mt-6">
                        <div className="space-y-3">
                          <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                              <div className="bg-[#0046b8]/10 p-2 rounded-full text-[#0046b8] mt-0.5">
                                <Target className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-medium text-[#0a192f]">Root Cause Analysis</h4>
                                <p className="text-gray-600">
                                  Conducted analysis by replicating real user behavior and examining ergonomic stress
                                  points.
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="bg-[#0046b8]/10 p-2 rounded-full text-[#0046b8] mt-0.5">
                                <Lightbulb className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-medium text-[#0a192f]">Problem Identification</h4>
                                <p className="text-gray-600">
                                  Identified the critical safety flaw in the hand cover's depth and geometry.
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="bg-[#0046b8]/10 p-2 rounded-full text-[#0046b8] mt-0.5">
                                <Tool className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-medium text-[#0a192f]">Design Solution</h4>
                                <p className="text-gray-600">
                                  Proposed and validated a new ergonomic design that naturally guides the user's fingers
                                  out of the handle during the closing motion.
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="bg-[#0046b8]/10 p-2 rounded-full text-[#0046b8] mt-0.5">
                                <CheckCircle className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-medium text-[#0a192f]">Testing & Validation</h4>
                                <p className="text-gray-600">
                                  Coordinated testing scenarios simulating different hand sizes and usage patterns to
                                  ensure broad safety coverage.
                                </p>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="relative h-80 rounded-lg overflow-hidden">
                          <Image
                            src="/images/toyota-chr-back-door.png"
                            alt="Toyota C-HR Back Door"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-gray-50 border-t border-gray-200">
                      <h3 className="text-xl font-bold text-[#0a192f] mb-4">Impact</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>
                            The redesigned hand cover was implemented into production, reducing risk of injury and
                            potential liability.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>
                            Recognized by the product safety committee as a benchmark case in ergonomic failure
                            resolution.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Project 2: Toyota Hilux Section */}
              <motion.div
                id="project-seatbelt"
                className="mb-16"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-[#0046b8]/10">
                    <Car className="h-6 w-6 text-[#0046b8]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0a192f]">Project 2: Hilux AU-NCAP Compliance</h2>
                </div>

                <div className="space-y-8">
                  <p className="text-gray-700">
                    The existing vehicle lineup did not comply with AU-NCAP (Australian New Car Assessment Program)
                    standards, specifically lacking a seat belt reminder system for second-row passengers.
                  </p>

                  <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#0a192f] mb-4">My Role & Actions</h3>

                      <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mt-4 sm:mt-5 md:mt-6">
                        <div className="relative h-80 rounded-lg overflow-hidden">
                          <Image
                            src="/images/toyota-hilux-crash-test.png"
                            alt="Toyota Hilux Crash Test"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="space-y-3">
                          <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                              <div className="bg-[#0046b8]/10 p-2 rounded-full text-[#0046b8] mt-0.5">
                                <Lightbulb className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-medium text-[#0a192f]">Project Initiation</h4>
                                <p className="text-gray-600">
                                  Initiated a project to retrofit the second-row seats with pressure and buckle sensors
                                  for intelligent seat detection.
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="bg-[#0046b8]/10 p-2 rounded-full text-[#0046b8] mt-0.5">
                                <Tool className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-medium text-[#0a192f]">Design Solution</h4>
                                <p className="text-gray-600">
                                  Proposed the design of an interior seat cover that enabled secure sensor placement
                                  while maintaining aesthetic and comfort standards.
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="bg-[#0046b8]/10 p-2 rounded-full text-[#0046b8] mt-0.5">
                                <Users className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-medium text-[#0a192f]">Cross-functional Collaboration</h4>
                                <p className="text-gray-600">
                                  Collaborated with electrical, safety, and design teams to integrate sensor systems
                                  into the production model.
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="bg-[#0046b8]/10 p-2 rounded-full text-[#0046b8] mt-0.5">
                                <CheckCircle className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-medium text-[#0a192f]">Validation & Certification</h4>
                                <p className="text-gray-600">
                                  Oversaw validation testing to meet AU-NCAP standards and coordinated documentation for
                                  certification.
                                </p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-gray-50 border-t border-gray-200">
                      <h3 className="text-xl font-bold text-[#0a192f] mb-4">Impact</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Enabled the model to receive a 5-star AU-NCAP safety rating.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>
                            Opened opportunities for market expansion into Australia and other safety-sensitive regions.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>
                            Improved occupant safety without sacrificing design integrity or manufacturing efficiency.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Project 3: VBA Tool Section */}
              <motion.div
                id="project-vba"
                className="mb-16"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-[#0046b8]/10">
                    <Code className="h-6 w-6 text-[#0046b8]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0a192f]">
                    Project 3: Engineering Process Automation with VBA Tool
                  </h2>
                </div>

                <div className="space-y-8">
                  <p className="text-gray-700">
                    Manual engineering documentation and validation processes were consuming excessive hours, prone to
                    errors, and difficult to scale across teams in different regions.
                  </p>

                  <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#0a192f] mb-4">My Role & Actions</h3>

                      <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mt-4 sm:mt-5 md:mt-6">
                        <div className="space-y-3">
                          <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                              <div className="bg-[#0046b8]/10 p-2 rounded-full text-[#0046b8] mt-0.5">
                                <Target className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-medium text-[#0a192f]">Workflow Analysis</h4>
                                <p className="text-gray-600">
                                  Analyzed daily workflows across design, quality, and manufacturing departments to
                                  identify repetitive tasks.
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="bg-[#0046b8]/10 p-2 rounded-full text-[#0046b8] mt-0.5">
                                <Lightbulb className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-medium text-[#0a192f]">Tool Development</h4>
                                <p className="text-gray-600">
                                  Developed a VBA tool to automate data extraction, validation, formatting, and
                                  documentation generation.
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="bg-[#0046b8]/10 p-2 rounded-full text-[#0046b8] mt-0.5">
                                <CheckCircle className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-medium text-[#0a192f]">Quality Integration</h4>
                                <p className="text-gray-600">
                                  Integrated design rules and real-time checks to eliminate manual approval bottlenecks.
                                </p>
                              </div>
                            </li>
                            <li className="flex items-start gap-3">
                              <div className="bg-[#0046b8]/10 p-2 rounded-full text-[#0046b8] mt-0.5">
                                <Users className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-medium text-[#0a192f]">Implementation & Training</h4>
                                <p className="text-gray-600">
                                  Led a user-centric rollout including training sessions, user guides, and iterative
                                  feedback collection.
                                </p>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="relative h-80 rounded-lg overflow-hidden">
                          <Image
                            src="/images/vba-tool.png"
                            alt="VBA Automation Tool Interface"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-6 border-t border-gray-200">
                      <h3 className="text-xl font-bold text-[#0a192f] mb-4">Key Features</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-[#0a192f] flex items-center gap-2">
                            <ArrowRight className="h-4 w-4 text-[#0046b8]" />
                            Automated Document Creation
                          </h4>
                          <p className="text-gray-600 text-sm mt-1">
                            Streamlined generation of standardized documentation
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-[#0a192f] flex items-center gap-2">
                            <ArrowRight className="h-4 w-4 text-[#0046b8]" />
                            Design Compliance Validation
                          </h4>
                          <p className="text-gray-600 text-sm mt-1">Automatic checking against design standards</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-[#0a192f] flex items-center gap-2">
                            <ArrowRight className="h-4 w-4 text-[#0046b8]" />
                            Error Detection System
                          </h4>
                          <p className="text-gray-600 text-sm mt-1">Centralized flagging mechanism for issues</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-[#0a192f] flex items-center gap-2">
                            <ArrowRight className="h-4 w-4 text-[#0046b8]" />
                            Cross-functional Integration
                          </h4>
                          <p className="text-gray-600 text-sm mt-1">Unified reporting across departments</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-gray-50 border-t border-gray-200">
                      <h3 className="text-xl font-bold text-[#0a192f] mb-4">Impact</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Reduced design lead time by 90%</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Saved approximately $57,000 annually in engineering labor costs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Recognized with the Toyota Quality Award in 2019</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>
                            Tool was adopted across multiple Toyota plants in Japan and Thailand as a standard solution
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Results & Impact Section */}
              <motion.div
                id="business-impact"
                className="mb-16"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-[#0046b8]/10">
                    <TrendingUp className="h-6 w-6 text-[#0046b8]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0a192f]">Business Impact</h2>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-700">
                    These initiatives delivered significant business value, improving safety, compliance, and
                    operational efficiency.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
                      <h3 className="text-3xl font-bold text-[#0046b8]">100%</h3>
                      <p className="text-gray-700 text-sm">Injury Reduction</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
                      <h3 className="text-3xl font-bold text-[#0046b8]">5-Star</h3>
                      <p className="text-gray-700 text-sm">AU-NCAP Rating</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
                      <h3 className="text-3xl font-bold text-[#0046b8]">90%</h3>
                      <p className="text-gray-700 text-sm">Lead Time Reduction</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
                      <h3 className="text-3xl font-bold text-[#0046b8]">$57K</h3>
                      <p className="text-gray-700 text-sm">Annual Savings</p>
                    </div>
                  </div>

                  <div className="mt-8 grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-bold text-[#0a192f] mb-3">Safety Impact</h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Eliminated finger injuries with redesigned back door handle</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Improved second-row passenger safety with seat belt reminder system</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Established new benchmark for ergonomic safety design</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-bold text-[#0a192f] mb-3">Compliance Impact</h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Achieved 5-star AU-NCAP safety rating</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Expanded market access to Australia and other safety-sensitive regions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Enhanced brand reputation for safety excellence</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-bold text-[#0a192f] mb-3">Efficiency Impact</h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Reduced design process lead time by 90%</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Saved approximately $57,000 annually in operational costs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Tool standardized and adopted across Toyota Japan and Thailand</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Key Insights Section */}
              <motion.div
                id="key-insights"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-[#0046b8]/10">
                    <Lightbulb className="h-6 w-6 text-[#0046b8]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0a192f]">Key Insights & Transferable Skills</h2>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-700">
                    These projects provided valuable insights and developed transferable skills that I've applied across
                    industries.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-bold text-[#0a192f] mb-3">Key Learnings</h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                          <Lightbulb className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>
                            Root cause analysis is essential for effective problem-solving under real-world constraints
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Lightbulb className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Cross-functional collaboration is essential for successful implementation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Lightbulb className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Process optimization can deliver equal or greater value than product innovation</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-bold text-[#0a192f] mb-3">Transferable Skills</h3>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Initiative-driven solutions for both product safety and system efficiency</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Automation expertise with practical implementation (VBA, documentation tooling)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Cross-department coordination and leadership across international teams</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Data-driven decision making for cost and performance optimization</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Home Button */}
              <motion.div
                className="flex justify-end mt-16 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Link
                  href="/"
                  className={`bg-[${COLORS.primary.main}] hover:bg-[${COLORS.primary.dark}] text-white px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2`}
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
