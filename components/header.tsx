"use client"

import { motion } from "framer-motion"
import CareerTimeline from "./career-timeline"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import Image from "next/image"

// Import the constants at the top of the file
import { SITE_METADATA, COLORS, TRADING_PROFIT } from "@/lib/constants"

export default function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  // Format the trading profit with commas
  const formattedTradingProfit = TRADING_PROFIT.toLocaleString()

  return (
    <section id="header" className="pt-6 sm:pt-8 md:pt-10">
      {/* Profile Image for Mobile */}
      <div className="md:hidden flex justify-center mb-4 sm:mb-6">
        <div className="relative w-24 sm:w-28 h-24 sm:h-28 rounded-full overflow-hidden border-2 border-[#0046b8]/30">
          <Image
            src="/profile-image.png"
            alt="Tapanat Chaigosi"
            fill
            priority
            className="object-cover"
            style={{
              objectPosition: "50% 45%",
            }}
          />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Header Title & Subtitle */}
        <div className="mb-6 sm:mb-7 md:mb-8 text-center">
          {/* Replace hardcoded name and title with constants */}
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-[${COLORS.text.primary}] tracking-tight`}>
            {SITE_METADATA.name}
          </h1>
          <hr className="my-3 sm:my-4 mx-auto w-1/3 border border-[#b8b2b2] opacity-60" />
          <h2
            className={`text-xl sm:text-2xl md:text-3xl font-medium text-[${COLORS.text.primary}] mb-4 sm:mb-5 md:mb-6`}
          >
            {SITE_METADATA.title}
          </h2>

          <Button
            // Replace hardcoded colors with constants
            className={`bg-[${COLORS.primary.main}] hover:bg-[${COLORS.primary.dark}] text-white px-8 sm:px-10 py-8 sm:py-10 font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
            onClick={() => scrollToSection("portfolio")}
          >
            <span className="inline-flex items-center gap-3">
              <FileText className="h-10 w-10" />
              <span className="text-xl">Portfolio</span>
            </span>
          </Button>
        </div>

        {/* Main Content Box */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-10 relative overflow-hidden">
          <div className="space-y-4 text-base md:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            <p>
              Hi, I'm Tapanat, a product owner with a strong focus on building scalable systems at the intersection of
              finance and technology. I specialize in data-driven product development, particularly in FinTech and Web3,
              where I combine product strategy, technical insight, and execution to create meaningful solutions.
            </p>
            <p>
              My goal is to become a Product Owner who effectively bridges innovative FinTech solutions with real user
              needs. I am committed to building data-driven, user-centric products that are not only technically robust
              but also secure, compliant, and aligned with commercial objectives. I work closely with cross-functional
              teams including commercial, compliance, and engineering to deliver impactful products that provide
              meaningful value to both users and businesses.
            </p>
            <div className="pt-4">
              <h3 className="font-bold text-[#0046b8] mb-2">Highlights of my experience include:</h3>
              <ul className="list-disc ml-6 space-y-2 marker:text-[#0046b8]">
                <li>
                  Worked closely with stakeholders to gather requirements and turn them into clear, organized product
                  backlogs everyone could align on.
                </li>
                <li>Designed NFT reward systems that led to a 10x increase in user engagement.</li>
                <li>Developed market-making algorithms that generated over $389,077 in trading profits.</li>
              </ul>
            </div>

            {/*<div className="pt-4">
              <p className="mb-2 text-gray-600 text-base">
                Before moving into the digital asset space, I spent several years in automotive engineering at Toyota
                Daihatsu, where I led safety component design initiatives, built automation tools, and received the
                Toyota Quality Award in 2019 for engineering process innovation.
              </p>
            </div>*/}

            <div className="mt-2">
              <CareerTimeline />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
