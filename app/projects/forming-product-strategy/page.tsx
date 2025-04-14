"use client"

import type React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Users, Brain, Target, Menu, X, Home, Briefcase, PuzzleIcon as PuzzlePiece } from "lucide-react"
import Link from "next/link"

export default function FormingProductStrategy() {
  const [activeSection, setActiveSection] = useState("overview")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Add these refs and state variables right after the existing state declarations
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Update the sections array to move Home to the bottom
  const sections = [
    { id: "overview", name: "Overview", icon: <Briefcase className="h-5 w-5" /> },
    { id: "leadership", name: "Leadership", icon: <Users className="h-5 w-5" /> },
    { id: "collaboration", name: "Collaboration", icon: <Target className="h-5 w-5" /> },
    { id: "critical-thinking", name: "Critical Thinking", icon: <Brain className="h-5 w-5" /> },
    { id: "problem-solving", name: "Problem Solving", icon: <PuzzlePiece className="h-5 w-5" /> },
  ]

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections
        .map((section) => ({
          id: section.id,
          element: document.getElementById(section.id),
        }))
        .filter((section) => section.element)

      const currentPosition = window.scrollY + 100

      // Find the last section that is above the current scroll position
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, element } = sectionElements[i]
        if (element && element.offsetTop <= currentPosition) {
          setActiveSection(id)
          break
        }
      }
    }

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

  // Update the scrollToSection function to handle the Home link
  const scrollToSection = (id: string) => {
    if (id === "home") {
      window.location.href = "/"
      return
    }

    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
      setActiveSection(id)
      setMobileMenuOpen(false)
    }
  }

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

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
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
              <p className="text-base text-center text-white font-medium">Product Strategy</p>
            </div>
          </div>

          {/* Update the nav section in both desktop and mobile sidebars to handle links */}
          {/* In the desktop sidebar nav section: */}
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
              <p className="text-base text-center text-white font-medium">Product Strategy</p>
            </div>
          </div>

          {/* And in the mobile sidebar nav section: */}
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
              src="/images/forming-product-strategy.png"
              alt="Forming Product Strategy"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Forming Product Strategy</h1>
            </div>
          </div>

          <div className="p-8 md:p-10 lg:p-12">
            <div className="max-w-4xl mx-auto">
              {/* Overview Section */}
              <motion.div
                id="overview"
                className="mb-16 bg-gradient-to-r from-[#0a192f]/5 to-[#0046b8]/5 p-8 rounded-lg border border-[#0a192f]/10 relative overflow-hidden"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* Decorative circles */}
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#0046b8]/5 z-0"></div>
                <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-[#0046b8]/5 z-0"></div>

                <h2 className="text-2xl font-bold text-[#0a192f] mb-6 relative z-10 flex items-center">
                  <span className="bg-[#0046b8] text-white p-2 rounded-lg mr-3">
                    <Briefcase className="h-6 w-6" />
                  </span>
                  Overview
                </h2>

                <div className="relative z-10">
                  <p className="text-gray-700 mb-6">
                    Throughout my career, I’ve built and strengthened key soft skills that have played a major role in
                    delivering successful results across different industries. Skills like leadership, cross-functional
                    collaboration, critical thinking, and problem-solving have helped me navigate complex challenges and
                    find practical, effective solutions.
                  </p>
                  <p className="text-gray-700">
                    Below are real examples from past projects that show how I’ve applied these skills in action. Each
                    one reflects my ability to adapt to new environments, work closely with different teams, and
                    consistently drive meaningful outcomes
                  </p>
                </div>
              </motion.div>

              {/* Leadership Section */}
              <motion.div
                id="leadership"
                className="mb-16 pt-8"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-[#0046b8] text-white">
                    <Users className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0a192f]">Leadership</h2>
                </div>

                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex flex-col md:flex-row">
                    {/* Left side - Image */}
                    <div className="md:w-1/2 lg:w-2/5 relative">
                      <div className="relative h-64 md:h-72 lg:h-full">
                        <Image
                          src="/images/forming-leadership.png"
                          alt="ADOT NFT Marketplace Leadership"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                          <h3 className="text-xl font-bold text-white mb-2">ADOT NFT Marketplace</h3>
                          <span className="inline-block bg-[#0046b8]/70 text-white text-xs font-medium px-2.5 py-1 rounded">
                            Web3
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right side - Content */}
                    <div className="md:w-1/2 lg:w-3/5 p-4 md:p-5 lg:p-6">
                      <h3 className="text-xl md:text-lg lg:text-xl font-bold text-[#0a192f] mb-4">
                        Strategic Vision & Team Alignment
                      </h3>
                      <p className="text-gray-700 text-sm md:text-base mb-4">
                        As Product Owner, I led the transformation of a standard NFT platform into a user-centric
                        ecosystem. By introducing ERC-6551 and a quest-based XP system, I helped increase user
                        engagement by 810% and drove platform growth through strategic feature planning.
                      </p>
                      <p className="text-gray-700 text-sm md:text-base mb-4">
                        I aligned cross-functional teams around a shared vision, facilitated effective communication
                        between technical and business stakeholders, and maintained focus on long-term goals while
                        delivering incremental value through agile methodologies.
                      </p>
                      <div className="mt-6">
                        <Link
                          href="/projects/adot-nft-marketplace"
                          className="text-[#0046b8] hover:underline flex items-center gap-1"
                        >
                          <span>View full project</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Cross-functional Collaboration Section */}
              <motion.div
                id="collaboration"
                className="mb-16 pt-8"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-[#0046b8] text-white">
                    <Target className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0a192f]">Cross-Functional Collaboration</h2>
                </div>

                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex flex-col md:flex-row">
                    {/* Left side - Image */}
                    <div className="md:w-1/2 lg:w-2/5 relative">
                      <div className="relative h-64 md:h-72 lg:h-full">
                        <Image
                          src="/images/toyota-hilux-crash-test.png"
                          alt="Toyota Hilux Crash Test"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                          <h3 className="text-xl font-bold text-white mb-2">Engineering Design Solutions</h3>
                          <span className="inline-block bg-[#0046b8]/70 text-white text-xs font-medium px-2.5 py-1 rounded">
                            Engineer
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right side - Content */}
                    <div className="md:w-1/2 lg:w-3/5 p-4 md:p-5 lg:p-6">
                      <h3 className="text-xl md:text-lg lg:text-xl font-bold text-[#0a192f] mb-4">
                        Cross-Departmental Integration
                      </h3>
                      <p className="text-gray-700 text-sm md:text-base mb-4">
                        I coordinated across design, safety, and engineering teams to retrofit the Hilux with
                        intelligent seat belt reminders. This effort contributed to a 5-star AU-NCAP rating and expanded
                        market eligibility, showing the impact of aligning multiple disciplines toward a common goal.
                      </p>
                      <p className="text-gray-700 text-sm md:text-base mb-4">
                        By establishing clear communication channels, facilitating knowledge sharing, and managing
                        stakeholder expectations, I ensured that technical requirements, safety standards, and design
                        constraints were all addressed in the final solution.
                      </p>
                      <div className="mt-6">
                        <Link
                          href="/projects/engineering-design-solutions"
                          className="text-[#0046b8] hover:underline flex items-center gap-1"
                        >
                          <span>View full project</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Critical Thinking Section */}
              <motion.div
                id="critical-thinking"
                className="mb-16 pt-8"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-[#0046b8] text-white">
                    <Brain className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0a192f]">Critical Thinking</h2>
                </div>

                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex flex-col md:flex-row">
                    {/* Left side - Image */}
                    <div className="md:w-1/2 lg:w-2/5 relative">
                      <div className="relative h-64 md:h-72 lg:h-full">
                        <Image
                          src="/images/market-making-strategy.png"
                          alt="Crypto Algorithmic Trading"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                          <h3 className="text-xl font-bold text-white mb-2">Crypto Algorithmic Trading</h3>
                          <span className="inline-block bg-[#0046b8]/70 text-white text-xs font-medium px-2.5 py-1 rounded">
                            FinTech
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right side - Content */}
                    <div className="md:w-1/2 lg:w-3/5 p-4 md:p-5 lg:p-6">
                      <h3 className="text-xl md:text-lg lg:text-xl font-bold text-[#0a192f] mb-4">
                        Market Analysis & Strategy Optimization
                      </h3>
                      <p className="text-gray-700 text-sm md:text-base mb-4">
                        I analyzed inefficiencies in low-volume token trading and implemented a Python-based
                        market-making bot. By adjusting spread logic and optimizing order flows, I reduced bid-ask gaps
                        by 78% and improved trading volume significantly.
                      </p>
                      <p className="text-gray-700 text-sm md:text-base mb-4">
                        This project required deep analysis of market microstructure, identification of key performance
                        indicators, and continuous refinement of trading algorithms based on real-time data and
                        performance metrics.
                      </p>
                      <div className="mt-6">
                        <Link
                          href="/projects/crypto-algorithmic-trading"
                          className="text-[#0046b8] hover:underline flex items-center gap-1"
                        >
                          <span>View full project</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Problem Solving Section */}
              <motion.div
                id="problem-solving"
                className="mb-16 pt-8"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-[#0046b8] text-white">
                    <PuzzlePiece className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0a192f]">Problem Solving</h2>
                </div>

                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex flex-col md:flex-row">
                    {/* Left side - Image */}
                    <div className="md:w-1/2 lg:w-2/5 relative">
                      <div className="relative h-64 md:h-72 lg:h-full">
                        <Image
                          src="/images/toyota-chr-back-door.png"
                          alt="Toyota C-HR Back Door"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                          <h3 className="text-xl font-bold text-white mb-2">Engineering Design Solutions</h3>
                          <span className="inline-block bg-[#0046b8]/70 text-white text-xs font-medium px-2.5 py-1 rounded">
                            Engineer
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right side - Content */}
                    <div className="md:w-1/2 lg:w-3/5 p-4 md:p-5 lg:p-6">
                      <h3 className="text-xl md:text-lg lg:text-xl font-bold text-[#0a192f] mb-4">
                        Safety Issue Resolution
                      </h3>
                      <p className="text-gray-700 text-sm md:text-base mb-4">
                        I resolved a safety issue involving finger injuries on the C-HR back door. After evaluating
                        ergonomic risks, I redesigned the door handle area, eliminating the hazard and improving
                        customer safety standards.
                      </p>
                      <p className="text-gray-700 text-sm md:text-base mb-4">
                        This challenge required a methodical approach to problem-solving: identifying the root cause
                        through user behavior analysis, developing multiple solution concepts, testing prototypes with
                        different hand sizes, and implementing a final design that balanced safety, aesthetics, and
                        manufacturing constraints.
                      </p>
                      <div className="mt-6">
                        <Link
                          href="/projects/engineering-design-solutions"
                          className="text-[#0046b8] hover:underline flex items-center gap-1"
                        >
                          <span>View full project</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
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
                  className="bg-[#0046b8] hover:bg-[#003d9e] text-white px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
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
