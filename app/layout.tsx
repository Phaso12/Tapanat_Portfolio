import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tapanat Chaigosi | Product Owner",
  description: "Portfolio website of Tapanat Chaigosi, Product Owner",
  openGraph: {
    title: "Tapanat Chaigosi | Product Owner",
    description:
      "I'm Tapanat, a product owner with a strong focus on building scalable systems at the intersection of finance and technology.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Tapanat Chaigosi | Product Owner",
      },
    ],
    type: "website",
    locale: "en_US",
    siteName: "Tapanat Chaigosi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tapanat Chaigosi | Product Owner",
    description:
      "I'm Tapanat, a product owner with a strong focus on building scalable systems at the intersection of finance and technology.",
    images: ["/twitter-image"],
    creator: "@tapanat",
  },
    generator: 'v0.dev'
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
