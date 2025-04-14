"use client"

import type React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import {
  Users,
  TrendingUp,
  Clock,
  Award,
  Lightbulb,
  Target,
  AlertTriangle,
  ListChecks,
  Menu,
  X,
  ChevronRight,
  Zap,
  Trophy,
  FileText,
  Home,
} from "lucide-react"
import Link from "next/link"

export default function ADOTNFTMarketplace() {
  const [activeSection, setActiveSection] = useState("overview")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Add these refs and state variables right after the existing state declarations
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Update the sections array to remove the Home item from the top
  const sections = [
    { id: "overview", name: "Overview", icon: <FileText className="h-5 w-5" /> },
    { id: "business-challenge", name: "Business Challenge", icon: <Target className="h-5 w-5" /> },
    { id: "strategic-solution", name: "Strategic Solution", icon: <Lightbulb className="h-5 w-5" /> },
    { id: "results", name: "Results & Impact", icon: <TrendingUp className="h-5 w-5" /> },
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
              <p className="text-base text-center text-white font-medium">Web3 Marketplace</p>
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
              <p className="text-base text-center text-white font-medium">Product Owner | Web3 Marketplace</p>
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
              src="/images/adot-nft-marketplace.png"
              alt="ADOT NFT Marketplace"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Web3 Marketplace</h1>
              {/*<p className="text-white/90 text-lg md:text-xl max-w-3xl">
                NFT Marketplace with ERC-6551 integration, driving 230% user growth
              </p>*/}
            </div>
          </div>

          {/* Key Metrics Section */}
          <div className="bg-[#0a192f]/5 p-8">
            <h2 className="text-2xl font-bold text-[#0a192f] mb-6 text-center">Performance Metrics</h2>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
              variants={fadeInStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                variants={item}
                className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="flex flex-col items-center sm:items-center md:items-start lg:items-start">
                  <div className="p-3 rounded-full bg-[#0046b8]/10 text-[#0046b8] mb-4 sm:mb-4 md:mb-0 md:mr-4">
                    <Users className="h-8 w-8" />
                  </div>
                  <div className="text-center sm:text-center md:text-left">
                    <p className="text-sm text-gray-500">Active Users</p>
                    <h3 className="text-2xl font-bold text-[#0a192f]">25,000+</h3>
                    <p className="text-[#0046b8] text-sm font-medium">+230% Growth</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={item}
                className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="flex flex-col items-center sm:items-center md:items-start lg:items-start">
                  <div className="p-3 rounded-full bg-[#0046b8]/10 text-[#0046b8] mb-4 sm:mb-4 md:mb-0 md:mr-4">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <div className="text-center sm:text-center md:text-left">
                    <p className="text-sm text-gray-500">Engagement Time</p>
                    <h3 className="text-2xl font-bold text-[#0a192f]">+810%</h3>
                    <p className="text-[#0046b8] text-sm font-medium">in 3 months</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={item}
                className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="flex flex-col items-center sm:items-center md:items-start lg:items-start">
                  <div className="p-3 rounded-full bg-[#0046b8]/10 text-[#0046b8] mb-4 sm:mb-4 md:mb-0 md:mr-4">
                    <Clock className="h-8 w-8" />
                  </div>
                  <div className="text-center sm:text-center md:text-left">
                    <p className="text-sm text-gray-500">Development Time</p>
                    <h3 className="text-2xl font-bold text-[#0a192f]">1 Year</h3>
                    <p className="text-[#0046b8] text-sm font-medium">from concept to launch</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              {/* My Role Section */}
              <motion.div
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
                    <Users className="h-6 w-6" />
                  </span>
                  My Role
                </h2>

                <div className="grid md:grid-cols-2 gap-8 relative z-10">
                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                    <h3 className="font-medium text-[#0a192f] mb-4 flex items-center">
                      <span className="bg-[#0046b8]/10 p-1.5 rounded-md mr-2">
                        <ListChecks className="h-5 w-5 text-[#0046b8]" />
                      </span>
                      Responsibilities
                    </h3>
                    <ul className="space-y-3 ml-2">
                      <li className="flex items-start gap-3 p-2 hover:bg-[#0046b8]/5 rounded-md transition-colors">
                        <div className="min-w-6 h-6 rounded-full bg-[#0046b8]/20 flex items-center justify-center text-[#0046b8] font-bold">
                          1
                        </div>
                        <span>
                          Defined the product vision and roadmap aligned with user needs and market opportunities.
                        </span>
                      </li>

                      <li className="flex items-start gap-3 p-2 hover:bg-[#0046b8]/5 rounded-md transition-colors">
                        <div className="min-w-6 h-6 rounded-full bg-[#0046b8]/20 flex items-center justify-center text-[#0046b8] font-bold">
                          2
                        </div>
                        <span>Drilled down business goals and user feedback into actionable product requirements.</span>
                      </li>

                      <li className="flex items-start gap-3 p-2 hover:bg-[#0046b8]/5 rounded-md transition-colors">
                        <div className="min-w-6 h-6 rounded-full bg-[#0046b8]/20 flex items-center justify-center text-[#0046b8] font-bold">
                          3
                        </div>
                        <span>
                          Led Agile ceremonies including sprint planning, daily stand-ups, and retrospectives.
                        </span>
                      </li>
                      <li className="flex items-start gap-3 p-2 hover:bg-[#0046b8]/5 rounded-md transition-colors">
                        <div className="min-w-6 h-6 rounded-full bg-[#0046b8]/20 flex items-center justify-center text-[#0046b8] font-bold">
                          4
                        </div>
                        <span>
                          Maintained and prioritized the product backlog based on business goals and technical input.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                    <h3 className="font-medium text-[#0a192f] mb-4 flex items-center">
                      <span className="bg-[#0046b8]/10 p-1.5 rounded-md mr-2">
                        <Award className="h-5 w-5 text-[#0046b8]" />
                      </span>
                      Key Contributions
                    </h3>
                    <ul className="space-y-3 ml-2">
                      <li className="flex items-start gap-3 p-2 hover:bg-[#0046b8]/5 rounded-md transition-colors">
                        <div className="min-w-6 h-6 rounded-full bg-[#0046b8]/20 flex items-center justify-center text-[#0046b8] font-bold">
                          <Trophy className="h-3.5 w-3.5" />
                        </div>
                        <span>
                          Launched the first NFT marketplace leveraging ERC-6551 with a gamified quest system.
                        </span>
                      </li>
                      <li className="flex items-start gap-3 p-2 hover:bg-[#0046b8]/5 rounded-md transition-colors">
                        <div className="min-w-6 h-6 rounded-full bg-[#0046b8]/20 flex items-center justify-center text-[#0046b8] font-bold">
                          <Trophy className="h-3.5 w-3.5" />
                        </div>
                        <span>
                          Designed progressive onboarding and a user-friendly interface to reduce learning curves.
                        </span>
                      </li>
                      <li className="flex items-start gap-3 p-2 hover:bg-[#0046b8]/5 rounded-md transition-colors">
                        <div className="min-w-6 h-6 rounded-full bg-[#0046b8]/20 flex items-center justify-center text-[#0046b8] font-bold">
                          <Trophy className="h-3.5 w-3.5" />
                        </div>
                        <span>Conducted user research and usability testing to drive UX decisions.</span>
                      </li>
                      <li className="flex items-start gap-3 p-2 hover:bg-[#0046b8]/5 rounded-md transition-colors">
                        <div className="min-w-6 h-6 rounded-full bg-[#0046b8]/20 flex items-center justify-center text-[#0046b8] font-bold">
                          <Trophy className="h-3.5 w-3.5" />
                        </div>
                        <span>
                          Established performance tracking using analytics dashboards for continuous improvement.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Business Challenge Section */}
              <motion.div
                id="business-challenge"
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
                  <h2 className="text-2xl font-bold text-[#0a192f]">Business Challenge</h2>
                </div>

                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute top-1/4 -left-4 w-8 h-8 rounded-full border-4 border-[#0046b8]/20 hidden md:block"></div>
                  <div className="absolute bottom-1/4 -right-4 w-12 h-12 rounded-full border-4 border-[#0046b8]/10 hidden md:block"></div>

                  <div className="space-y-8">
                    <div className="bg-gradient-to-r from-[#0a192f]/5 to-white p-6 rounded-lg border-l-4 border-[#0046b8] shadow-sm">
                      <p className="text-gray-700 text-lg">
                        Most NFT marketplaces
                        <span className="font-medium">
                          {" "}
                          offered no rewards, no community features, and limited utility
                        </span>
                        . NFTs were just static collectibles, and platforms lacked ways to keep users engaged beyond
                        simple trading. This led to low retention and reduced long-term interest.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div
                        variants={scaleIn}
                        className="bg-red-50 p-6 rounded-lg border border-red-100 relative overflow-hidden group hover:shadow-md transition-shadow"
                      >
                        {/* Decorative dart/target */}
                        <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full border-4 border-red-200 group-hover:scale-110 transition-transform"></div>
                        <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-red-200 group-hover:scale-110 transition-transform"></div>
                        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-red-400 group-hover:scale-110 transition-transform"></div>

                        <h3 className="flex items-center gap-2 text-lg font-medium text-red-800 mb-4">
                          <AlertTriangle className="h-5 w-5" />
                          Market Challenges
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3 p-2 hover:bg-red-100/50 rounded-md transition-colors">
                            <div className="min-w-6 h-6 rounded-full bg-red-200 flex items-center justify-center text-red-800 font-bold">
                              1
                            </div>
                            <span className="text-red-700">90% drop in NFT trading volume from 2022 peak</span>
                          </li>
                          <li className="flex items-start gap-3 p-2 hover:bg-red-100/50 rounded-md transition-colors">
                            <div className="min-w-6 h-6 rounded-full bg-red-200 flex items-center justify-center text-red-800 font-bold">
                              2
                            </div>
                            <span className="text-red-700">Average user engagement under 30 seconds per session</span>
                          </li>
                          <li className="flex items-start gap-3 p-2 hover:bg-red-100/50 rounded-md transition-colors">
                            <div className="min-w-6 h-6 rounded-full bg-red-200 flex items-center justify-center text-red-800 font-bold">
                              3
                            </div>
                            <span className="text-red-700">Limited functionality beyond basic ownership</span>
                          </li>
                          <li className="flex items-start gap-3 p-2 hover:bg-red-100/50 rounded-md transition-colors">
                            <div className="min-w-6 h-6 rounded-full bg-red-200 flex items-center justify-center text-red-800 font-bold">
                              4
                            </div>
                            <span className="text-red-700">Shifting expectations among early NFT users</span>
                          </li>
                        </ul>
                      </motion.div>

                      <motion.div
                        variants={scaleIn}
                        className="bg-blue-50 p-6 rounded-lg border border-blue-100 relative overflow-hidden group hover:shadow-md transition-shadow"
                      >
                        {/* Decorative lightbulb rays */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-200/20 rounded-full group-hover:scale-110 transition-transform"></div>
                        <div className="absolute -top-3 -right-3 w-12 h-12 bg-blue-200/30 rounded-full group-hover:scale-110 transition-transform"></div>

                        <h3 className="flex items-center gap-2 text-lg font-medium text-blue-800 mb-4">
                          <Lightbulb className="h-5 w-5" />
                          Opportunity Identified
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3 p-2 hover:bg-blue-100/50 rounded-md transition-colors">
                            <div className="min-w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center text-blue-800">
                              <Zap className="h-3.5 w-3.5" />
                            </div>
                            <span className="text-blue-700">
                              Introduce utility through ERC-6551, enabling NFTs to own and interact with other digital
                              assets.
                            </span>
                          </li>
                          <li className="flex items-start gap-3 p-2 hover:bg-blue-100/50 rounded-md transition-colors">
                            <div className="min-w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center text-blue-800">
                              <Zap className="h-3.5 w-3.5" />
                            </div>
                            <span className="text-blue-700">
                              Incentivize user behavior with quest systems, and token-based rewards to boost retention
                              and engagement.
                            </span>
                          </li>
                          <li className="flex items-start gap-3 p-2 hover:bg-blue-100/50 rounded-md transition-colors">
                            <div className="min-w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center text-blue-800">
                              <Zap className="h-3.5 w-3.5" />
                            </div>
                            <span className="text-blue-700">
                              Transform the marketplace into a social experience, creating community-driven features.
                            </span>
                          </li>
                          <li className="flex items-start gap-3 p-2 hover:bg-blue-100/50 rounded-md transition-colors">
                            <div className="min-w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center text-blue-800">
                              <Zap className="h-3.5 w-3.5" />
                            </div>
                            <span className="text-blue-700">
                              Position the platform as a first mover in delivering interactive and gamified NFT
                              ownership.
                            </span>
                          </li>
                        </ul>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Product Solution Section */}
              <motion.div
                id="strategic-solution"
                className="mb-16 pt-8"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-[#0046b8] text-white">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0a192f]">Product Solution</h2>
                </div>

                <div className="space-y-8">
                  <div className="bg-gradient-to-r from-[#0a192f]/5 to-white p-6 rounded-lg border-l-4 border-[#0046b8] shadow-sm">
                    <p className="text-gray-700 text-lg">
                      I worked closely with the team to shape and deliver the ADOT NFT Marketplace, introducing features
                      that changed how users interacted with digital collectibles and increased overall engagement.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 relative">
                      {/* Decorative element */}
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#0046b8]"></div>

                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0046b8] text-white font-bold">
                          1
                        </div>
                        <h3 className="text-xl font-bold text-[#0a192f]">ERC-6551 Dressing Room</h3>
                      </div>

                      <p className="text-gray-700 mb-6 ml-11">
                        We pioneered the implementation of the ERC-6551 token standard, allowing NFTs to own other
                        assets and creating a new paradigm for digital collectibles.
                      </p>

                      <div className="flex flex-col gap-6 mt-6">
                        <div className="relative h-56 sm:h-64 md:h-72 rounded-lg overflow-hidden shadow-md transform transition-transform hover:scale-[1.02] group mx-auto w-full max-w-xl sm:max-w-2xl">
                          <Image
                            src="/images/adot-dressing-room.png"
                            alt="ADOT Dressing Room Feature"
                            fill
                            className="object-cover object-center"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                            <div className="p-4 text-white">
                              <h4 className="font-bold">ERC-6551 Dressing Room</h4>
                              <p className="text-sm">NFTs that can own other assets and accessories</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3 bg-[#f8fafc] p-4 rounded-lg">
                          <h4 className="font-medium text-[#0a192f] flex items-center">
                            <span className="bg-[#0046b8]/10 p-1.5 rounded-md mr-2">
                              <Lightbulb className="h-4 w-4 text-[#0046b8]" />
                            </span>
                            Product Decisions:
                          </h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2 p-2 hover:bg-white rounded-md transition-colors">
                              <div className="min-w-5 h-5 flex items-center justify-center mt-0.5">
                                <ChevronRight className="h-4 w-4 text-[#0046b8]" />
                              </div>
                              <span>
                                <strong>NFTs as Digital Identities:</strong> used ERC-6551 to turn NFTs into smart
                                wallets that hold assets and wear accessories.
                              </span>
                            </li>
                            <li className="flex items-start gap-2 p-2 hover:bg-white rounded-md transition-colors">
                              <div className="min-w-5 h-5 flex items-center justify-center mt-0.5">
                                <ChevronRight className="h-4 w-4 text-[#0046b8]" />
                              </div>
                              <span>
                                <strong>Web3 Login via NFT Avatars:</strong> enabled users to access Web3 platforms
                                using their equipped NFTs.
                              </span>
                            </li>
                            <li className="flex items-start gap-2 p-2 hover:bg-white rounded-md transition-colors">
                              <div className="min-w-5 h-5 flex items-center justify-center mt-0.5">
                                <ChevronRight className="h-4 w-4 text-[#0046b8]" />
                              </div>
                              <span>
                                <strong>Tiered Accessory for Creators:</strong> built a rarity-based system to boost
                                collection engagement and retention.
                              </span>
                            </li>
                            <li className="flex items-start gap-2 p-2 hover:bg-white rounded-md transition-colors">
                              <div className="min-w-5 h-5 flex items-center justify-center mt-0.5">
                                <ChevronRight className="h-4 w-4 text-[#0046b8]" />
                              </div>
                              <span>
                                <strong>Accessory Integration:</strong> launched a marketplace for users to trade
                                accessories, supporting collection dynamics and creator monetization.
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 relative">
                      {/* Decorative element */}
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#0046b8]"></div>

                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0046b8] text-white font-bold">
                          2
                        </div>
                        <h3 className="text-xl font-bold text-[#0a192f]">Quest & Reward System</h3>
                      </div>

                      <p className="text-gray-700 mb-6 ml-11">
                        I led the design of a gamified quest system that turned passive NFT ownership into an engaging,
                        progression-based experience, driving retention and deepening user loyalty.
                      </p>

                      <div className="flex flex-col gap-6 mt-6">
                        <div className="relative h-56 sm:h-64 md:h-72 rounded-lg overflow-hidden shadow-md transform transition-transform hover:scale-[1.02] group mx-auto w-full max-w-xl sm:max-w-2xl">
                          <Image
                            src="/images/adot-quest-reward.png"
                            alt="ADOT Quest & Reward System"
                            fill
                            className="object-cover object-center"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                            <div className="p-4 text-white">
                              <h4 className="font-bold">Quest & Reward System</h4>
                              <p className="text-sm">Gamified experience with progression and rewards</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3 bg-[#f8fafc] p-4 rounded-lg">
                          <h4 className="font-medium text-[#0a192f] flex items-center">
                            <span className="bg-[#0046b8]/10 p-1.5 rounded-md mr-2">
                              <Lightbulb className="h-4 w-4 text-[#0046b8]" />
                            </span>
                            Product Decisions:
                          </h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-3 p-2 hover:bg-white rounded-md transition-colors">
                              <div className="min-w-6 h-6 flex items-center justify-center">
                                <ChevronRight className="h-5 w-5 text-[#0046b8]" />
                              </div>
                              <span>
                                <strong>Gamified NFT Ownership:</strong> designed a progression-based system that turned
                                passive holding into an interactive, incentive-driven experience.
                              </span>
                            </li>
                            <li className="flex items-start gap-3 p-2 hover:bg-white rounded-md transition-colors">
                              <div className="min-w-6 h-6 flex items-center justify-center">
                                <ChevronRight className="h-5 w-5 text-[#0046b8]" />
                              </div>
                              <span>
                                <strong>Daily & Event-Based Quests:</strong> introduced recurring and time-limited
                                quests to keep users engaged and coming back.
                              </span>
                            </li>
                            <li className="flex items-start gap-3 p-2 hover:bg-white rounded-md transition-colors">
                              <div className="min-w-6 h-6 flex items-center justify-center">
                                <ChevronRight className="h-5 w-5 text-[#0046b8]" />
                              </div>
                              <span>
                                <strong>NFT Boosters:</strong> created utility NFTs that boost rewards and grant a share
                                of platform fee distribution in 3 differenet currencies.
                              </span>
                            </li>
                            <li className="flex items-start gap-3 p-2 hover:bg-white rounded-md transition-colors">
                              <div className="min-w-6 h-6 flex items-center justify-center">
                                <ChevronRight className="h-5 w-5 text-[#0046b8]" />
                              </div>
                              <span>
                                <strong>Competitive Leaderboards:</strong> launched ranking systems to encourage
                                competition and increase user retention.
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Results & Impact Section */}
              <motion.div
                id="results"
                className="mb-16 pt-8"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-[#0046b8] text-white">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0a192f]">Results & Business Impact</h2>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-[#0a192f]/5 to-white p-6 rounded-lg border-l-4 border-[#0046b8] shadow-sm">
                    <p className="text-gray-700 text-lg">
                      The ADOT NFT marketplace has achieved significant business results, establishing itself as a
                      leader in the next generation of NFT platforms.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div
                      variants={scaleIn}
                      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow group"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0046b8]/10 mb-3 group-hover:bg-[#0046b8]/20 transition-colors">
                        <Users className="h-8 w-8 text-[#0046b8]" />
                      </div>
                      <h3 className="text-3xl font-bold text-[#0046b8]">25K+</h3>
                      <p className="text-gray-700 text-sm">Active Users</p>
                    </motion.div>
                    <motion.div
                      variants={scaleIn}
                      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow group"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0046b8]/10 mb-3 group-hover:bg-[#0046b8]/20 transition-colors">
                        <TrendingUp className="h-8 w-8 text-[#0046b8]" />
                      </div>
                      <h3 className="text-3xl font-bold text-[#0046b8]">230%</h3>
                      <p className="text-gray-700 text-sm">User Growth</p>
                    </motion.div>
                    <motion.div
                      variants={scaleIn}
                      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow group"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0046b8]/10 mb-3 group-hover:bg-[#0046b8]/20 transition-colors">
                        <Clock className="h-8 w-8 text-[#0046b8]" />
                      </div>
                      <h3 className="text-3xl font-bold text-[#0046b8]">810%</h3>
                      <p className="text-gray-700 text-sm">Engagement Increase</p>
                    </motion.div>
                  </div>

                  <div className="mt-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow relative overflow-hidden">
                      {/* Decorative element */}
                      <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-[#0046b8]/5"></div>

                      <h3 className="text-lg font-bold text-[#0a192f] mb-4 flex items-center">
                        <span className="bg-[#0046b8]/10 p-2 rounded-full mr-2">
                          <Award className="h-5 w-5 text-[#0046b8]" />
                        </span>
                        Industry Recognition
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2 p-2 hover:bg-[#f8fafc] rounded-md transition-colors">
                          <Award className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Exclusive live interview at attn live in NFT NYC 2024</span>
                        </li>
                        <li className="flex items-start gap-2 p-2 hover:bg-[#f8fafc] rounded-md transition-colors">
                          <Award className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Presented at Blockchain Genesis 2023 and 2024</span>
                        </li>
                        <li className="flex items-start gap-2 p-2 hover:bg-[#f8fafc] rounded-md transition-colors">
                          <Award className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>MOU signing Australia-Thailand FinTech Connect"</span>
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
