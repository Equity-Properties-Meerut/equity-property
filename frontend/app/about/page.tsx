import type { Metadata } from "next"
import { AboutContent } from "./about-content"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://equitypropertiesmeerut.com"

export const metadata: Metadata = {
  title: "About Us | Premium Real Estate Services in Meerut",
  description: "Learn about Equity Properties Meerut - your trusted real estate partner in Meerut, India. Discover our mission, values, and commitment to excellence in luxury property services. Meet Gaurav Chaudhary, owner and founder.",
  keywords: [
    "about Equity Properties Meerut",
    "real estate company Meerut",
    "property dealer Meerut",
    "real estate agent Meerut",
    "Gaurav Chaudhary",
    "luxury real estate Meerut",
    "property services Meerut",
    "real estate expertise Meerut",
    "trusted property dealer",
    "Meerut real estate professionals",
  ],
  openGraph: {
    title: "About Equity Properties Meerut | Premium Real Estate Services",
    description: "Learn about Equity Properties Meerut - your trusted real estate partner in Meerut, India.",
    url: `${siteUrl}/about`,
    type: "website",
  },
  alternates: {
    canonical: `${siteUrl}/about`,
  },
}

export default function About() {
  return <AboutContent />
}
