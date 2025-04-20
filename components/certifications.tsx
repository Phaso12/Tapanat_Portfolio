"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Award, ExternalLink } from "lucide-react"
import CertificateModal from "./certificate-modal"
import { CERTIFICATIONS, COLORS } from "@/lib/constants"

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className={`p-2 rounded-lg bg-[${COLORS.primary.light}]`}>
          <Award className="h-6 w-6 text-[#0046b8]" />
        </div>
        <h2 className={`text-3xl font-bold text-[${COLORS.text.primary}]`}>Certifications</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-7 md:p-8">
        <ul className="space-y-4 sm:space-y-5">
          {CERTIFICATIONS.map((cert, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-3 sm:gap-4 group"
              whileHover={{ x: 5 }}
            >
              <div
                className={`p-2 rounded-lg bg-[${COLORS.primary.light}] group-hover:bg-[#0046b8]/20 transition-colors duration-300 mt-1`}
              >
                <Award className="h-5 w-5 text-[#0046b8] group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex-1">
                <span className="text-gray-800 font-medium block group-hover:text-[#0046b8] transition-colors duration-300">
                  {cert.title}
                </span>
                <span className="text-gray-600 text-sm block">{cert.description}</span>
                {cert.link && (
                  <button
                    onClick={() => openCertificate(cert.link!)}
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
      </div>

      {/* Certificate Modal */}
      <CertificateModal isOpen={isModalOpen} certificateUrl={activeCertificate} onClose={closeCertificate} />
    </motion.div>
  )
}
