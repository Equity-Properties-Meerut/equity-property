import type { Metadata } from "next"
import { FAQContent } from "./faq-content"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://equitypropertiesmeerut.com"

export const metadata: Metadata = {
  title: "FAQ | Frequently Asked Questions About Real Estate in Meerut",
  description: "Find answers to common questions about Equity Properties Meerut services, property viewings, pricing, property management, and real estate transactions in Meerut, India.",
  keywords: [
    "FAQ real estate Meerut",
    "property questions Meerut",
    "real estate FAQ",
    "property viewing Meerut",
    "real estate commission Meerut",
    "property management Meerut",
    "property pricing Meerut",
    "real estate services FAQ",
    "Meerut property inquiries",
    "property investment questions",
  ],
  openGraph: {
    title: "FAQ | Frequently Asked Questions About Real Estate in Meerut",
    description: "Find answers to common questions about our real estate services in Meerut.",
    url: `${siteUrl}/faq`,
    type: "website",
  },
  alternates: {
    canonical: `${siteUrl}/faq`,
  },
}

export default function FAQ() {
  return <FAQContent />
}
