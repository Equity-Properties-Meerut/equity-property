import type { Metadata } from "next"
import { PrivacyPolicyContent } from "./privacy-policy-content"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://equitypropertiesmeerut.com"

export const metadata: Metadata = {
  title: "Privacy Policy | Equity Properties Meerut",
  description: "Read Equity Properties Meerut's privacy policy. Learn how we collect, use, and protect your personal information when you use our real estate services in Meerut.",
  keywords: [
    "privacy policy",
    "data protection",
    "privacy policy Meerut",
    "real estate privacy",
    "property data privacy",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteUrl}/privacy-policy`,
  },
}

export default function PrivacyPolicy() {
  return <PrivacyPolicyContent />
}

