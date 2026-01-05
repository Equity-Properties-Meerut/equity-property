import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://equitypropertiesmeerut.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Equity Properties Meerut | Premium Real Estate in Meerut",
    template: "%s | Equity Properties Meerut",
  },
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
  ],
  authors: [{ name: "Equity Properties Meerut" }],
  creator: "Equity Properties Meerut",
  publisher: "Equity Properties Meerut",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Equity Properties Meerut",
    title: "Equity Properties Meerut | Premium Real Estate in Meerut",
    description: "Discover exclusive luxury properties and investment opportunities in Meerut, India. Curated collection of premium real estate.",
    images: [
      {
        url: "/Logo/EPM-logo.jpg",
        width: 1200,
        height: 630,
        alt: "Equity Properties Meerut",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Equity Properties Meerut | Premium Real Estate in Meerut",
    description: "Discover exclusive luxury properties and investment opportunities in Meerut, India.",
    images: ["/Logo/EPM-logo.jpg"],
    creator: "@equity_properties_meerut",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/Logo/favicon.ico",
    shortcut: "/Logo/favicon.ico",
    apple: "/apple-icon.png",
  },
  verification: {
    // Add Google Search Console verification when available
    // google: "your-google-verification-code",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Real Estate",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Equity Properties Meerut",
    description: "Premium real estate services in Meerut, India. Specializing in luxury properties, apartments, villas, and commercial real estate.",
    url: siteUrl,
    logo: `${siteUrl}/Logo/EPM-logo.jpg`,
    image: `${siteUrl}/Logo/EPM-logo.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Gayatri enclave colony",
      addressLocality: "Meerut",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9690338698",
      contactType: "Customer Service",
      email: "Gav.chy12345@gmail.com",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    sameAs: [
      "https://www.instagram.com/equity_properties_meerut/",
    ],
    areaServed: {
      "@type": "City",
      name: "Meerut",
    },
  }

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/Logo/favicon.ico" sizes="any" />
        <link rel="canonical" href={siteUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#C4A36E" />
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Meerut" />
        <meta name="geo.position" content="28.9845;77.7064" />
        <meta name="ICBM" content="28.9845, 77.7064" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
