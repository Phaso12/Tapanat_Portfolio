"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { BadgeList } from "@/components/ui/badge-list"
import { motion } from "framer-motion"

interface ProjectCardProps {
  title: ReactNode
  displayTitle: string
  image: string | null
  customImage?: boolean
  slug: string
  description: string
  skills: string[]
  customContent?: ReactNode
  index?: number
}

export function ProjectCard({
  title,
  displayTitle,
  image,
  customImage = false,
  slug,
  description,
  skills,
  customContent,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
      whileHover={{ y: -8 }}
    >
      <Link href={`/projects/${slug}`} className="block h-full" scroll={true} target="_blank" rel="noopener noreferrer">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col cursor-pointer">
          <div className="relative h-40 sm:h-44 md:h-48 w-full overflow-hidden">
            {customImage ? (
              customContent
            ) : (
              <>
                <Image
                  src={image || "/placeholder.svg"}
                  alt={displayTitle}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </>
            )}
          </div>
          <div className="p-4 sm:p-5 md:p-6 flex-grow flex flex-col">
            {/* Fixed height container for title with reduced height */}
            <div
              className={`h-12 ${
                slug === "crypto-algorithmic-trading" || slug === "engineering-design-solutions"
                  ? "mb-4 lg:mb-0"
                  : "mb-0"
              }`}
            >
              <h3 className="text-xl font-bold text-[#0a192f] group-hover:text-[#0046b8] transition-colors duration-300">
                {title}
              </h3>
            </div>
            {description && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 line-clamp-4">{description}</p>
              </div>
            )}
            <div className="flex-grow flex flex-col">
              <div>
                <p className="text-sm font-medium text-[#0a192f] mb-2">Skills:</p>
                <BadgeList items={skills} />
              </div>
              <div className="mt-auto pt-6">
                <div className="border-[#0046b8] text-[#0046b8] hover:bg-[#0046b8]/10 rounded-lg w-full group transition-all duration-300 hover:border-[#0046b8] border py-2 px-4 flex items-center justify-center gap-2">
                  View Project
                  <ExternalLink className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
