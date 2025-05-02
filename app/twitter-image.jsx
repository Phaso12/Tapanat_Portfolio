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
  try {
    // Fetch the profile image
    const profileImageData = await fetch(new URL("../public/profile-image.png", import.meta.url)).then((res) =>
      res.arrayBuffer(),
    )
    const profileImageBase64 = `data:image/png;base64,${Buffer.from(profileImageData).toString("base64")}`

    return new ImageResponse(
      <div
        style={{
          fontSize: 48,
          background: "linear-gradient(135deg, #0a192f 0%, #172a46 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 50,
          color: "white",
        }}
      >
        {/* Profile Image */}
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: "4px solid #0046b8",
            marginBottom: 40,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <img
            src={profileImageBase64 || "/placeholder.svg"}
            alt="Tapanat Chaigosi"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 45%",
            }}
          />
        </div>

        <div
          style={{
            fontSize: 60,
            fontWeight: "bold",
            color: "white",
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
            background: "rgba(255, 255, 255, 0.9)",
            padding: "8px 24px",
            borderRadius: 8,
            fontWeight: "bold",
          }}
        >
          Product Owner
        </div>

        <div
          style={{
            fontSize: 24,
            color: "rgba(255, 255, 255, 0.9)",
            maxWidth: 800,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Building scalable systems at the intersection of finance and technology
        </div>

        {/* Bottom border */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 12,
            background: "#0046b8",
          }}
        />
      </div>,
      // ImageResponse options
      {
        ...size,
      },
    )
  } catch (error) {
    console.error("Error generating Twitter image:", error)

    // Fallback to a simpler version without the profile image
    return new ImageResponse(
      <div
        style={{
          fontSize: 48,
          background: "linear-gradient(135deg, #0a192f 0%, #172a46 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 50,
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: "bold",
            color: "white",
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
            background: "rgba(255, 255, 255, 0.9)",
            padding: "8px 24px",
            borderRadius: 8,
            fontWeight: "bold",
          }}
        >
          Product Owner
        </div>
      </div>,
      {
        ...size,
      },
    )
  }
}
