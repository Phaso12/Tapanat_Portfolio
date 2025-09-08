"use client"

import { motion } from "framer-motion"
import { Briefcase, TrendingUp } from "lucide-react"
import CountUp from "react-countup"
import { COUNTUP_DURATION } from "@/lib/constants"
import { useRef, useState, useEffect } from "react"
import { SectionHeader } from "@/components/ui/section-header"
import { SectionContainer } from "@/components/ui/section-container"
import { ProjectCard } from "@/components/portfolio/project-card"

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

  // Portfolio growth percentage
  const portfolioGrowthPercentage = 36.55

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
      image: "/images/forming-product-strategy.png",
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

  // Custom content for the crypto trading card with CountUp animation
  const cryptoTradingContent = (
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
  )

  return (
    <SectionContainer>
      <SectionHeader icon={<Briefcase className="h-6 w-6 text-[#0046b8]" />} title="Portfolio" />

      {/* Desktop layout (3 columns) - now for md and above */}
      <div
        className="hidden md:grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6"
        style={{ maxWidth: "100%", overflowX: "hidden" }}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            {...project}
            index={index}
            customContent={project.customImage ? cryptoTradingContent : undefined}
          />
        ))}
      </div>

      {/* Mobile layout (stacked) */}
      <div className="grid grid-cols-1 gap-6 md:hidden">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            {...project}
            index={index}
            customContent={
              project.customImage ? (
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
              ) : undefined
            }
          />
        ))}
      </div>
    </SectionContainer>
  )
}
