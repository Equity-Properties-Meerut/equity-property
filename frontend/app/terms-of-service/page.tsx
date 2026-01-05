import type { Metadata } from "next"
import { TermsOfServiceContent } from "./terms-of-service-content"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://equitypropertiesmeerut.com"

export const metadata: Metadata = {
  title: "Terms of Service | Equity Properties Meerut",
  description: "Read Equity Properties Meerut's terms of service. Understand the terms and conditions for using our real estate website and services in Meerut, India.",
  keywords: [
    "terms of service",
    "terms and conditions",
    "real estate terms",
    "property terms",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/terms-of-service`,
  },
}

export default function TermsOfService() {
  return <TermsOfServiceContent />
}

