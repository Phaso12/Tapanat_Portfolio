// Global parameters for the portfolio
export const TRADING_PROFIT = 389077
export const COUNTUP_DURATION = 2

// Site metadata
export const SITE_METADATA = {
  name: "Tapanat Chaigosi",
  title: "Product Owner",
  description:
    "I'm Tapanat, a product owner with a strong focus on building scalable systems at the intersection of finance and technology.",
  email: "w.tapanat@gmail.com",
  phone: "+66-83-535-6641",
  location: "Khlong Chan, Bangkapi, Bangkok",
  resumeUrl: "https://drive.google.com/file/d/1NfrBAbiREBJkyY_y1MFpu_wwkZjzqAUC/view?usp=sharing",
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/tapanat-chaigosi-7995ab200/",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
}

// Color scheme using CSS variables
export const COLORS = {
  primary: {
    DEFAULT: "hsl(var(--portfolio-primary))",
    light: "hsl(var(--portfolio-primary-light))",
    dark: "hsl(var(--portfolio-primary-dark))",
    hover: "hsl(var(--portfolio-primary) / 0.9)",
  },
  secondary: {
    main: "hsl(var(--portfolio-secondary))",
    light: "hsl(var(--portfolio-secondary-light))",
    dark: "hsl(var(--portfolio-secondary-dark, var(--portfolio-secondary)))",
  },
  text: {
    primary: "hsl(var(--portfolio-text-primary))",
    secondary: "hsl(var(--portfolio-text-secondary))",
    muted: "hsl(var(--muted-foreground))",
    light: "hsl(var(--portfolio-text-light, white))",
  },
  background: {
    main: "hsl(var(--portfolio-background))",
    card: "white",
    sidebar: "var(--portfolio-secondary)",
  },
  status: {
    success: "hsl(var(--success, 142 71% 45%))",
    warning: "hsl(var(--warning, 38 92% 50%))",
    error: "hsl(var(--destructive))",
    info: "hsl(var(--info, 221 83% 53%))",
  },
}

// Portfolio projects data
export const PROJECTS = [
  {
    title: "Web3 Marketplace",
    displayTitle: "ADOT NFT Marketplace",
    image: "/images/adot-nft-marketplace.png",
    slug: "adot-nft-marketplace",
    featured: true,
    description:
      "Shaped product vision and defined feature specs for a gamified digital asset platform. Worked closely with devs to deliver interactive experiences that boosted user engagement.",
    skills: ["Product Roadmap", "Agile & Scrum", "Sprint Planning", "User-centered", "Backlog Management"],
  },
  {
    title: "Forming Product Strategy",
    displayTitle: "Forming Product Strategy",
    image: "/images/forming-product-strategy.png",
    slug: "forming-product-strategy",
    description:
      "Developed and implemented effective product strategies through cross-functional leadership, stakeholder management, and agile methodologies to drive successful product outcomes.",
    skills: ["Leadership", "Critical Thinking", "Problem Solving", "Cross-Functional Collaboration"],
  },
  {
    title: "Cryptocurrency Algorithmic Trading",
    displayTitle: "Cryptocurrency Algorithmic Trading",
    image: null,
    customImage: true,
    slug: "crypto-algorithmic-trading",
    description:
      "Gathered requirements and led testing for a Python-based trading bot. Improved liquidity and trade efficiency through smart strategy design.",
    skills: ["Trading Strategy", "Market Insight", "Risk Management", "Python", "Data Analysis"],
  },
  {
    title: "Engineering Design Solutions",
    displayTitle: "Engineering Design Solutions",
    image: "/images/toyota-hilux-crash-test.png",
    slug: "engineering-design-solutions",
    description:
      "Turned user issues into design solutions for vehicle components. Drove process automation that cut lead times and reduced costs.",
    skills: [
      "Root Cause Analysis",
      "Quality Assurance",
      "Cross-functional Collaboration",
      "Cost Optimization",
      "Critical Thinking",
    ],
  },
]

// Certifications data
export const CERTIFICATIONS = [
  {
    title: "Cryptocurrency Algorithmic Trading with Python & Binance",
    description: "Developed trading bots for Web3 trading.",
    link: "/images/Crypto.png",
  },
  {
    title: "Ethereum Blockchain Developer with Solidity",
    description: "Built and deployed smart contracts for Web3 applications.",
    link: "/images/blockchain.png",
  },
  {
    title: "Quality Award (2019)",
    description: "Recognized for VBA automation tool, standardized for Toyota saving $57K annually.",
    link: "/images/Quality Award.png",
  },
]

// Performance metrics for projects
export const PERFORMANCE_METRICS = {
  adotNftMarketplace: {
    activeUsers: "25,000+",
    userGrowth: "+230%",
    engagementTime: "+810%",
    developmentTime: "1 Year",
  },
  cryptoTrading: {
    tradingProfit: TRADING_PROFIT,
    spreadReduction: "78%",
    volumeGrowth: "42%",
    portfolioGrowthPercentage: 36.55,
  },
  engineeringSolutions: {
    safetyRating: "5-Star",
    processEfficiency: "90%",
    awardYear: "2019",
    annualSavings: "$57K",
  },
}

// Career timeline data
export const CAREER_TIMELINE = [
  {
    year: "2012 - 2016",
    role: "Bachelor of Automotive Engineering",
    organization: "Thai-Nichi Institute of Technology",
    type: "education",
    icon: "GraduationCap",
  },
  {
    year: "2016 - 2020",
    role: "Senior Automotive Engineer",
    organization: "Toyota Motor Asia Pacific",
    type: "work",
    icon: "Briefcase",
  },
  {
    year: "2020 - 2022",
    role: "MSc in Financial Technology",
    organization: "University of Glasgow",
    type: "education",
    icon: "GraduationCap",
  },
  {
    year: "2022 - 2023",
    role: "FinTech Specialist",
    organization: "T&B Media Global",
    type: "work",
    icon: "Briefcase",
  },
  {
    year: "2023 - Present",
    role: "Product Owner (Web3)",
    organization: "VUCA Digital",
    type: "work",
    icon: "Briefcase",
  },
]
