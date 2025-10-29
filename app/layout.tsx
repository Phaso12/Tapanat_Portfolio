import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tapanat Chaigosi | Product Manager",
  description:
    "A product manager with a strong focus on building scalable systems at the intersection of finance and technology. I specialize in data-driven product development, particularly in FinTech and Web3, where I combine product strategy, technical insight, and execution to create meaningful solutions.",
  generator: "v0.app",
  openGraph: {
    title: "Tapanat Chaigosi | Product Manager",
    description:
      "A product manager with a strong focus on building scalable systems at the intersection of finance and technology. I specialize in data-driven product development, particularly in FinTech and Web3, where I combine product strategy, technical insight, and execution to create meaningful solutions.",
    url: "https://tapanat-portfolio.vercel.app/",
    siteName: "Tapanat Chaigosi Portfolio",
    images: [
      {
        url: "/profile-image.png",
        width: 1200,
        height: 630,
        alt: "Tapanat Chaigosi - Product Manager",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tapanat Chaigosi | Product Manager",
    description:
      "A product manager with a strong focus on building scalable systems at the intersection of finance and technology. I specialize in data-driven product development, particularly in FinTech and Web3, where I combine product strategy, technical insight, and execution to create meaningful solutions.",
    images: ["/profile-image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
