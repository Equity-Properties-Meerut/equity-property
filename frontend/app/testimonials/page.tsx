import type { Metadata } from "next"
import { TestimonialsContent } from "./testimonials-content"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://equitypropertiesmeerut.com"

export const metadata: Metadata = {
  title: "Testimonials | Client Reviews for Equity Properties Meerut",
  description: "Read testimonials and reviews from satisfied clients of Equity Properties Meerut. Discover why customers trust us for their real estate needs in Meerut, India.",
  keywords: [
    "Equity Properties Meerut reviews",
    "real estate testimonials Meerut",
    "property dealer reviews Meerut",
    "client testimonials Meerut",
    "real estate agent reviews",
    "property service reviews",
    "Meerut real estate feedback",
    "customer reviews Meerut",
    "property investment testimonials",
    "real estate success stories",
  ],
  openGraph: {
    title: "Testimonials | Client Reviews for Equity Properties Meerut",
    description: "Read testimonials from satisfied clients of Equity Properties Meerut.",
    url: `${siteUrl}/testimonials`,
    type: "website",
  },
  alternates: {
    canonical: `${siteUrl}/testimonials`,
  },
}

export default function Testimonials() {
  return <TestimonialsContent />
}
