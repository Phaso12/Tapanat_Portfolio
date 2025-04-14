"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Mail, Menu, X, User, MapPin, Phone, Award, FileText, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("header")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Add these state variables and refs inside the Sidebar component
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Update the sections array to swap Portfolio and Certifications
  const sections = [
    { id: "header", name: "About M", icon: <User className="h-5 w-5" /> },
    { id: "resume", name: "Resume", icon: <FileText className="h-5 w-5" /> },
    { id: "portfolio", name: "Portfolio", icon: <Briefcase className="h-5 w-5" /> },
    { id: "certifications", name: "Certifications", icon: <Award className="h-5 w-5" /> },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections
        .map((section) => ({
          id: section.id,
          element: document.getElementById(section.id),
        }))
        .filter((section) => section.element)

      const currentPosition = window.scrollY + 100

      // Find the last section that is above the current scroll position
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, element } = sectionElements[i]
        if (element && element.offsetTop <= currentPosition) {
          setActiveSection(id)
          break
        }
      }
    }

    // Initial check on mount
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  // Add this useEffect after the existing useEffect for scroll handling
  useEffect(() => {
    // When mobile menu is open, prevent body scrolling
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
      setActiveSection(id)
      setMobileMenuOpen(false)
    }
  }

  // Add this function inside the Sidebar component, before the return statement
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX

    // Calculate the distance swiped
    const distance = touchStartX.current - touchEndX.current

    // If swiping left and sidebar is open
    if (distance > 0 && mobileMenuOpen && sidebarRef.current) {
      // Apply transform directly for a smooth drag effect
      sidebarRef.current.style.transform = `translateX(-${distance}px)`
    }
  }

  const handleTouchEnd = () => {
    // Calculate the distance swiped
    const distance = touchStartX.current - touchEndX.current

    // If swiped left more than 100px, close the sidebar
    if (distance > 100 && mobileMenuOpen) {
      setMobileMenuOpen(false)
    }

    // Reset the transform
    if (sidebarRef.current) {
      sidebarRef.current.style.transform = ""
    }
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-white shadow-md"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar for desktop */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#0a192f] to-[#0a192f] text-white z-40 transition-transform duration-300 ease-in-out",
          "hidden md:block",
        )}
      >
        <div className="p-6">
          <div className="mb-8">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
              <Image
                src="/profile-image.png"
                alt="Tapanat Chaigosi"
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "50% 45%", // Adjusted to better frame the face
                }}
              />
            </div>
            <h1 className="text-xl font-bold text-center">Tapanat Chaigosi</h1>
            <div className="mt-2 pt-2 border-t border-[#ffffff]/50">
              <p className="text-sm text-center text-white font-medium">Product Owner & Manager | FinTech Specialist</p>
            </div>
          </div>

          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "flex items-center w-full px-3 md:px-4 py-2 md:py-3 rounded-lg transition-colors",
                  activeSection === section.id ? "bg-[#172a46] text-white" : "text-gray-300 hover:bg-[#172a46]",
                )}
              >
                {section.icon}
                <span className="ml-2 md:ml-3 text-sm md:text-base">{section.name}</span>
              </button>
            ))}
          </nav>
          <div className="mt-8 pt-6 border-t border-[#ffffff]/50">
            {/* Desktop Contact Heading */}
            <h3 className="text-sm uppercase mb-4 px-2 text-white">Contact</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white px-2 group">
                <div className="p-2 rounded-lg bg-[#172a46] group-hover:bg-[#172a46]/80 transition-colors duration-300">
                  <MapPin className="h-4 w-4 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-sm">Khlong Chan, Bangkapi, Bangkok</span>
              </a>
              <a
                href="mailto:w.tapanat@gmail.com"
                className="flex items-center gap-3 text-gray-300 hover:text-white px-2 group"
              >
                <div className="p-2 rounded-lg bg-[#172a46] group-hover:bg-[#172a46]/80 transition-colors duration-300">
                  <Mail className="h-4 w-4 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-sm">w.tapanat@gmail.com</span>
              </a>
              <a href="tel:+66835356641" className="flex items-center gap-3 text-gray-300 hover:text-white px-2 group">
                <div className="p-2 rounded-lg bg-[#172a46] group-hover:bg-[#172a46]/80 transition-colors duration-300">
                  <Phone className="h-4 w-4 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-sm">+66-83-535-6641</span>
              </a>
              <a
                href="https://www.linkedin.com/in/tapanat-chaigosi-7995ab200/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-white px-2 group"
              >
                <div className="p-2 rounded-lg bg-[#172a46] group-hover:bg-[#172a46]/80 transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-white fill-current group-hover:scale-110 transition-transform duration-300"
                  >
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                  </svg>
                </div>
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <aside
        ref={sidebarRef}
        className={cn(
          "fixed inset-0 bg-gradient-to-b from-[#0a192f] to-[#0a192f] text-white z-40 transition-transform duration-300 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="p-6">
          <div className="mb-8">
            {/* Profile image removed from mobile sidebar as it's shown in the main page */}
            <h1 className="text-lg font-bold text-center">Tapanat Chaigosi</h1>
            <div className="mt-2 pt-2 border-t border-[#ffffff]/50">
              <p className="text-sm text-center text-white font-medium">Product Owner & Manager | FinTech Specialist</p>
            </div>
          </div>

          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "flex items-center w-full px-4 py-3 rounded-lg transition-colors",
                  activeSection === section.id ? "bg-[#172a46] text-white" : "text-gray-300 hover:bg-[#172a46]",
                )}
              >
                {section.icon}
                <span className="ml-3">{section.name}</span>
              </button>
            ))}
          </nav>
          <div className="mt-6 pt-4 border-t border-[#ffffff]/50">
            {/* Mobile Contact Heading */}
            <h3 className="text-sm uppercase mb-3 px-2 text-white">Contact</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white px-2 group">
                <div className="p-2 rounded-lg bg-[#172a46] group-hover:bg-[#172a46]/80 transition-colors duration-300">
                  <MapPin className="h-4 w-4 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-sm">Khlong Chan, Bangkapi, Bangkok</span>
              </a>
              <a
                href="mailto:w.tapanat@gmail.com"
                className="flex items-center gap-3 text-gray-300 hover:text-white px-2 group"
              >
                <div className="p-2 rounded-lg bg-[#172a46] group-hover:bg-[#172a46]/80 transition-colors duration-300">
                  <Mail className="h-4 w-4 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-sm">w.tapanat@gmail.com</span>
              </a>
              <a href="tel:+66835356641" className="flex items-center gap-3 text-gray-300 hover:text-white px-2 group">
                <div className="p-2 rounded-lg bg-[#172a46] group-hover:bg-[#172a46]/80 transition-colors duration-300">
                  <Phone className="h-4 w-4 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-sm">+66-83-535-6641</span>
              </a>
              <a
                href="https://www.linkedin.com/in/tapanat-chaigosi-7995ab200/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-white px-2 group"
              >
                <div className="p-2 rounded-lg bg-[#172a46] group-hover:bg-[#172a46]/80 transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-white fill-current group-hover:scale-110 transition-transform duration-300"
                  >
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                  </svg>
                </div>
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed top-0 left-64 right-0 bottom-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      )}
    </>
  )
}
