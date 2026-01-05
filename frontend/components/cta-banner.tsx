"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export function CTABanner() {
  return (
    <section className="py-20 md:py-32 bg-foreground text-background relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/foot-bg.png"
          alt="Background"
          className="w-full h-full object-cover"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-8 text-balance">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-lg text-background/80 mb-10 max-w-2xl mx-auto">
            Let our expert agents guide you through the world of luxury real estate.
          </p>
          <Link href="/contact">
            <motion.button
              className="px-10 py-4 bg-primary text-primary-foreground rounded-full font-medium text-lg hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule a Consultation
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
