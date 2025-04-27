import type { ReactNode } from "react"

interface SidebarContactItemProps {
  icon: ReactNode
  label: string
  href: string
}

export function SidebarContactItem({ icon, label, href }: SidebarContactItemProps) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 text-gray-300 hover:text-white px-2 group landscape:gap-2 landscape:py-1"
    >
      <div className="p-2 rounded-lg bg-[#172a46] group-hover:bg-[#172a46]/80 transition-colors duration-300 landscape:p-1.5">
        {icon}
      </div>
      <span className="text-sm landscape:text-xs">{label}</span>
    </a>
  )
}
