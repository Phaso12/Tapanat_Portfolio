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

// Image generation
export default async function Image() {
  // Get the profile image
  const profileImageData = await fetch(new URL("/public/profile-image.png", import.meta.url)).then((res) =>
    res.arrayBuffer(),
  )

  return new ImageResponse(
    // ImageResponse JSX element
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        <img
          src={profileImageData || "/placeholder.svg"}
          width={200}
          height={200}
          style={{
            borderRadius: "50%",
            border: "4px solid #0046b8",
          }}
        />
      </div>
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
