"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export function TermsOfServiceContent() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-balance mb-4 sm:mb-6 md:mb-8">
              Terms of Service
            </h1>
            <p className="text-base sm:text-lg text-foreground/70">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="prose prose-lg max-w-none" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="space-y-8 text-foreground/80 leading-relaxed">
              <div>
                <h2 className="text-2xl font-serif font-light mb-4 text-foreground">Agreement to Terms</h2>
                <p>By accessing and using the Equity Properties Meerut website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.</p>
              </div>
              <div>
                <h2 className="text-2xl font-serif font-light mb-4 text-foreground">Use License</h2>
                <p>Permission is granted to temporarily access the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose</li>
                  <li>Attempt to decompile or reverse engineer any software</li>
                  <li>Remove any copyright or other proprietary notations</li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-serif font-light mb-4 text-foreground">Property Information</h2>
                <p>All property information, including prices, availability, and specifications, is subject to change without notice. We strive to provide accurate information but do not warrant the completeness or accuracy of property details. All property transactions are subject to verification and final confirmation.</p>
              </div>
              <div>
                <h2 className="text-2xl font-serif font-light mb-4 text-foreground">Limitation of Liability</h2>
                <p>In no event shall Equity Properties Meerut or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.</p>
              </div>
              <div>
                <h2 className="text-2xl font-serif font-light mb-4 text-foreground">Revisions</h2>
                <p>Equity Properties Meerut may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.</p>
              </div>
              <div>
                <h2 className="text-2xl font-serif font-light mb-4 text-foreground">Contact Information</h2>
                <p>If you have any questions about these Terms of Service, please contact us at:</p>
                <p className="mt-2">Email: Gav.chy12345@gmail.com<br />Address: Gayatri enclave colony, Meerut</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

