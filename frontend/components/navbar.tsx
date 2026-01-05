"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Properties", href: "/properties" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "FAQ", href: "/faq" },
  ]

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "bg-background/30 backdrop-blur-md"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <motion.div className="flex items-center gap-2 sm:gap-3" whileHover={{ scale: 1.05 }}>
              <Image
                src="/Logo/EPM-logo.jpg"
                alt="Equity Properties Meerut Logo"
                width={40}
                height={40}
                className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover"
                priority
              />
              <div className="text-lg sm:text-xl md:text-2xl font-serif font-bold tracking-wide">
                <span className="text-primary">Equity</span> <span className="text-foreground">Properties</span> <span className="text-foreground">Meerut</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`relative group text-sm font-medium transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-foreground/80 hover:text-primary"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </motion.div>
              )
            })}
          </div>

          <Link href="/contact" className="hidden md:block">
            <motion.button
              className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Inquire Now
            </motion.button>
          </Link>

          {/* Mobile Menu Button */}
          <motion.button className="md:hidden" onClick={() => setIsOpen(!isOpen)} whileTap={{ scale: 0.95 }}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className="md:hidden overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "text-primary bg-secondary/50 font-medium"
                      : "text-foreground/80 hover:text-primary hover:bg-secondary"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <button className="w-full mt-4 px-3 py-2 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:opacity-90 transition-opacity">
                Inquire Now
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}
