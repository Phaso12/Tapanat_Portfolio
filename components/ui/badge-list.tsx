import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface BadgeListProps {
  items: string[]
  className?: string
}

export function BadgeList({ items, className }: BadgeListProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item, i) => (
        <Badge
          key={i}
          className="bg-[#0046b8]/5 text-[#0046b8] border-[#0046b8]/20 hover:bg-[#0046b8]/10 border text-xs font-medium transition-colors duration-300 px-1.5 sm:px-2 py-0.5"
        >
          {item}
        </Badge>
      ))}
    </div>
  )
}
