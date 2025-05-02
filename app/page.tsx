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
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f8fafc] overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 md:ml-64 overflow-x-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 overflow-x-hidden">
          <Header />
          <div className="space-y-16 sm:space-y-20 md:space-y-24 mt-12 sm:mt-14 md:mt-16 overflow-x-hidden">
            <section id="resume" className="overflow-x-hidden">
              <Resume />
            </section>
            <section id="portfolio" className="overflow-x-hidden">
              <Portfolio />
            </section>
            <section id="certifications" className="overflow-x-hidden">
              <Certifications />
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
