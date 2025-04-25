"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Award, ExternalLink } from "lucide-react"
import CertificateModal from "./certificate-modal"
import { SectionHeader } from "@/components/ui/section-header"
import { SectionContainer } from "@/components/ui/section-container"
import { Card, CardContent } from "@/components/ui/card"

interface Certification {
  title: string
  description: string
  link: string
}

export default function Certifications() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeCertificate, setActiveCertificate] = useState<string | null>(null)

  const openCertificate = (url: string) => {
    setActiveCertificate(url)
    setIsModalOpen(true)
  }

  const closeCertificate = () => {
    setIsModalOpen(false)
  }

  const certifications: Certification[] = [
    {
      title: "Cryptocurrency Algorithmic Trading with Python & Binance",
      description: "Developed trading bots for Web3 trading.",
      link: "/images/Crypto.png",
    },
    {
      title: "Ethereum Blockchain Developer with Solidity",
      description: "Built and deployed smart contracts for Web3 applications.",
      link: "/images/blockchain.png",
    },
    {
      title: "Quality Award (2019)",
      description: "Recognized for VBA automation tool, standardized for Toyota saving $57K annually.",
      link: "/images/Quality Award.png",
    },
  ]

  return (
    <SectionContainer>
      <SectionHeader icon={<Award className="h-6 w-6 text-[#0046b8]" />} title="Certifications" />

      <Card>
        <CardContent>
          <ul className="space-y-4 sm:space-y-5">
            {certifications.map((cert, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 sm:gap-4 group"
                whileHover={{ x: 5 }}
              >
                <div className="p-2 rounded-lg bg-[#0046b8]/10 group-hover:bg-[#0046b8]/20 transition-colors duration-300 mt-1">
                  <Award className="h-5 w-5 text-[#0046b8] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="flex-1">
                  <span className="text-gray-800 font-medium block group-hover:text-[#0046b8] transition-colors duration-300">
                    {cert.title}
                  </span>
                  <span className="text-gray-600 text-sm block">{cert.description}</span>
                  {cert.link && (
                    <button
                      onClick={() => openCertificate(cert.link)}
                      className="inline-flex items-center gap-1 mt-1 text-[#0046b8] hover:underline group"
                    >
                      <span className="text-sm">View Certificate</span>
                      <ExternalLink className="h-3 w-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </button>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Certificate Modal */}
      <CertificateModal isOpen={isModalOpen} certificateUrl={activeCertificate} onClose={closeCertificate} />
    </SectionContainer>
  )
}
