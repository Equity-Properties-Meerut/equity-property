"use client"

import { motion, useInView } from "framer-motion"
import { Building2, Users, MapPin } from "lucide-react"
import { useEffect, useState, useRef } from "react"

interface Stat {
  icon: typeof Building2
  number: string
  label: string
}

function AnimatedCounter({ targetValue, suffix = "" }: { targetValue: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const counterRef = useRef<HTMLSpanElement>(null)
  const isVisible = useInView(counterRef, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    const duration = 2000 // 2 seconds

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime
      }

      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease out function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(easeOut * targetValue)

      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(targetValue)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, targetValue])

  // Format number with K suffix if needed
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      const kValue = num / 1000
      if (kValue % 1 === 0) {
        return `${kValue}K`
      }
      return `${kValue.toFixed(1)}K`
    }
    return num.toString()
  }

  return (
    <span ref={counterRef}>
      {formatNumber(displayValue)}{suffix}
    </span>
  )
}

export function StatsSection() {
  const stats: Stat[] = [
    {
      icon: Building2,
      number: "500+",
      label: "Properties Sold",
    },
    {
      icon: Users,
      number: "2K+",
      label: "Happy Clients",
    },
    {
      icon: MapPin,
      number: "20+",
      label: "Areas Covered in meerut",
    },
  ]

  // Parse number from string (handles "500+", "2K+", "20+")
  const parseNumber = (numStr: string): { value: number; suffix: string } => {
    const hasPlus = numStr.includes("+")
    const cleanStr = numStr.replace("+", "")
    const hasK = cleanStr.toUpperCase().includes("K")
    
    if (hasK) {
      const num = parseFloat(cleanStr.replace(/[Kk]/g, ""))
      return { value: num * 1000, suffix: "+" }
    }
    
    const num = parseFloat(cleanStr)
    return { value: num, suffix: hasPlus ? "+" : "" }
  }

  return (
    <section className="py-16 bg-secondary/30 relative">
      {/* Decorative divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            const { value, suffix } = parseNumber(stat.number)
            return (
              <motion.div
                key={idx}
                className="glass glass-dark p-8 rounded-2xl border border-primary/20 backdrop-blur-xl text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="text-4xl font-serif font-light text-primary mb-2">
                  <AnimatedCounter targetValue={value} suffix={suffix} />
                </p>
                <p className="text-base text-foreground/70 font-medium">{stat.label}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
