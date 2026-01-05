"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Property Owner",
    content:
      "The team at Equity Properties Meerut made the entire process seamless. From viewing to closing, their expertise and attention to detail were exceptional. They helped us find our dream home in Meerut. I couldn't have asked for a better experience.",
    rating: 5,
    image: "/professional-woman.png",
  },
  {
    name: "Rajesh Kumar",
    role: "Investor",
    content:
      "Outstanding service and market knowledge. They helped me identify properties with excellent investment potential in Meerut. Their insights about the local market proved invaluable.",
    rating: 5,
    image: "/professional-man.png",
  },
  {
    name: "Anjali Singh",
    role: "Property Buyer",
    content:
      "Equity Properties Meerut understood exactly what we were looking for in Meerut. They found us the perfect property that matched all our requirements. Highly recommended!",
    rating: 5,
    image: "/professional-woman-french.jpg",
  },
  {
    name: "Amit Verma",
    role: "Business Owner",
    content:
      "Partnering with Equity Properties Meerut was transformative for our property search in Meerut. Their deep understanding of the local market and personalized service made all the difference.",
    rating: 5,
    image: "/professional-man-spanish.jpg",
  },
]

export default function Testimonials() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-balance mb-4 sm:mb-6 md:mb-8">
              Testimonials from Satisfied Clients
            </h1>
            <p className="text-base sm:text-lg text-foreground/70">
              Hear from clients who have experienced the Equity Properties Meerut difference in Meerut.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                className="glass glass-dark p-10 rounded-2xl"
                variants={item}
                whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(196, 163, 110, 0.15)" }}
              >
                <div className="flex gap-1 mb-6">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" className="text-primary" />
                    ))}
                </div>
                <p className="text-lg text-foreground/80 leading-relaxed mb-8">{testimonial.content}</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-foreground/70">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
