"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Property Owner",
    content:
      "The team at Equity Properties made the entire process seamless. From viewing to closing, their expertise and attention to detail were exceptional. They helped us find our dream home in Meerut.",
    rating: 5,
    image: "/professional-woman.png",
  },
  {
    name: "Rajesh Kumar",
    role: "Investor",
    content:
      "Outstanding service and market knowledge. They helped me identify properties with excellent investment potential in Meerut. Their insights about the local market are invaluable.",
    rating: 5,
    image: "/professional-man.png",
  },
  {
    name: "Anjali Singh",
    role: "Property Buyer",
    content:
      "Equity Properties understood exactly what we were looking for in Meerut. They found us the perfect property that matched all our requirements. Highly recommended!",
    rating: 5,
    image: "/professional-woman-french.jpg",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-12 md:py-16 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-balance">What Our Clients Say</h2>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div className="overflow-x-auto pb-6 -mx-4 px-4">
          <motion.div
            className="flex gap-4 sm:gap-6 min-w-max"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                className="w-72 sm:w-80 md:w-96 shrink-0"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="glass glass-dark p-5 sm:p-6 md:p-8 h-full rounded-2xl">
                  <div className="flex gap-1 mb-4 sm:mb-6">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" className="text-primary" />
                      ))}
                  </div>
                  <p className="text-sm sm:text-base text-foreground/80 mb-4 sm:mb-6 leading-relaxed">{testimonial.content}</p>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                      width={48}
                      height={48}
                      loading="lazy"
                    />
                    <div>
                      <p className="text-sm sm:text-base font-medium text-foreground">{testimonial.name}</p>
                      <p className="text-xs sm:text-sm text-foreground/70">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
