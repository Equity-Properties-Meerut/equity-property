import type { Metadata } from "next"
import { PropertiesContent } from "./properties-content"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://equitypropertiesmeerut.com"

export const metadata: Metadata = {
  title: "Properties for Sale & Rent in Meerut | Browse Real Estate Listings",
  description: "Browse our extensive collection of properties for sale, rent, and lease in Meerut. Find apartments, villas, houses, plots, and commercial properties in prime locations across Meerut, Uttar Pradesh.",
  keywords: [
    "properties for sale Meerut",
    "properties for rent Meerut",
    "apartments Meerut",
    "villas Meerut",
    "houses Meerut",
    "plots Meerut",
    "commercial property Meerut",
    "real estate listings Meerut",
    "property search Meerut",
    "Meerut properties",
    "buy property Meerut",
    "rent property Meerut",
    "property investment Meerut",
  ],
  openGraph: {
    title: "Properties for Sale & Rent in Meerut | Browse Real Estate Listings",
    description: "Browse our extensive collection of properties in Meerut, India.",
    url: `${siteUrl}/properties`,
    type: "website",
  },
  alternates: {
    canonical: `${siteUrl}/properties`,
  },
}

export default function Properties() {
  return <PropertiesContent />
}
