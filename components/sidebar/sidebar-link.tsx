"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SidebarLinkProps {
  icon: ReactNode
  label: string
  isActive: boolean
  onClick: () => void
}

export function SidebarLink({ icon, label, isActive, onClick }: SidebarLinkProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center w-full px-3 md:px-4 py-2 md:py-3 rounded-lg transition-colors",
        isActive ? "bg-[#172a46] text-white" : "text-gray-300 hover:bg-[#172a46]",
      )}
    >
      {icon}
      <span className="ml-2 md:ml-3 text-sm md:text-base">{label}</span>
    </button>
  )
}
