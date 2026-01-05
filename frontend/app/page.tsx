import type { Metadata } from "next"
import { HomeContent } from "./home-content"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://equitypropertiesmeerut.com"

export const metadata: Metadata = {
  title: "Equity Properties Meerut | Premium Real Estate in Meerut, India",
  description: "Discover exclusive luxury properties and investment opportunities in Meerut, India. Curated collection of premium real estate including apartments, villas, houses, and commercial properties. Expert real estate services in Meerut.",
  keywords: [
    "real estate Meerut",
    "properties in Meerut",
    "luxury properties Meerut",
    "apartments in Meerut",
    "villas in Meerut",
    "houses for sale Meerut",
    "commercial property Meerut",
    "property investment Meerut",
    "real estate agent Meerut",
    "property dealer Meerut",
    "Equity Properties Meerut",
    "Meerut real estate",
    "property Meerut",
    "buy property Meerut",
    "rent property Meerut",
    "Meerut properties",
    "real estate services Meerut",
    "property consultant Meerut",
  ],
  openGraph: {
    title: "Equity Properties Meerut | Premium Real Estate in Meerut",
    description: "Discover exclusive luxury properties and investment opportunities in Meerut, India.",
    url: siteUrl,
    type: "website",
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function Home() {
  return <HomeContent />
}
