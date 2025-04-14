"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Image from "next/image"
import { createPortal } from "react-dom"

interface GraphModalProps {
  isOpen: boolean
  graphUrl: string | null
  onClose: () => void
}

export default function GraphModal({ isOpen, graphUrl, onClose }: GraphModalProps) {
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
      {isOpen && graphUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-black/80"
          style={{ backdropFilter: "blur(2px)" }}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-white rounded-xl overflow-hidden max-w-[90%] sm:max-w-[85%] md:max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-gray-800 hover:text-black transition-colors shadow-md"
              aria-label="Close graph view"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="overflow-auto max-h-[95vh] sm:max-h-[90vh]">
              <div className="relative w-full h-[50vh] sm:h-[55vh] md:h-[70vh] lg:h-[80vh]">
                <Image
                  src={graphUrl || "/placeholder.svg"}
                  alt="Trading Graph"
                  fill
                  className="object-contain p-2 sm:p-3 md:p-4"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  // Use portal to render modal at the document body level
  return mounted && isOpen ? createPortal(modalContent, document.body) : null
}
