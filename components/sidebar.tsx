"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Mail, Menu, X, User, MapPin, Phone, Award, FileText, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"
import { SidebarLink } from "@/components/sidebar/sidebar-link"
import { SidebarContactItem } from "@/components/sidebar/sidebar-contact-item"

// Define section data for reuse
const sections = [
  { id: "header", name: "About Me", icon: <User className="h-5 w-5" /> },
  { id: "resume", name: "Resume", icon: <FileText className="h-5 w-5" /> },
  { id: "portfolio", name: "Portfolio", icon: <Briefcase className="h-5 w-5" /> },
  { id: "certifications", name: "Certifications", icon: <Award className="h-5 w-5" /> },
]

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("header")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Touch handling refs
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Improved handleScroll function to better detect the last section
  const handleScroll = () => {
    const sectionElements = sections
      .map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }))
      .filter((section) => section.element)

    // Get current scroll position plus a small offset to detect sections earlier
    const currentPosition = window.scrollY + 150

    // Check if we're near the bottom of the page
    const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100

    // If near bottom and certifications section exists, set it as active
    if (isNearBottom && document.getElementById("certifications")) {
      setActiveSection("certifications")
      return
    }

    // Find the section that is currently in view
    let currentSection = null

    // First pass: check if any section is directly in view
    for (let i = 0; i < sectionElements.length; i++) {
      const { id, element } = sectionElements[i]
      if (element) {
        const elementTop = element.offsetTop
        const elementBottom = elementTop + element.offsetHeight

        // If current scroll position is within this section
        if (currentPosition >= elementTop && currentPosition < elementBottom) {
          currentSection = id
          break
        }
      }
    }

    // If no section is directly in view, find the closest one
    if (!currentSection && sectionElements.length > 0) {
      // Default to the first section
      currentSection = sectionElements[0].id

      // Find the section closest to the current position
      for (let i = 0; i < sectionElements.length; i++) {
        const { id, element } = sectionElements[i]
        if (element && element.offsetTop <= currentPosition) {
          currentSection = id
        }
      }
    }

    if (currentSection) {
      setActiveSection(currentSection)
    }
  }

  useEffect(() => {
    // Initial check on mount
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
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

  // Scroll to section function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      // Set active section immediately when clicked
      setActiveSection(id)

      // Then scroll to the section
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })

      setMobileMenuOpen(false)
    }
  }

  // Touch handling functions
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
              <p className="text-sm text-center text-white font-medium">Product Owner | Produt Manager | FinTech Specialist</p>
            </div>
          </div>

          <nav className="space-y-1">
            {sections.map((section) => (
              <SidebarLink
                key={section.id}
                icon={section.icon}
                label={section.name}
                isActive={activeSection === section.id}
                onClick={() => scrollToSection(section.id)}
              />
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-[#ffffff]/50">
            {/* Desktop Contact Heading */}
            <h3 className="text-sm uppercase mb-4 px-2 text-white">Contact</h3>
            <div className="space-y-3">
              <SidebarContactItem
                icon={<MapPin className="h-4 w-4 text-white group-hover:scale-110 transition-transform duration-300" />}
                label="Khlong Chan, Bangkapi, Bangkok"
                href="#"
              />
              <SidebarContactItem
                icon={<Mail className="h-4 w-4 text-white group-hover:scale-110 transition-transform duration-300" />}
                label="w.tapanat@gmail.com"
                href="mailto:w.tapanat@gmail.com"
              />
              <SidebarContactItem
                icon={<Phone className="h-4 w-4 text-white group-hover:scale-110 transition-transform duration-300" />}
                label="+66-83-535-6641"
                href="tel:+66835356641"
              />
              <SidebarContactItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-white fill-current group-hover:scale-110 transition-transform duration-300"
                  >
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                  </svg>
                }
                label="LinkedIn"
                href="https://www.linkedin.com/in/tapanat-chaigosi-7995ab200/"
              />
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
              <SidebarLink
                key={section.id}
                icon={section.icon}
                label={section.name}
                isActive={activeSection === section.id}
                onClick={() => scrollToSection(section.id)}
              />
            ))}
          </nav>

          <div className="mt-6 pt-4 border-t border-[#ffffff]/50">
            {/* Mobile Contact Heading */}
            <h3 className="text-sm uppercase mb-3 px-2 text-white">Contact</h3>
            <div className="space-y-3">
              <SidebarContactItem
                icon={<MapPin className="h-4 w-4 text-white group-hover:scale-110 transition-transform duration-300" />}
                label="Khlong Chan, Bangkapi, Bangkok"
                href="#"
              />
              <SidebarContactItem
                icon={<Mail className="h-4 w-4 text-white group-hover:scale-110 transition-transform duration-300" />}
                label="w.tapanat@gmail.com"
                href="mailto:w.tapanat@gmail.com"
              />
              <SidebarContactItem
                icon={<Phone className="h-4 w-4 text-white group-hover:scale-110 transition-transform duration-300" />}
                label="+66-83-535-6641"
                href="tel:+66835356641"
              />
              <SidebarContactItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-white fill-current group-hover:scale-110 transition-transform duration-300"
                  >
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                  </svg>
                }
                label="LinkedIn"
                href="https://www.linkedin.com/in/tapanat-chaigosi-7995ab200/"
              />
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
