"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { GraduationCap, Briefcase } from "lucide-react"

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

// Animation variants for fade-up
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

// Container
const containerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "100%",
  margin: "0 auto",
  padding: "0.75rem 0.75rem sm:1rem 1rem",
  textAlign: "center",
  overflowX: "hidden",
}

// Mobile scroll wrapper
const mobileStepperOuterStyle: React.CSSProperties = {
  overflowX: "auto",
  WebkitOverflowScrolling: "touch",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
}

// Desktop wrapper
const desktopStepperOuterStyle: React.CSSProperties = {
  overflowX: "hidden",
}

// Mobile container (give more width to fit the extra item)
const mobileStepperContainerStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  minWidth: "960px",          // more room so items aren’t cramped
  paddingBottom: "1.5rem",
}

// Desktop container
const desktopStepperContainerStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: "100%",
  paddingBottom: "1.5rem",
}

// Horizontal line (original approach, with a bit more space for arrowhead)
const lineStyle: React.CSSProperties = {
  position: "absolute",
  top: "55px",
  left: 0,
  right: "12px", // was 10px; leaves room for arrowhead
  height: "3px",
  background: "linear-gradient(to right, #005BE2, #0046b8)",
  zIndex: 1,
}

// Arrowhead (always render, above line & bullets)
const arrowHeadStyle: React.CSSProperties = {
  position: "absolute",
  top: "50.5px",
  right: 0,
  width: 0,
  height: 0,
  borderTop: "6px solid transparent",
  borderBottom: "6px solid transparent",
  borderLeft: "10px solid #0046b8",
  zIndex: 3,
  pointerEvents: "none",
}

// Step (keep it simple; no tailwind-like strings in inline CSS)
const stepStyleBase: React.CSSProperties = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 2,
}

// Text styles
const mobileYearStyle: React.CSSProperties = {
  marginBottom: "0.5rem",
  fontWeight: 700,
  fontSize: "1rem", // slightly smaller to avoid “2025 2025” crowding
  whiteSpace: "nowrap",
}

const desktopYearStyle: React.CSSProperties = {
  marginBottom: "0.5rem",
  fontWeight: 700,
  fontSize: "0.9rem",
}

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

const CareerTimeline: React.FC = () => {
  // keep states (even if arrows are not shown) for future use
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [isScrollable, setIsScrollable] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const checkScrollability = () => {
    const container = scrollContainerRef.current
    if (!container) return

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

  const handleScroll = () => checkScrollability()

  useEffect(() => {
    checkScrollability()
    window.addEventListener("resize", checkScrollability)
    return () => window.removeEventListener("resize", checkScrollability)
  }, [])

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (!container) return
    const scrollAmount = container.clientWidth / 2
    const newScrollLeft =
      direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount
    container.scrollTo({ left: newScrollLeft, behavior: "smooth" })
  }

  // Wider per-step width on mobile/tablet to prevent year labels from touching
  const computedStepStyle: React.CSSProperties = {
    ...stepStyleBase,
    minWidth: isMobile ? 160 : isTablet ? 140 : 120, // main fix (no gaps needed)
    margin: "0",                                     // spacing handled by flex layout
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
            {/* Continuous line + arrowhead (always render) */}
            <div style={lineStyle}></div>
            <div style={arrowHeadStyle}></div>

            {/* Steps */}
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
