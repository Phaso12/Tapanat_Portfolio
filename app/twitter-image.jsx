import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "Tapanat Chaigosi | Product Owner"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation - reusing the same design as the OpenGraph image
export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 48,
        background: "linear-gradient(to bottom, #f8fafc, #e2e8f0)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 50,
      }}
    >
      <div
        style={{
          fontSize: 60,
          fontWeight: "bold",
          color: "#0a192f",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Tapanat Chaigosi
      </div>
      <div
        style={{
          fontSize: 36,
          color: "#0046b8",
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        Product Owner
      </div>
      <div
        style={{
          fontSize: 24,
          color: "#4b5563",
          maxWidth: 800,
          textAlign: "center",
        }}
      >
        Building scalable systems at the intersection of finance and technology
      </div>
    </div>,
    // ImageResponse options
    {
      ...size,
    },
  )
}
