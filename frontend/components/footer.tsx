"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Instagram } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <footer className="relative pt-16 md:pt-24 pb-2 md:pb-4 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/footer-bg.jpg"
          alt="Property Background"
          className="w-full h-full object-cover"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-foreground/70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div variants={item}>
            <Link href="/" className="mb-4 hover:opacity-80 transition-opacity">
              <h3 className="text-2xl font-serif font-bold text-background cursor-pointer">
                <span className="text-primary">Equity</span> <span className="text-background">Properties</span> <span className="text-background">Meerut</span>
              </h3>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              Curating exceptional real estate experiences for discerning clients in Meerut.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={item}>
            <h4 className="font-semibold mb-4 text-lg text-background">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Properties", href: "/properties" },
                { label: "About Us", href: "/about" },
                { label: "FAQ", href: "/faq" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-background/70 hover:text-background transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={item}>
            <h4 className="font-semibold mb-4 text-lg text-background">Contact</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>+91 9690338698</li>
              <li>Mr. Gaurav Chaudhary</li>
              <li>Gav.chy12345@gmail.com</li>
              <li>
                Gayatri enclave colony, Meerut
              </li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div variants={item}>
            <h4 className="font-semibold mb-4 text-lg text-background">Follow</h4>
            <div className="flex gap-4">
              <motion.a
                href="https://www.instagram.com/equity_properties_meerut/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-background/30 hover:bg-background/10 transition-colors text-background"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={18} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-background/20 pt-4">
          <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center text-sm text-background/70 gap-4">
            <p className="text-center md:text-left order-2 md:order-1">&copy; 2025 Equity Properties Meerut. All rights reserved.</p>
            <div className="flex flex-row items-center gap-4 md:gap-6 order-1 md:order-2">
              <Link href="/privacy-policy" className="hover:text-background transition-colors whitespace-nowrap">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-background transition-colors whitespace-nowrap">
                Terms of Service
              </Link>
            </div>
          </div>
          
          {/* Made by Nexerve */}
          <motion.div
            className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-background/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-background/70 text-sm">Made by</span>
            <Link
              href="https://nexerve.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img
                src="/nexerve-logo.png"
                alt="Nexerve"
                className="h-[120px] w-auto"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
