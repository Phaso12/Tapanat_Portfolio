"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { GraduationCap, Briefcase, ChevronLeft, ChevronRight } from "lucide-react"

// --- Data ---
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

// --- Animation ---
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

// --- Layout constants ---
const MOBILE_STEP_MIN_PX = 140
const STEP_GAP_PX = 12
const LINE_TOP_PX = 55 // vertical position of the blue line

// --- Styles ---
const containerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "100%",
  margin: "0 auto",
  padding: "0.75rem",
  textAlign: "center",
  overflowX: "hidden",
}

// Scrollable viewport (desktop & mobile)
const scrollerOuterStyle: React.CSSProperties = {
  overflowX: "auto",
  overflowY: "hidden",
  WebkitOverflowScrolling: "touch",
  scrollbarWidth: "thin",
  padding: "0 2.5rem", // room so desktop nav buttons don't overlap content
}

// Inner flex container (desktop/tablet; width expands to content so it can scroll)
const desktopInnerStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  width: "max-content", // critical: prevents clipping, allows full content width
  paddingBottom: "1.5rem",
  gap: `${STEP_GAP_PX}px`,
}

// Mobile inner container (dynamic min-width so it scrolls)
const mobileInnerBase: React.CSSProperties = {
  position: "relative",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  paddingBottom: "1.5rem",
  gap: `${STEP_GAP_PX}px`,
}

const stepStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minWidth: `${MOBILE_STEP_MIN_PX}px`,
  zIndex: 2,
}

const lineStyle: React.CSSProperties = {
  position: "absolute",
  top: `${LINE_TOP_PX}px`,
  left: 0,
  right: "14px", // leave space for the arrowhead triangle
  height: "3px",
  background: "linear-gradient(to right, #005BE2, #0046b8)",
  zIndex: 1,
}

const yearMobile: React.CSSProperties = {
  marginBottom: "0.5rem",
  fontWeight: 700,
  fontSize: "1.1rem",
  whiteSpace: "nowrap",
}
const yearDesktop: React.CSSProperties = {
  marginBottom: "0.5rem",
  fontWeight: 700,
  fontSize: "0.9rem",
}

const roleMobile: React.CSSProperties = { marginTop: "0.5rem", fontSize: "1rem", fontWeight: "bold" }
const roleDesktop: React.CSSProperties = { marginTop: "0.5rem", fontSize: "0.85rem", fontWeight: "bold" }

const orgMobile: React.CSSProperties = { fontSize: "0.9rem", fontStyle: "italic", opacity: 0.8 }
const orgDesktop: React.CSSProperties = { fontSize: "0.75rem", fontStyle: "italic", opacity: 0.8 }

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
  backdropFilter: "blur(4px)",
  borderRadius: "50%",
  cursor: "pointer",
  zIndex: 10,
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
}

const CareerTimeline: React.FC = () => {
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [isScrollable, setIsScrollable] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const mobileMinWidthPx =
    timelineEvents.length * MOBILE_STEP_MIN_PX + (timelineEvents.length - 1) * STEP_GAP_PX

  const checkScrollability = () => {
    const container = scrollContainerRef.current
    if (!container) return
    const mobileView = window.innerWidth < 768
    setIsMobile(mobileView)

    const scrollable = container.scrollWidth > container.clientWidth
    setIsScrollable(scrollable)

    setShowLeftArrow(container.scrollLeft > 20)
    setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 20)
  }

  useEffect(() => {
    checkScrollability()
    window.addEventListener("resize", checkScrollability)
    return () => window.removeEventListener("resize", checkScrollability)
  }, [])

  const onScroll = () => checkScrollability()

  const scroll = (dir: "left" | "right") => {
    const el = scrollContainerRef.current
    if (!el) return
    const amt = Math.max(el.clientWidth * 0.6, 240)
    el.scrollTo({ left: el.scrollLeft + (dir === "left" ? -amt : amt), behavior: "smooth" })
  }

  return (
    <section style={containerStyle} className="career-timeline-container">
      {!isMobile && <h3 className="text-base font-medium text-[#0a192f] mb-4 italic">Full Timeline</h3>}

      {isMobile && isScrollable && (
        <div className="mb-4 text-center text-sm text-gray-500">Scroll for Full Timeline</div>
      )}

      <div className="relative">
        {/* Desktop/tablet nav buttons */}
        {!isMobile && isScrollable && (
          <>
            {showLeftArrow && (
              <button
                aria-label="Scroll left"
                style={{ ...navArrowStyle, left: "6px" }}
                onClick={() => scroll("left")}
              >
                <ChevronLeft size={22} />
              </button>
            )}
            {showRightArrow && (
              <button
                aria-label="Scroll right"
                style={{ ...navArrowStyle, right: "6px" }}
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
          onScroll={onScroll}
          className="overflow-x-auto"
        >
          <div
            style={
              isMobile
                ? { ...mobileInnerBase, minWidth: `${mobileMinWidthPx}px` }
                : desktopInnerStyle
            }
          >
            {/* Blue line */}
            <div style={lineStyle} />

            {/* Arrowhead aligned with the line (inside same container) */}
            <div
              style={{
                position: "absolute",
                top: `${LINE_TOP_PX}px`,
                right: 0,
                width: 0,
                height: 0,
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderLeft: "10px solid #0046b8",
                zIndex: 2,
              }}
            />

            {/* Steps */}
            {timelineEvents.map((event) => (
              <motion.div
                key={`${event.year}-${event.role}`}
                style={stepStyle}
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <div style={isMobile ? yearMobile : yearDesktop}>{event.year}</div>
                <div style={bulletStyle}>{event.icon}</div>
                <div style={isMobile ? roleMobile : roleDesktop}>{event.role}</div>
                <div style={isMobile ? orgMobile : orgDesktop}>{event.organization}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CareerTimeline
