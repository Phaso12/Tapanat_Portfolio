import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"

// Import the constants at the top of the file
import { SITE_METADATA } from "@/lib/constants"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: `${SITE_METADATA.name} | ${SITE_METADATA.title}`,
  description: SITE_METADATA.description,
  openGraph: {
    title: `${SITE_METADATA.name} | ${SITE_METADATA.title}`,
    description: SITE_METADATA.description,
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%281%29-JuaCwx1dIHOYexfvriHkLeiCCIEHN3.png",
        width: 1200,
        height: 630,
        alt: SITE_METADATA.name,
      },
    ],
    url: "https://tapanat-portfolio.vercel.app/",
    siteName: `${SITE_METADATA.name} Portfolio`,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_METADATA.name} | ${SITE_METADATA.title}`,
    description: SITE_METADATA.description,
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%281%29-JuaCwx1dIHOYexfvriHkLeiCCIEHN3.png",
    ],
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
      <head>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-JRF4GM2RT6" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JRF4GM2RT6');
            `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
