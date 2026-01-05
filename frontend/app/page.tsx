"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProperties } from "@/components/featured-properties"
import { PropertyGallery } from "@/components/property-gallery"
import { ValueProposition } from "@/components/value-proposition"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTABanner } from "@/components/cta-banner"
import { Preloader } from "@/components/preloader"

export default function Home() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false)

  useEffect(() => {
    // Preloader runs for 3 seconds + 0.6s fade out = 3.6s total
    // Add small delay to ensure DOM is ready for viewport detection
    const timer = setTimeout(() => {
      setIsPreloaderDone(true)
      // Force a reflow to ensure viewport detection works
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 100)
    }, 3600)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Preloader />
      {isPreloaderDone && (
        <main className="min-h-screen overflow-x-hidden">
          <Navbar />
          <HeroSection />
          <StatsSection />
          <FeaturedProperties />
          <PropertyGallery />
          <ValueProposition />
          <TestimonialsSection />
          <CTABanner />
          <Footer />
          <WhatsAppButton />
        </main>
      )}
    </>
  )
}
