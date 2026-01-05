"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Award, Users, Lightbulb } from "lucide-react"


export default function About() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-primary font-medium text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">Our Story</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-balance mb-4 sm:mb-6 md:mb-8">
              Defining Luxury Real Estate for a New Generation
            </h1>
            <p className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              Equity Properties Meerut is dedicated to curating exceptional real estate experiences in Meerut, India. We bring
              together market expertise, personalized service, and an unwavering commitment to helping clients find their
              perfect property in Meerut's most coveted locations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 md:py-32 overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl font-serif font-light mb-8">Our Mission</h2>
              <p className="text-lg text-foreground/70 leading-relaxed mb-6">
                We believe luxury real estate is more than transactions—it's about connecting people with spaces that
                inspire and elevate their lives. Every property we represent tells a story of architectural excellence
                and timeless elegance in Meerut.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed mb-6">
                Our commitment is to provide unparalleled expertise, personalized service, and access to Meerut's most
                exceptional properties. We understand the local market dynamics and help you make informed decisions.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed">
                We've built lasting relationships with clients, architects, and developers in Meerut, making us your
                trusted partner in the luxury real estate journey in this vibrant city.
              </p>
            </motion.div>
            <motion.div
              className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img src="/luxury-office-interior.jpg" alt="Our Office" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-32 bg-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-light text-balance">Our Core Values</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: "Excellence", desc: "We pursue perfection in every aspect of our service." },
              { icon: Users, title: "Integrity", desc: "Transparency and honesty guide all our relationships." },
              { icon: Lightbulb, title: "Innovation", desc: "We embrace modern approaches to luxury real estate." },
            ].map((value, idx) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                >
                  <div className="text-center">
                    <Icon className="w-12 h-12 text-primary mx-auto mb-6" />
                    <h3 className="text-2xl font-serif font-light mb-4">{value.title}</h3>
                    <p className="text-foreground/70">{value.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 md:py-32 overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-balance">Meet Our Leadership</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Owner Image */}
            <motion.div
              className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/Logo/EPM-logo.jpg"
                alt="Equity Properties Meerut Logo"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Owner Message */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-serif font-light mb-4">Gaurav Chaudhary</h3>
              <p className="text-primary font-medium mb-6">Owner</p>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  Welcome to Equity Properties Meerut. As the founder and owner, I am committed to transforming the real estate
                  experience in Meerut. Our mission is to provide exceptional service and help you find the perfect property
                  that meets your needs and exceeds your expectations.
                </p>
                <p>
                  With years of experience in the Meerut real estate market, we understand the unique dynamics of this
                  vibrant city. We take pride in our personalized approach, ensuring that every client receives dedicated
                  attention and expert guidance throughout their property journey.
                </p>
                <p>
                  At Equity Properties Meerut, we believe in building lasting relationships based on trust, integrity, and
                  excellence. Whether you're looking to buy, sell, or invest, we're here to make your real estate dreams
                  a reality.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
