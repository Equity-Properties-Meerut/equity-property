"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How do I schedule a property viewing?",
    answer:
      "Contact our team directly through the website or call our main office. We'll arrange viewings at your convenience, with personalized tours conducted by our expert agents.",
  },
  {
    question: "What makes a property luxury?",
    answer:
      "Luxury properties combine exceptional architecture, prime locations, premium finishes, and unique character. Our curated collection meets rigorous standards for quality and distinction.",
  },
  {
    question: "Do you assist international buyers?",
    answer:
      "Yes, we have extensive experience with international clients. We provide guidance on legal requirements, financing, and cultural considerations for your purchase.",
  },
  {
    question: "What are your commission rates?",
    answer:
      "Commission structures vary by property and transaction type. Contact us for a confidential discussion about pricing for your specific situation.",
  },
  {
    question: "Can you help with property management?",
    answer:
      "While we specialize in sales, we have partnerships with premium property management firms to support ongoing maintenance and rental management.",
  },
  {
    question: "How are properties priced?",
    answer:
      "Our pricing reflects comprehensive market analysis, comparable sales, property condition, location desirability, and unique features. We provide transparent valuations.",
  },
]

export function FAQContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-balance mb-4 sm:mb-6 md:mb-8">Frequently Asked Questions</h1>
            <p className="text-base sm:text-lg text-foreground/70">
              Find answers to common questions about our services and properties.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                className="border-l-2 border-primary/0 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                onHoverStart={() => setOpenIndex(idx)}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full text-left py-6 px-6 bg-secondary hover:bg-secondary/70 transition-colors rounded-lg flex items-center justify-between"
                >
                  <span className="text-lg font-serif font-light">{faq.question}</span>
                  <motion.div animate={{ rotate: openIndex === idx ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="text-primary" size={24} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 py-6 bg-background border-l-2 border-primary">
                        <p className="text-foreground/70 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-foreground/70 mb-6">Still have questions?</p>
            <Link href="/contact">
              <motion.button 
                className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Our Team
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
