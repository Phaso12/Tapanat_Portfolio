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
    organization: "Kiatnakin Phatra Financial Group",
    type: "work",
    icon: <Briefcase className="h-6 w-6 text-white" />,
  },
]

// Animation
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

// Styles
const containerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "100%",
  margin: "0 auto",
  padding: "0.75rem 0.75rem sm:1rem 1rem",
  textAlign: "center",
  overflowX: "hidden",
}

const scrollableOuterStyle: React.CSSProperties = {
  overflowX: "auto",
  WebkitOverflowScrolling: "touch",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
}

const desktopStepperOuterStyle: React.CSSProperties = {
  overflowX: "hidden",
}

const mobileStepperContainerStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  minWidth: "960px",
  paddingBottom: "1.5rem",
}

const desktopStepperContainerStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: "100%",
  paddingBottom: "1.5rem",
}

// Timeline line and arrow
const lineStyle: React.CSSProperties = {
  position: "absolute",
  top: "55px",
  left: 0,
  right: "10px",
  height: "3px",
  background: "linear-gradient(to right, #005BE2, #0046b8)",
  zIndex: 1,
}

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
}

// Step bullets
const stepStyleBase: React.CSSProperties = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 2,
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

// Text
const mobileYearStyle: React.CSSProperties = {
  marginBottom: "0.5rem",
  fontWeight: 700,
  fontSize: "1rem",
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

const CareerTimeline: React.FC = () => {
  const [isScrollable, setIsScrollable] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const checkScrollability = () => {
    const container = scrollContainerRef.current
    if (!container) return

    const mobileView = window.innerWidth < 768
    const tabletView = window.innerWidth >= 768 && window.innerWidth <= 1024

    setIsMobile(mobileView)
    setIsTablet(tabletView)

    const canScroll = (mobileView || tabletView) && container.scrollWidth > container.clientWidth
    setIsScrollable(canScroll)
  }

  useEffect(() => {
    checkScrollability()
    window.addEventListener("resize", checkScrollability)
    return () => window.removeEventListener("resize", checkScrollability)
  }, [])

  const computedStepStyle: React.CSSProperties = {
    ...stepStyleBase,
    minWidth: isMobile ? 160 : isTablet ? 140 : 120,
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
          style={isMobile || isTablet ? scrollableOuterStyle : desktopStepperOuterStyle}
          onScroll={checkScrollability}
          className="md:overflow-hidden"
        >
          <div
            style={isMobile || isTablet ? mobileStepperContainerStyle : desktopStepperContainerStyle}
          >
            {/* continuous line + arrowhead */}
            <div style={lineStyle}></div>
            <div style={arrowHeadStyle}></div>

            {/* steps */}
            {timelineEvents.map((event) => (
              <motion.div
                key={`${event.year}-${event.role}`}
                style={computedStepStyle}
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <div style={isMobile || isTablet ? mobileYearStyle : desktopYearStyle}>
                  {event.year}
                </div>
                <div style={bulletStyle}>{event.icon}</div>
                <div style={isMobile || isTablet ? mobileRoleStyle : desktopRoleStyle}>
                  {event.role}
                </div>

                <div style={isMobile || isTablet ? mobileOrganizationStyle : desktopOrganizationStyle}>
                  {/* Desktop-only custom wrap for KKPB */}
                  {event.organization === "Kiatnakin Phatra Financial Group" && !isMobile && !isTablet ? (
                    <>
                      Kiatnakin Phatra
                      <br />
                      <span style={{ whiteSpace: "nowrap" }}>Financial Group</span>
                    </>
                  ) : (
                    event.organization
                  )}
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
