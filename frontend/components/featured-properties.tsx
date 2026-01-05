"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import Link from "next/link"

interface PropertyImage {
  image: string
  location: string
}

export function FeaturedProperties() {
  // Static images from /homeProperty/ directory
  const properties: PropertyImage[] = [
    { image: "/homeProperty/Shashtri-nagar.jpeg", location: "Shashtri Nagar" },
    { image: "/homeProperty/kankar.jpeg", location: "Kankar" },
    { image: "/homeProperty/Modipuram.jpeg", location: "Modipuram" },
    { image: "/homeProperty/Ganga-nagar.jpeg", location: "Ganga Nagar" },
    { image: "/homeProperty/Rotha-road.jpeg", location: "Rotha Road" },
  ]
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-20 md:py-32 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">Featured Collection</p>
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-balance">Exceptional Properties Await</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Handpicked selections from our premium portfolio, each offering unique charm and distinction.
          </p>
        </motion.div>

        <>
          {/* Uniform Grid - First 3 Properties */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {properties.slice(0, 3).map((property, idx) => (
              <motion.div
                key={idx}
                className="group cursor-pointer h-full"
                variants={item}
                whileHover={{ y: -8 }}
              >
                <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                  <img
                    src={property.image}
                    alt={property.location}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center gap-2 text-foreground/70">
                  <MapPin size={16} />
                  <span className="text-lg font-serif font-light">{property.location}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Wide Card at Bottom - Big card and one more card side by side */}
          {properties.length >= 4 && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end"
              variants={item}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              {/* Big Card - Takes 2 columns */}
              <motion.div
                className="group cursor-pointer md:col-span-2 flex flex-col"
                whileHover={{ y: -8 }}
              >
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-4">
                  <img
                    src={properties[3].image}
                    alt={properties[3].location}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                </div>
                <div className="flex items-center gap-2 text-foreground/70">
                  <MapPin size={16} />
                  <span className="text-lg font-serif font-light">{properties[3].location}</span>
                </div>
              </motion.div>

              {/* Small Card - Takes 1 column */}
              {properties[4] && (
                <motion.div
                  className="group cursor-pointer flex flex-col h-full"
                  whileHover={{ y: -8 }}
                >
                  <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-4">
                    <img
                      src={properties[4].image}
                      alt={properties[4].location}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex items-center gap-2 text-foreground/70">
                    <MapPin size={16} />
                    <span className="text-lg font-serif font-light">{properties[4].location}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link href="/properties">
            <button className="px-8 py-3 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-primary-foreground transition-all">
              View All Properties
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
