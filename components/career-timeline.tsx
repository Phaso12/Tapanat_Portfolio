"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { GraduationCap, Briefcase, ChevronLeft, ChevronRight } from "lucide-react"

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

// Anim
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

// layout constants
const MOBILE_STEP_MIN_PX = 140
const STEP_GAP_PX = 12
const LINE_TOP_PX = 55

// styles
const containerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "100%",
  margin: "0 auto",
  padding: "0.75rem",
  textAlign: "center",
  overflowX: "hidden",
}

const scrollerOuterStyle: React.CSSProperties = {
  overflowX: "auto", // desktop: scroll with buttons; mobile: swipe
  WebkitOverflowScrolling: "touch",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
}

const desktopStepperContainerStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: "100%",
  paddingBottom: "1.5rem",
}

const stepStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minWidth: `${MOBILE_STEP_MIN_PX}px`,
  margin: `0 ${STEP_GAP_PX / 2}px`,
  zIndex: 2,
}

const lineStyle: React.CSSProperties = {
  position: "absolute",
  top: `${LINE_TOP_PX}px`,
  left: 0,
  right: "10px",
  height: "3px",
  background: "linear-gradient(to right, #005BE2, #0046b8)",
  zIndex: 1,
}

const mobileYearStyle: React.CSSProperties = {
  marginBottom: "0.5rem",
  fontWeight: 700,
  fontSize: "1.1rem",
  whiteSpace: "nowrap",
}

const desktopYearStyle: React.CSSProperties = {
  marginBottom: "0.5rem",
  fontWeight: 700,
  fontSize: "0.9rem",
}

const mobileRoleStyle: React.CSSProperties = { marginTop: "0.5rem", fontSize: "1rem", fontWeight: "bold" }
const desktopRoleStyle: React.CSSProperties = { marginTop: "0.5rem", fontSize: "0.85rem", fontWeight: "bold" }

const mobileOrganizationStyle: React.CSSProperties = { fontSize: "0.9rem", fontStyle: "italic", opacity: 0.8 }
const desktopOrganizationStyle: React.CSSProperties = { fontSize: "0.75rem", fontStyle: "italic", opacity: 0.8 }

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

const navArrowStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: "40px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(255,255,255,0.9)",
  borderRadius: "50%",
  cursor: "pointer",
  zIndex: 10,
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
}

// Arrowhead overlay fixed to right edge (never scrolls away)
const ArrowHead: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: `${LINE_TOP_PX + 0.5}px`,
      right: 0,
      width: 0,
      height: 0,
      borderTop: "6px solid transparent",
      borderBottom: "6px solid transparent",
      borderLeft: "10px solid #0046b8",
      zIndex: 5,
      pointerEvents: "none",
    }}
  />
)

const CareerTimeline: React.FC = () => {
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [isScrollable, setIsScrollable] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const computeMobileMinWidth = () =>
    timelineEvents.length * MOBILE_STEP_MIN_PX + (timelineEvents.length - 1) * STEP_GAP_PX

  const checkScrollability = () => {
    const container = scrollContainerRef.current
    if (!container) return

    const mobileView = window.innerWidth < 768
    const tabletView = window.innerWidth >= 768 && window.innerWidth <= 1024

    setIsMobile(mobileView)
    setIsTablet(tabletView)

    const scrollable = container.scrollWidth > container.clientWidth
    setIsScrollable(scrollable)

    setShowLeftArrow(container.scrollLeft > 20)
    setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 20)
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
    const amount = Math.max(container.clientWidth * 0.6, 240)
    container.scrollTo({ left: container.scrollLeft + (direction === "left" ? -amount : amount), behavior: "smooth" })
  }

  const mobileMinWidthPx = computeMobileMinWidth()

  return (
    <section style={containerStyle} className="career-timeline-container">
      {!isMobile && <h3 className="text-base font-medium text-[#0a192f] mb-4 italic">Full Timeline</h3>}

      {isScrollable && (
        <div className="mb-4 text-center text-sm text-gray-500">
          <span>Scroll for Full Timeline</span>
        </div>
      )}

      <div className="relative">
        {/* Fixed arrowhead & desktop nav buttons */}
        <ArrowHead />

        {/* Desktop left/right buttons (also show on tablet); hidden on small phones */}
        {!isMobile && isScrollable && (
          <>
            {showLeftArrow && (
              <button
                aria-label="Scroll left"
                style={{ ...navArrowStyle, left: 0 }}
                onClick={() => scroll("left")}
              >
                <ChevronLeft size={22} />
              </button>
            )}
            {showRightArrow && (
              <button
                aria-label="Scroll right"
                style={{ ...navArrowStyle, right: 0 }}
                onClick={() => scroll("right")}
              >
                <ChevronRight size={22} />
              </button>
            )}
          </>
        )}

        <div
          ref={scrollContainerRef}
          style={scrollerOuterStyle}
          onScroll={handleScroll}
          className="md:overflow-auto overflow-auto"
        >
          <div
            style={
              isMobile
                ? {
                    position: "relative",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    minWidth: `${mobileMinWidthPx}px`,
                    paddingBottom: "1.5rem",
                    gap: `${STEP_GAP_PX}px`,
                  }
                : desktopStepperContainerStyle
            }
            className={isTablet ? "tablet-timeline-container" : ""}
          >
            {/* gradient line (scrolls with content) */}
            <div style={lineStyle} />

            {/* milestones */}
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
