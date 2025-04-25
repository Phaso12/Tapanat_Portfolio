import type { ReactNode } from "react"

interface SidebarContactItemProps {
  icon: ReactNode
  label: string
  href: string
}

export function SidebarContactItem({ icon, label, href }: SidebarContactItemProps) {
  return (
    <a href={href} className="flex items-center gap-3 text-gray-300 hover:text-white px-2 group">
      <div className="p-2 rounded-lg bg-[#172a46] group-hover:bg-[#172a46]/80 transition-colors duration-300">
        {icon}
      </div>
      <span className="text-sm">{label}</span>
    </a>
  )
}
