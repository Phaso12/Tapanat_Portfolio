"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Image from "next/image"
import { createPortal } from "react-dom"

interface CertificateModalProps {
  isOpen: boolean
  certificateUrl: string | null
  onClose: () => void
}

export default function CertificateModal({ isOpen, certificateUrl, onClose }: CertificateModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      // Restore body scrolling when modal is closed
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  // Handle escape key to close
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, onClose])

  const modalContent = (
    <AnimatePresence>
      {isOpen && certificateUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80"
          style={{ backdropFilter: "blur(2px)" }}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-800 hover:text-black transition-colors shadow-md"
              aria-label="Close certificate"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="overflow-auto max-h-[90vh]">
              <Image
                src={certificateUrl || "/placeholder.svg"}
                alt="Certificate"
                width={1200}
                height={900}
                className="w-full h-auto"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  // Use portal to render modal at the document body level
  return mounted && isOpen ? createPortal(modalContent, document.body) : null
}
