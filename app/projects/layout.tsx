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
  }, [])

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-full mx-auto">{children}</div>
    </div>
  )
}
