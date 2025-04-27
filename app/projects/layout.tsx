"use client"

import type React from "react"
import { useEffect } from "react"

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Scroll to top when layout mounts
  useEffect(() => {
    window.scrollTo(0, 0)

    // Add handler for viewport height in landscape mode
    const setViewportHeight = () => {
      // Set a CSS variable for viewport height that works better in mobile browsers
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    // Set initial value
    setViewportHeight()

    // Update on resize and orientation change
    window.addEventListener("resize", setViewportHeight)
    window.addEventListener("orientationchange", setViewportHeight)

    return () => {
      window.removeEventListener("resize", setViewportHeight)
      window.removeEventListener("orientationchange", setViewportHeight)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#f8fafc]" style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}>
      <div className="max-w-full mx-auto">{children}</div>
    </div>
  )
}
