import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  icon: ReactNode
  title: string
  className?: string
}

export function SectionHeader({ icon, title, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center gap-3 mb-6", className)}>
      <div className="p-2 rounded-lg bg-[#0046b8]/10">{icon}</div>
      <h2 className="text-3xl font-bold text-[#0a192f]">{title}</h2>
    </div>
  )
}
