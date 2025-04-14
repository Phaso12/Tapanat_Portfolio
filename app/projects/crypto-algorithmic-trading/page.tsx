"use client"

import type React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import {
  TrendingUp,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Target,
  Briefcase,
  Menu,
  X,
  TrendingDown,
  DollarSign,
  Code,
  Database,
  FileText,
  Users,
  Home,
} from "lucide-react"
import { TRADING_PROFIT } from "@/lib/constants"
import GraphModal from "@/components/graph-modal"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CryptoAlgorithmicTrading() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Add a new state for the trading graph modal right after the useEffect hook
  const [isGraphModalOpen, setIsGraphModalOpen] = useState(false)
  const [selectedGraphUrl, setSelectedGraphUrl] = useState<string | null>(null)

  // Add state and functions for the sidebar
  const [activeSection, setActiveSection] = useState("overview")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Add these refs and state variables right after the existing state declarations
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Update the sections array to remove the Home item from the top
  const sections = [
    { id: "overview", name: "Project Context", icon: <FileText className="h-5 w-5" /> },
    { id: "business-challenge", name: "Business Challenge", icon: <Target className="h-5 w-5" /> },
    { id: "Trading Logic", name: "Trading Logic", icon: <Lightbulb className="h-5 w-5" /> },
    { id: "execution", name: "Execution Strategy", icon: <Users className="h-5 w-5" /> },
    { id: "impact-learning", name: "Impact & Learning", icon: <TrendingUp className="h-5 w-5" /> },
  ]

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

  // Add a function to open the graph modal
  const openGraphModal = (imageUrl: string) => {
    setSelectedGraphUrl(imageUrl)
    setIsGraphModalOpen(true)
  }

  // Add a function to close the graph modal
  const closeGraphModal = () => {
    setIsGraphModalOpen(false)
    setSelectedGraphUrl(null)
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

  // Format the trading profit with commas
  const formattedTradingProfit = TRADING_PROFIT.toLocaleString()

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

  // Add the sidebar components to the JSX, right after the opening div of the component return
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
              <p className="text-base text-center text-white font-medium">Cryptocurrency Algorithmic Trading</p>
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
              <p className="text-base text-center text-white font-medium">Cryptoccurrency Algorithmic Trading</p>
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

      {/* Main content - update the existing div to include md:ml-64 */}
      <main className="flex-1 md:ml-64">
        <div className="bg-white overflow-hidden">
          {/* Hero Section */}
          <div id="overview" className="relative h-[400px] w-full overflow-hidden">
            <Image
              src="/images/market-making-strategy.png"
              alt="Algorithmic Market-Making Bot (Gate & MEXC)"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Cryptocurrency Algorithmic Trading</h1>
              {/*<p className="text-white/90 text-lg md:text-xl max-w-3xl">
                Python-based trading bot for Gate.io exchange that increased liquidity and generated $
                {formattedTradingProfit} in profits
              </p>*/}
            </div>
          </div>

          {/* KPI Dashboard Section - Redesigned */}
          <div className="bg-gradient-to-br from-[#0a192f]/5 to-[#0046b8]/5 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-[#0a192f] mb-8 text-center">Performance Dashboard</h2>

            {/* Key Metrics Cards - Redesigned with more visual interest */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              <motion.div
                variants={item}
                className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center transform transition-transform hover:scale-105"
              >
                <div className="p-3 rounded-full bg-[#0046b8]/10 text-[#0046b8] mb-3">
                  <DollarSign className="h-7 w-7" />
                </div>
                <h3 className="text-3xl font-bold text-[#0046b8]">${formattedTradingProfit}</h3>
                <p className="text-gray-600 text-sm mt-1">Trading Profit</p>
              </motion.div>

              <motion.div
                variants={item}
                className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center transform transition-transform hover:scale-105"
              >
                <div className="p-3 rounded-full bg-[#0046b8]/10 text-[#0046b8] mb-3">
                  <TrendingDown className="h-7 w-7" />
                </div>
                <h3 className="text-3xl font-bold text-[#0046b8]">78%</h3>
                <p className="text-gray-600 text-sm mt-1">Spread Reduction</p>
              </motion.div>

              <motion.div
                variants={item}
                className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center transform transition-transform hover:scale-105"
              >
                <div className="p-3 rounded-full bg-[#0046b8]/10 text-[#0046b8] mb-3">
                  <TrendingUp className="h-7 w-7" />
                </div>
                <h3 className="text-3xl font-bold text-[#0046b8]">42%</h3>
                <p className="text-gray-600 text-sm mt-1">Volume Growth</p>
              </motion.div>
            </div>

            {/* Trading Performance Chart - Expanded and more prominent */}
            <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-md border border-gray-200 mb-6 sm:mb-7 md:mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#0a192f]">Monthly Trading Performance</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openGraphModal("/images/trading-graph.png")}
                  className="text-[#0046b8] border-[#0046b8]/30 hover:bg-[#0046b8]/10"
                >
                  View Full Size
                </Button>
              </div>
              <div
                className="relative h-80 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.01]"
                onClick={() => openGraphModal("/images/trading-graph.png")}
                role="button"
                tabIndex={0}
                aria-label="View Monthly Trading Performance Chart in full size"
                onKeyDown={(e) => e.key === "Enter" && openGraphModal("/images/trading-graph.png")}
              >
                <Image
                  src="/images/trading-graph.png"
                  alt="Monthly Trading Performance Chart"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Trading Strategy Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-green-100 text-green-600">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-[#0a192f]">Dual-Sided Trading</h3>
                </div>
                <p className="text-gray-700 text-sm flex-grow">
                  Used two accounts to post buy and sell orders around the mid-market price, creating balanced market
                  presence.
                </p>
                <div className="mt-4"></div>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <Code className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-[#0a192f]">Python Implementation</h3>
                </div>
                <p className="text-gray-700 text-sm flex-grow">
                  Built with Python for Gate and MEXC exchanges with dynamic price stepping and balance-aware execution
                  logic.
                </p>
                <div className="mt-4"></div>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                    <Database className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-[#0a192f]">Data Tracking</h3>
                </div>
                <p className="text-gray-700 text-sm flex-grow">
                  Comprehensive CSV logging of all orders with Telegram integration for real-time monitoring and
                  analysis.
                </p>
                <div className="mt-4"></div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              {/* Overview Section */}
              <motion.div
                id="overview"
                className="mb-16 bg-[#0a192f]/5 p-6 rounded-lg border border-[#0a192f]/10"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-[#0a192f] mb-4">Project Context</h2>
                <p className="text-gray-700">
                  I built a Python-based market-making bot for the Gate and MEXC exchanges, designed to simulate
                  consistent trading volume and capture micro-profits on low-activity tokens like CROWN. The primary
                  goal was not liquidity provisioning, but rather creating market presence through automated, balanced
                  buy/sell execution.
                </p>
              </motion.div>

              {/* Business Challenge Section */}
              <motion.div
                id="business-challenge"
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
                  <h2 className="text-2xl font-bold text-[#0a192f]">Business Challenge</h2>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-700">
                    The CROWN token suffered from low trading activity and wide bid-ask spreads, averaging around 3.2%.
                    This discouraged participation and created price friction for both buyers and sellers.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-red-50 p-6 rounded-lg border border-red-100">
                      <h3 className="flex items-center gap-2 text-lg font-medium text-red-800 mb-3">
                        <AlertTriangle className="h-5 w-5" />
                        Market Challenges
                      </h3>
                      <ul className="space-y-2 text-red-700">
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <span>Wide bid-ask spreads (averaging 3.2%) limiting trading activity</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <span>Shallow order books causing high price volatility</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <span>Limited trading volume on Gate.io exchange</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <span>Poor user experience due to low market activity</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                      <h3 className="flex items-center gap-2 text-lg font-medium text-blue-800 mb-3">
                        <Lightbulb className="h-5 w-5" />
                        Business Opportunity
                      </h3>
                      <ul className="space-y-2 text-blue-700">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>Create market presence through automated trading</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>Capture micro-profits from spread differences</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>Improve token visibility without heavy capital investment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>Develop a reusable framework for future trading strategies</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Strategic Approach Section */}
              <motion.div
                id="Trading Logic"
                className="mb-16"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-[#0046b8]/10">
                    <Lightbulb className="h-6 w-6 text-[#0046b8]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0a192f]">Trading Logic</h2>
                </div>

                <div className="space-y-8">
                  {/*<p className="text-gray-700">
                    I designed a comprehensive market-making solution with multiple features to ensure effective and
                    safe operation.
                  </p>*/}

                  <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden p-6">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                        <span>
                          Dual-sided market-making using two accounts to post buy and sell orders around the mid-market
                          price
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                        <span>Spread-based price adjustment logic with dynamic price stepping</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                        <span>
                          Balance-aware execution, including fallback switching between Port A and B based on asset
                          availability
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                        <span>Auto-cancellation modes (Buy-only or Buy & Sell) for controlled exposure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                        <span>Portfolio tracking with live balance checks and CSV-based result logging</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                        <span>Telegram integration for sending logs post-session</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                        <span>Developer mode for low-risk parameter tuning and testing</span>
                      </li>
                    </ul>
                  </div>

                  {/* Technical Architecture Diagram */}
                  <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-[#0a192f]">Technical Architecture (Flow)</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openGraphModal("/images/trading-flow-diagram.png")}
                        className="text-[#0046b8] border-[#0046b8]/30 hover:bg-[#0046b8]/10"
                      >
                        View Full Size
                      </Button>
                    </div>
                    <div
                      className="relative w-full h-[400px] rounded-lg overflow-hidden border border-gray-200 cursor-pointer transition-transform hover:scale-[1.01]"
                      onClick={() => openGraphModal("/images/trading-flow-diagram.png")}
                      role="button"
                      tabIndex={0}
                      aria-label="View Technical Architecture Flow Diagram in full size"
                      onKeyDown={(e) => e.key === "Enter" && openGraphModal("/images/trading-flow-diagram.png")}
                    >
                      <Image
                        src="/images/trading-flow-diagram.png"
                        alt="Technical Architecture Flow Diagram"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      The diagram illustrates the complete workflow of the market-making bot, from input parameters and
                      trade loop through order tracking and session completion. It shows how the bot processes trades
                      sequentially, manages orders, and includes security features and balance tracking.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Execution & Implementation Section */}
              <motion.div
                id="execution"
                className="mb-16"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-[#0046b8]/10">
                    <Briefcase className="h-6 w-6 text-[#0046b8]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0a192f]">Execution Strategy</h2>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-700">
                    The implementation focused on creating a balanced market presence while carefully managing risk and
                    tracking performance.
                  </p>

                  <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden p-6">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                        <span>Adjusted listing prices between bid/ask spread using random placement logic</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                        <span>Executed concurrent buy/sell orders using separate API credentials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                        <span>Tracked fill rates, deal prices, and calculated % completion for every trade</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                        <span>Maintained CSV logs of all order details, including contextual pricing data</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-bold text-[#0a192f] mb-3">Technical Implementation</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Built with Python using Gate.io and MEXC REST API</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Implemented error handling and retry mechanisms</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Created modular code structure for maintainability</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Integrated with Telegram for real-time notifications</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <h3 className="text-lg font-bold text-[#0a192f] mb-3">Risk Management</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Implemented position limits to control exposure</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Created fallback mechanisms for unexpected market conditions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Developed testing mode for parameter optimization</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-[#0046b8] shrink-0 mt-0.5" />
                          <span>Monitored balance changes in real-time</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Results & Impact Section */}
              <motion.div
                id="impact-learning"
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
                  <h2 className="text-2xl font-bold text-[#0a192f]">Impact & Learning</h2>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-700">
                    The market-making bot delivered significant improvements to token trading conditions while
                    generating consistent profits.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
                      <h3 className="text-3xl font-bold text-[#0046b8]">${formattedTradingProfit}</h3>
                      <p className="text-gray-700 text-sm">Trading Profit</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
                      <h3 className="text-3xl font-bold text-[#0046b8]">78%</h3>
                      <p className="text-gray-700 text-sm">Spread Reduction</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
                      <h3 className="text-3xl font-bold text-[#0046b8]">42%</h3>
                      <p className="text-gray-700 text-sm">Volume Growth</p>
                    </div>
                  </div>

                  <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-[#0a192f] mb-3">Impact & Learning</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                        <span>Improved CROWN token trade visibility without heavy capital investment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                        <span>Reduced spread during bot operation, increasing trade likelihood</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                        <span>
                          Reinforced understanding of market microstructure, order book depth, and spread capture logic
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-[#0046b8] shrink-0 mt-0.5" />
                        <span>
                          Emphasized the importance of capital efficiency, order management, and timing logic in bot
                          execution
                        </span>
                      </li>
                    </ul>
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
          <GraphModal isOpen={isGraphModalOpen} graphUrl={selectedGraphUrl} onClose={closeGraphModal} />
        </div>
      </main>
    </div>
  )
}
