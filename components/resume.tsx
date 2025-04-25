"use client"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"
import Image from "next/image"
import { SectionHeader } from "@/components/ui/section-header"
import { SectionContainer } from "@/components/ui/section-container"
import { Card, CardContent } from "@/components/ui/card"

// Resume data structure
const resumeData = {
  name: "Tapanat Chaigosi",
  title: "Product Owner",
  // Convert Google Drive sharing link to direct download link
  pdfUrl: "https://drive.google.com/file/d/1NfrBAbiREBJkyY_y1MFpu_wwkZjzqAUC/view?usp=sharing",
  thumbnailPath1: "/Resume_Preview_Page_1.png",
  thumbnailPath2: "/Resume_Preview_Page_2.png",
}

export default function Resume() {
  const handleDownload = () => {
    // Open the download link in a new tab
    window.open(resumeData.pdfUrl, "_blank")
  }

  return (
    <SectionContainer>
      <SectionHeader icon={<FileText className="h-6 w-6 text-[#0046b8]" />} title="Resume" />

      <Card>
        <CardContent>
          <div className="flex flex-col items-center justify-center">
            {/* Resume Preview Images - Side by side on tablet and desktop */}
            <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8 justify-center">
              {/* Page 1 */}
              <div className="w-full max-w-xs sm:max-w-sm cursor-pointer transition-all duration-300 hover:shadow-lg rounded-lg overflow-hidden border-2 border-gray-200 shadow-md relative">
                <div className="relative w-full" onClick={handleDownload}>
                  <Image
                    src={resumeData.thumbnailPath1 || "/placeholder.svg"}
                    alt="Resume preview page 1"
                    width={600}
                    height={848}
                    className="w-full h-auto"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity bg-white/90 px-4 py-2 rounded-full shadow-md">
                      <span className="text-sm font-medium text-[#0a192f] flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Click to download resume
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Page 2 */}
              <div className="w-full max-w-xs sm:max-w-sm cursor-pointer transition-all duration-300 hover:shadow-lg rounded-lg overflow-hidden border-2 border-gray-200 shadow-md relative">
                <div className="relative w-full" onClick={handleDownload}>
                  <Image
                    src={resumeData.thumbnailPath2 || "/placeholder.svg"}
                    alt="Resume preview page 2"
                    width={600}
                    height={848}
                    className="w-full h-auto"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity bg-white/90 px-4 py-2 rounded-full shadow-md">
                      <span className="text-sm font-medium text-[#0a192f] flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Click to download resume
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="mt-8">
              <Button onClick={handleDownload} className="bg-[#0046b8] hover:bg-[#003d9e] text-white">
                <Download className="h-4 w-4 mr-2" />
                Download Complete Resume
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </SectionContainer>
  )
}
