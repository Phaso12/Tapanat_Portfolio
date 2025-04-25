"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionContainerProps {
  children: ReactNode
  id?: string
  className?: string
  animate?: boolean
}

export function SectionContainer({ children, id, className, animate = true }: SectionContainerProps) {
  const content = (
    <div id={id} className={cn("mb-16 sm:mb-20 md:mb-24", className)}>
      {children}
    </div>
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {content}
      </motion.div>
    )
  }

  return content
}
