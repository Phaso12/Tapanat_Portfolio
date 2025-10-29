import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SITE_METADATA } from "@/lib/constants"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  generator: "v0.app",
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    url: SITE_METADATA.url,
    siteName: SITE_METADATA.siteName,
    images: [
      {
        url: SITE_METADATA.image.url,
        width: SITE_METADATA.image.width,
        height: SITE_METADATA.image.height,
        alt: SITE_METADATA.image.alt,
      },
    ],
    locale: SITE_METADATA.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    images: [SITE_METADATA.image.url],
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
