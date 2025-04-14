import type { Metadata } from "next"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import Resume from "@/components/resume"
import Certifications from "@/components/certifications"
import Portfolio from "@/components/portfolio"

export const metadata: Metadata = {
  title: "Tapanat Chaigosi | Product Owner",
  description:
    "I'm Tapanat, a product owner with a strong focus on building scalable systems at the intersection of finance and technology.",
}

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f8fafc]">
      <Sidebar />
      <main className="flex-1 md:ml-64">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
          <Header />
          <div className="space-y-16 sm:space-y-20 md:space-y-24 mt-12 sm:mt-14 md:mt-16">
            <section id="resume">
              <Resume />
            </section>
            <section id="portfolio">
              <Portfolio />
            </section>
            <section id="certifications">
              <Certifications />
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
