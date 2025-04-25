"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export function Card({ children, className, hover = false, onClick }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden",
        hover && "hover:shadow-md transition-all duration-300",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("p-6 sm:p-7 md:p-8", className)}>{children}</div>
}
