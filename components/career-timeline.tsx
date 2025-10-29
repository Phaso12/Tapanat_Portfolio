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
    role: "Product Manager (Banking)",
    organization: "Kiatnakin Phatra Bank",
    type: "work",
    icon: <Briefcase className="h-6 w-6 text-white" />,
  },
]

// Animation variants for fade-up
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

// Update the timeline container for better tablet support
const containerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "100%", // Changed from 1200px to 100%
  margin: "0 auto",
  padding: "0.75rem 0.75rem sm:1rem 1rem",
  textAlign: "center",
  overflowX: "hidden", // Added overflow-x: hidden
}

// Mobile stepper outer style with horizontal scrolling
const mobileStepperOuterStyle: React.CSSProperties = {
  overflowX: "auto",
  WebkitOverflowScrolling: "touch",
  scrollbarWidth: "none", // Firefox
  msOverflowStyle: "none", // IE/Edge
}

// Desktop stepper outer style without scrolling
const desktopStepperOuterStyle: React.CSSProperties = {
  overflowX: "hidden", // Added overflow-x: hidden
}

// Mobile stepper container style with minimum width
const mobileStepperContainerStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  minWidth: "800px", // This is likely causing the issue
  paddingBottom: "1.5rem",
}

// Desktop stepper container style with percentage width
const desktopStepperContainerStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: "100%",
  paddingBottom: "1.5rem",
}

// Update the lineStyle to include a pseudo-element for the arrowhead
const lineStyle: React.CSSProperties = {
  position: "absolute",
  top: "55px",
  left: 0,
  right: "10px", // Adjust right to make space for the arrowhead
  height: "3px",
  // A gradient from darker to lighter navy
  background: "linear-gradient(to right, #005BE2, #0046b8)",
  zIndex: 1,
}

// Add tablet-specific styles for the timeline steps
const stepStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minWidth: "120px",
  margin: "0 0.5rem sm:0 0.75rem md:0 1rem",
  zIndex: 2,
}

// Mobile year style (original size)
const mobileYearStyle: React.CSSProperties = {
  marginBottom: "0.5rem",
  fontWeight: 700,
  fontSize: "1.1rem",
  whiteSpace: "nowrap", // Add this to prevent text wrapping
}

// Desktop year style (smaller size)
const desktopYearStyle: React.CSSProperties = {
  marginBottom: "0.5rem",
  fontWeight: 700,
  fontSize: "0.9rem",
}

// Update year style for tablet views
const tabletYearStyle: React.CSSProperties = {
  marginBottom: "0.5rem",
  fontWeight: 700,
  fontSize: "1rem",
  whiteSpace: "nowrap",
}

// Mobile role style (original size)
const mobileRoleStyle: React.CSSProperties = {
  marginTop: "0.5rem",
  fontSize: "1rem",
  fontWeight: "bold",
}

// Desktop role style (smaller size)
const desktopRoleStyle: React.CSSProperties = {
  marginTop: "0.5rem",
  fontSize: "0.85rem",
  fontWeight: "bold",
}

// Mobile organization style (original size)
const mobileOrganizationStyle: React.CSSProperties = {
  fontSize: "0.9rem",
  fontStyle: "italic",
  opacity: 0.8,
}

// Desktop organization style (smaller size)
const desktopOrganizationStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  fontStyle: "italic",
  opacity: 0.8,
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

// Navigation arrow styles
const navArrowStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: "40px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: "50%",
  cursor: "pointer",
  zIndex: 10,
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
}

const CareerTimeline: React.FC = () => {
  const [showLeftArrow, setShowRightArrow] = useState(false)
  const [showRightArrow, setShowLeftArrow] = useState(true)
  const [isScrollable, setIsScrollable] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  // Reference to the scrollable container
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  // Check if timeline is scrollable and update arrow visibility
  const checkScrollability = () => {
    const container = scrollContainerRef.current
    if (container) {
      // Check if we're on mobile or tablet
      const mobileView = window.innerWidth < 768
      const tabletView = window.innerWidth >= 768 && window.innerWidth <= 834

      setIsMobile(mobileView)
      setIsTablet(tabletView)

      // Only check scrollability on mobile
      const isContentScrollable = mobileView && container.scrollWidth > container.clientWidth
      setIsScrollable(isContentScrollable)

      // Only show arrows if content is scrollable
      if (isContentScrollable) {
        setShowLeftArrow(container.scrollLeft > 20)
        setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 20)
      } else {
        setShowLeftArrow(false)
        setShowRightArrow(false)
      }
    }
  }

  // Handle scroll events
  const handleScroll = () => {
    checkScrollability()
  }

  // Check scrollability on mount and resize
  useEffect(() => {
    checkScrollability()
    window.addEventListener("resize", checkScrollability)
    return () => window.removeEventListener("resize", checkScrollability)
  }, [])

  // Scroll left or right
  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = container.clientWidth / 2
      const newScrollLeft =
        direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount

      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  return (
    <section style={containerStyle} className="career-timeline-container">
      {/* Add "Full Timeline" heading - only on desktop */}
      {!isMobile && <h3 className="text-base font-medium text-[#0a192f] mb-4 italic">Full Timeline</h3>}

      {/* Show scroll indicator only on mobile */}
      {isScrollable && (
        <div className="mb-4 text-center text-sm text-gray-500">
          <span>Scroll for Full Timeline</span>
        </div>
      )}

      {/* Navigation arrows removed */}

      <div className="relative">
        <div
          ref={scrollContainerRef}
          style={isMobile ? mobileStepperOuterStyle : desktopStepperOuterStyle}
          onScroll={handleScroll}
          className="md:overflow-hidden" // Changed from overflow-visible to overflow-hidden
        >
          <div
            style={isMobile ? mobileStepperContainerStyle : desktopStepperContainerStyle}
            className={isTablet ? "tablet-timeline-container" : ""}
          >
            {/* Horizontal gradient line */}
            <div style={lineStyle}></div>

            {/* Arrowhead at the end of the line - now on both mobile and desktop */}
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

            {/* Each milestone */}
            {timelineEvents.map((event) => (
              <motion.div
                key={`${event.year}-${event.role}`}
                style={stepStyle}
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <div style={isMobile ? mobileYearStyle : desktopYearStyle}>{event.year}</div>
                <div style={bulletStyle}>{event.icon}</div>
                <div style={isMobile ? mobileRoleStyle : desktopRoleStyle}>{event.role}</div>
                <div style={isMobile ? mobileOrganizationStyle : desktopOrganizationStyle}>{event.organization}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CareerTimeline
