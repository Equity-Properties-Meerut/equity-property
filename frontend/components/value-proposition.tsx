"use client"

import { motion } from "framer-motion"

const reasons = [
  {
    number: "01",
    title: "Expert Market Knowledge",
    description:
      "Our team possesses in-depth understanding of Meerut's real estate market, helping you make informed decisions.",
    image: "/real-estate-expert-consulting-with-client.jpg",
  },
  {
    number: "02",
    title: "Premium Property Portfolio",
    description: "We offer the best way to explore your dream property with our curated selection of premium listings.",
    image: "/luxury-property-viewing-modern-interiors.jpg",
  },
  {
    number: "03",
    title: "Personalized Service",
    description:
      "Describe why your potential customers need to choose you and the best way to explain your offer is here.",
    image: "/personalized-real-estate-consultation.jpg",
  },
]

export function ValueProposition() {
  return (
    <section className="py-20 md:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4">Why Choose Us</h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">Insert your awesome subtitle here</p>
        </motion.div>

        {/* Reasons Grid - matching the image layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Images */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {reasons.map((reason, idx) => (
              <motion.div
                key={idx}
                className="relative h-48 rounded-xl overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={reason.image || "/placeholder.svg"}
                  alt={reason.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
                  <span className="text-white text-2xl font-serif font-light">{reason.title}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column - Text */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {reasons.map((reason, idx) => (
              <motion.div
                key={idx}
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
              >
                <h3 className="text-xl font-semibold text-foreground">Reason {reason.number}</h3>
                <h4 className="text-2xl font-serif font-light text-primary">{reason.title}</h4>
                <p className="text-foreground/70 leading-relaxed">{reason.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
