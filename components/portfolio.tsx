"use client"

import { motion } from "framer-motion"
import { Briefcase, ExternalLink, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import CountUp from "react-countup"
import { Badge } from "@/components/ui/badge"
import { TRADING_PROFIT, COUNTUP_DURATION } from "@/lib/constants"
import { useRef, useState, useEffect } from "react"

export default function Portfolio() {
  // Create refs for CountUp components
  const desktopCountUpRef = useRef(null)
  const mobileCountUpRef = useRef(null)

  // State to track if component is mounted
  const [isMounted, setIsMounted] = useState(false)
  // State to track if animation has played
  const [hasAnimationPlayed, setHasAnimationPlayed] = useState(false)

  // Set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Function to handle animation start
  const handleAnimationStart = () => {
    if (!hasAnimationPlayed) {
      setHasAnimationPlayed(true)
    }
  }

  const projects = [
    {
      title: <>Web3 Marketplace</>,
      displayTitle: "ADOT NFT Marketplace", // For alt text and other places where JSX isn't appropriate
      image: "/images/adot-nft-marketplace.png",
      slug: "adot-nft-marketplace",
      featured: true,
      description:
        "Shaped product vision and defined feature specs for a gamified digital asset platform. Worked closely with devs to deliver interactive experiences that boosted user engagement.",
      skills: ["Product Roadmap", "Agile & Scrum", "Sprint Planning", "User-centered", "Backlog Management"],
    },
    {
      title: "Forming Product Strategy",
      displayTitle: "Forming Product Strategy",
      image: "/images/forming-product-strategy.png", // Update this line to use the new image
      slug: "forming-product-strategy",
      description:
        "Developed and implemented effective product strategies through cross-functional leadership, stakeholder management, and agile methodologies to drive successful product outcomes.",
      skills: ["Leadership", "Critical Thinking", "Problem Solving", "Cross-Functional Collaboration"],
    },
    {
      title: "Cryptocurrency Algorithmic Trading",
      displayTitle: "Cryptocurrency Algorithmic Trading",
      image: null,
      customImage: true,
      slug: "crypto-algorithmic-trading",
      description:
        "Gathered requirements and led testing for a Python-based trading bot. Improved liquidity and trade efficiency through smart strategy design.",
      skills: ["Trading Strategy", "Market Insight", "Risk Management", "Python", "Data Analysis"],
    },
    {
      title: "Engineering Design Solutions",
      displayTitle: "Engineering Design Solutions",
      image: "/images/toyota-hilux-crash-test.png",
      slug: "engineering-design-solutions",
      description:
        "Turned user issues into design solutions for vehicle components. Drove process automation that cut lead times and reduced costs.",
      skills: [
        "Root Cause Analysis",
        "Quality Assurance",
        "Cross-functional Collaboration",
        "Cost Optimization",
        "Critical Thinking",
      ],
    },
  ]

  // Format the trading profit with commas for fallback display
  const formattedTradingProfit = TRADING_PROFIT.toLocaleString()

  // Portfolio growth percentage
  const portfolioGrowthPercentage = 36.55

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-[#0046b8]/10">
          <Briefcase className="h-6 w-6 text-[#0046b8]" />
        </div>
        <h2 className="text-3xl font-bold text-[#0a192f]">Portfolio</h2>
      </div>

      {/* Desktop layout (3 columns) - now for md and above */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
            whileHover={{ y: -8 }}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="block h-full"
              scroll={true} // Explicitly set scroll to true
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col cursor-pointer">
                <div className="relative h-40 sm:h-44 md:h-48 w-full overflow-hidden">
                  {project.customImage ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="absolute inset-0 bg-[#0a192f] flex flex-col items-center justify-center gap-2"
                    >
                      <TrendingUp className="h-8 w-8 text-emerald-400" />
                      {isMounted ? (
                        <div className="text-3xl md:text-5xl font-bold text-emerald-500" ref={desktopCountUpRef}>
                          <CountUp
                            start={0}
                            end={portfolioGrowthPercentage}
                            duration={COUNTUP_DURATION}
                            decimals={2}
                            prefix="+"
                            suffix="%"
                            useEasing={true}
                            useGrouping={true}
                            enableScrollSpy={hasAnimationPlayed ? false : true}
                            scrollSpyOnce={true}
                            scrollSpyDelay={500}
                            redraw={false}
                            onEnd={handleAnimationStart}
                            onError={() => console.log("CountUp desktop error")}
                          />
                        </div>
                      ) : (
                        <span className="text-3xl md:text-5xl font-bold text-emerald-500">
                          +{portfolioGrowthPercentage.toFixed(2)}%
                        </span>
                      )}
                      <p className="text-sm text-white/70">2024 Portfolio Growth</p>
                    </motion.div>
                  ) : (
                    <>
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.displayTitle || String(project.title)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </>
                  )}
                </div>
                <div className="p-4 sm:p-5 md:p-6 flex-grow flex flex-col">
                  {/* Fixed height container for title with reduced height */}
                  <div className="h-12 mb-0">
                    <h3 className="text-xl font-bold text-[#0a192f] group-hover:text-[#0046b8] transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>
                  {project.description && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 line-clamp-4">{project.description}</p>
                    </div>
                  )}
                  <div className="flex-grow flex flex-col">
                    <div>
                      <p className="text-sm font-medium text-[#0a192f] mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill, i) => (
                          <Badge
                            key={i}
                            className="bg-[#0046b8]/5 text-[#0046b8] border-[#0046b8]/20 hover:bg-[#0046b8]/10 border text-xs font-medium transition-colors duration-300 px-1.5 sm:px-2 py-0.5"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
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
        ))}
      </div>

      {/* Mobile layout (stacked) */}
      <div className="grid grid-cols-1 gap-6 md:hidden">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
            whileHover={{ y: -8 }}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="block h-full"
              scroll={true} // Explicitly set scroll to true
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col cursor-pointer">
                <div className="relative h-48 w-full overflow-hidden">
                  {project.customImage ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="absolute inset-0 bg-[#0a192f] flex flex-col items-center justify-center gap-2"
                    >
                      <TrendingUp className="h-8 w-8 text-emerald-400" />
                      {isMounted ? (
                        <div className="text-3xl font-bold text-emerald-500" ref={mobileCountUpRef}>
                          <CountUp
                            start={0}
                            end={portfolioGrowthPercentage}
                            duration={COUNTUP_DURATION}
                            decimals={2}
                            prefix="+"
                            suffix="%"
                            useEasing={true}
                            useGrouping={true}
                            enableScrollSpy={hasAnimationPlayed ? false : true}
                            scrollSpyOnce={true}
                            scrollSpyDelay={500}
                            redraw={false}
                            onEnd={handleAnimationStart}
                            onError={() => console.log("CountUp mobile error")}
                          />
                        </div>
                      ) : (
                        <span className="text-3xl font-bold text-emerald-500">
                          +{portfolioGrowthPercentage.toFixed(2)}%
                        </span>
                      )}
                      <p className="text-sm text-white/70">2024 Portfolio Growth</p>
                    </motion.div>
                  ) : (
                    <>
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.displayTitle || String(project.title)}
                        fill
                        className="object-cover transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </>
                  )}
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  {/* Fixed height container for title with reduced height */}
                  <div
                    className={`h-12 ${
                      project.slug === "crypto-algorithmic-trading" || project.slug === "engineering-design-solutions"
                        ? "mb-4 lg:mb-0"
                        : "mb-0"
                    }`}
                  >
                    <h3 className="text-xl font-bold text-[#0a192f] group-hover:text-[#0046b8] transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>
                  {project.description && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 line-clamp-4">{project.description}</p>
                    </div>
                  )}
                  <div className="flex-grow flex flex-col">
                    <div>
                      <p className="text-sm font-medium text-[#0a192f] mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill, i) => (
                          <Badge
                            key={i}
                            className="bg-[#0046b8]/5 text-[#0046b8] border-[#0046b8]/20 hover:bg-[#0046b8]/10 border text-xs font-medium transition-colors duration-300"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
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
        ))}
      </div>
    </motion.div>
  )
}
