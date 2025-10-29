"use client"

import React from "react"
import { motion } from "framer-motion"
import { GraduationCap, Briefcase } from "lucide-react"
import { useState, useEffect } from "react"

const timelineEvents = [
  {
    year: "2012 - 2016",
    role: "Bachelor of Automotive Engineering",
    organization: "Thai-Nichi Institute of Technology",
    type: "education",
    icon: <GraduationCap className="h-6 w-6 text-white" />,
  },
  {
    year: "2016 - 2020",
    role: "Senior Automotive Engineer",
    organization: "Toyota Motor Asia Pacific",
    type: "work",
    icon: <Briefcase className="h-6 w-6 text-white" />,
  },
  {
    year: "2020 - 2022",
    role: "MSc in Financial Technology",
    organization: "University of Glasgow",
    type: "education",
    icon: <GraduationCap className="h-6 w-6 text-white" />,
  },
  {
    year: "2022 - 2023",
    role: "FinTech Specialist",
    organization: "T&B Media Global",
    type: "work",
    icon: <Briefcase className="h-6 w-6 text-white" />,
  },
  {
    year: "2023 - 2025",
    role: "Product Owner (Web3)",
    organization: "VUCA Digital",
    type: "work",
    icon: <Briefcase className="h-6 w-6 text-white" />,
  },
  {
    year: "2025 - Present",
    role: "Product Owner (Banking)",
    organization: "Kiatnakin Phatra Bank",
    type: "work",
    icon: <Briefcase className="h-6 w-6 text-white" />,
  },
]

// Animation variants
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

// Container styles
const containerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "100%",
  margin: "0 auto",
  padding: "0.75rem 0.75rem sm:1rem 1rem",
  textAlign: "center",
  overflowX: "hidden",
}

const mobileStepperOuterStyle: React.CSSProperties = {
  overflowX: "auto",
  WebkitOverflowScrolling: "touch",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
}

const desktopStepperOuterStyle: React.CSSProperties = {
  overflowX: "hidden",
}

// Spacing fix: add columnGap
const mobileStepperContainerStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  minWidth: "800px",
  paddingBottom: "1.5rem",
  columnGap: "1.25rem", // added
}

const desktopStepperContainerStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: "100%",
  paddingBottom: "1.5rem",
  columnGap: "1rem", // added
}

// Line and bullet
const lineStyle: React.CSSProperties = {
  position: "absolute",
  top: "55px",
  left: 0,
  right: "10px",
  height: "3px",
  background: "linear-gradient(to right, #005BE2, #0046b8)",
  zIndex: 1,
}

const bulletStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "linear-gradient(to bottom, #005BE2, #0046b8)",
  marginBottom: "0.5rem",
}

// Step styles
const stepStyleBase: React.CSSProperties = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 2,
}

// Year styles
const mobileYearStyle: React.CSSProperties = {
  marginBottom: "0.5rem",
  fontWeight: 700,
  fontSize: "1rem", // slightly smaller
  whiteSpace: "nowrap",
}

const desktopYearStyle: React.CSSProperties = {
  marginBottom: "0.5rem",
  fontWeight: 700,
  fontSize: "0.9rem",
}

// Role & org
const mobileRoleStyle: React.CSSProperties = {
  marginTop: "0.5rem",
  fontSize: "1rem",
  fontWeight: "bold",
}

const desktopRoleStyle: React.CSSProperties = {
  marginTop: "0.5rem",
  fontSize: "0.85rem",
  fontWeight: "bold",
}

const mobileOrganizationStyle: React.CSSProperties = {
  fontSize: "0.9rem",
  fontStyle: "italic",
  opacity: 0.8,
}

const desktopOrganizationStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  fontStyle: "italic",
  opacity: 0.8,
}

const CareerTimeline: React.FC = () => {
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [isScrollable, setIsScrollable] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const checkScrollability = () => {
    const container = scrollContainerRef.current
    if (container) {
      const mobileView = window.innerWidth < 768
      const tabletView = window.innerWidth >= 768 && window.innerWidth <= 834

      setIsMobile(mobileView)
      setIsTablet(tabletView)

      const isContentScrollable = mobileView && container.scrollWidth > container.clientWidth
      setIsScrollable(isContentScrollable)

      if (isContentScrollable) {
        setShowLeftArrow(container.scrollLeft > 20)
        setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 20)
      } else {
        setShowLeftArrow(false)
        setShowRightArrow(false)
      }
    }
  }

  const handleScroll = () => checkScrollability()

  useEffect(() => {
    checkScrollability()
    window.addEventListener("resize", checkScrollability)
    return () => window.removeEventListener("resize", checkScrollability)
  }, [])

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = container.clientWidth / 2
      const newScrollLeft =
        direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount
      container.scrollTo({ left: newScrollLeft, behavior: "smooth" })
    }
  }

  // Computed step width based on viewport
  const computedStepStyle: React.CSSProperties = {
    ...stepStyleBase,
    minWidth: isMobile ? 148 : isTablet ? 132 : 120,
    margin: "0",
  }

  return (
    <section style={containerStyle} className="career-timeline-container">
      {!isMobile && <h3 className="text-base font-medium text-[#0a192f] mb-4 italic">Full Timeline</h3>}

      {isScrollable && (
        <div className="mb-4 text-center text-sm text-gray-500">
          <span>Scroll for Full Timeline</span>
        </div>
      )}

      <div className="relative">
        <div
          ref={scrollContainerRef}
          style={isMobile ? mobileStepperOuterStyle : desktopStepperOuterStyle}
          onScroll={handleScroll}
          className="md:overflow-hidden"
        >
          <div
            style={isMobile ? mobileStepperContainerStyle : desktopStepperContainerStyle}
            className={isTablet ? "tablet-timeline-container" : ""}
          >
            <div style={lineStyle}></div>

            {!isMobile && (
              <div
                style={{
                  position: "absolute",
                  top: "50.5px",
                  right: 0,
                  width: 0,
                  height: 0,
                  borderTop: "6px solid transparent",
                  borderBottom: "6px solid transparent",
                  borderLeft: "10px solid #0046b8",
                  zIndex: 1,
                }}
              ></div>
            )}

            {timelineEvents.map((event) => (
              <motion.div
                key={`${event.year}-${event.role}`}
                style={computedStepStyle}
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <div style={isMobile ? mobileYearStyle : desktopYearStyle}>{event.year}</div>
                <div style={bulletStyle}>{event.icon}</div>
                <div style={isMobile ? mobileRoleStyle : desktopRoleStyle}>{event.role}</div>
                <div style={isMobile ? mobileOrganizationStyle : desktopOrganizationStyle}>
                  {event.organization}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CareerTimeline
