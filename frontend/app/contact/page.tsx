import type { Metadata } from "next"
import { ContactContent } from "./contact-content"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://equitypropertiesmeerut.com"

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch with Equity Properties Meerut",
  description: "Contact Equity Properties Meerut for property inquiries, viewings, and expert real estate advice in Meerut. Call +91 9690338698 or email Gav.chy12345@gmail.com. Located in Gayatri enclave colony, Meerut, Uttar Pradesh.",
  keywords: [
    "contact Equity Properties Meerut",
    "real estate contact Meerut",
    "property inquiry Meerut",
    "real estate agent contact",
    "property dealer Meerut contact",
    "Meerut real estate phone number",
    "property viewing Meerut",
    "real estate consultation Meerut",
    "Gaurav Chaudhary contact",
    "Meerut property inquiry",
  ],
  openGraph: {
    title: "Contact Equity Properties Meerut | Get in Touch",
    description: "Contact us for property inquiries, viewings, and expert real estate advice in Meerut.",
    url: `${siteUrl}/contact`,
    type: "website",
  },
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
}

export default function Contact() {
  return <ContactContent />
}
