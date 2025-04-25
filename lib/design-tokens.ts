// Design tokens for the portfolio website
// These values are extracted from the existing design to ensure consistency

export const colors = {
  // Primary colors
  primary: {
    DEFAULT: "#0046b8",
    light: "#005BE2",
    dark: "#003d9e",
    hover: "#0046b8/90",
  },
  // Background colors
  background: {
    DEFAULT: "#f8fafc",
    card: "#ffffff",
  },
  // Text colors
  text: {
    DEFAULT: "#0a192f",
    secondary: "#172a46",
    muted: "#b8b2b2",
    gray: {
      DEFAULT: "#6b7280",
      light: "#9ca3af",
      dark: "#4b5563",
    },
  },
  // Utility colors
  border: {
    DEFAULT: "#e5e7eb",
    light: "#f3f4f6",
  },
  // Opacity variants for backgrounds
  opacity: {
    light: "10",
    medium: "20",
    high: "50",
  },
}

export const spacing = {
  section: {
    gap: "4rem", // 16
    marginBottom: "6rem", // 24
  },
  card: {
    padding: {
      sm: "1.5rem", // 6
      md: "2rem", // 8
    },
    gap: "1.5rem", // 6
  },
}

export const borderRadius = {
  DEFAULT: "0.5rem", // 2
  lg: "0.75rem", // 3
  xl: "1rem", // 4
  full: "9999px",
}

export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
}

export const animation = {
  transition: {
    DEFAULT: "all 0.3s ease",
    fast: "all 0.2s ease",
    slow: "all 0.5s ease",
  },
}

// Tailwind class collections for common patterns
export const tailwindClasses = {
  sectionTitle: "text-3xl font-bold text-[#0a192f]",
  sectionIcon: "p-2 rounded-lg bg-[#0046b8]/10 text-[#0046b8]",
  card: "bg-white rounded-xl shadow-sm border border-gray-100",
  cardHover: "hover:shadow-md transition-all duration-300",
  button: {
    primary: "bg-[#0046b8] hover:bg-[#003d9e] text-white",
    outline: "border-[#0046b8] text-[#0046b8] hover:bg-[#0046b8]/10 border",
  },
}
