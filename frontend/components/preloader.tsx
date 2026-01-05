"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Key, Building2, MapPin } from "lucide-react"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 30)

    // Hide preloader after animation completes
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="relative flex flex-col items-center justify-center space-y-4 sm:space-y-8 px-4">
            {/* Main Logo/Icon Container */}
            <div className="relative w-20 h-20 sm:w-32 sm:h-32 flex items-center justify-center">
              {/* Rotating Key with Unlock Animation */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.15, 1],
                  y: [0, -5, 0],
                }}
                transition={{
                  rotate: {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <Key className="w-8 h-8 sm:w-12 sm:h-12 text-primary" strokeWidth={1.5} />
              </motion.div>

              {/* Building/House Icon */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Building2 className="w-12 h-12 sm:w-20 sm:h-20 text-primary/60" strokeWidth={1.5} />
              </motion.div>

              {/* Pulsing Rings */}
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0 rounded-full border-2 border-primary/30"
                  animate={{
                    scale: [1, 1.5, 1.5],
                    opacity: [0.5, 0, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.4,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            {/* Company Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-light tracking-wide">
                <span className="text-primary">Equity</span>{" "}
                <span className="text-foreground">Properties</span>{" "}
                <span className="text-foreground">Meerut</span>
              </h2>
              <motion.p
                className="text-xs sm:text-sm text-foreground/60 mt-2 uppercase tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Unlocking Your Dream Home
              </motion.p>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-48 sm:w-64 space-y-2">
              <div className="h-1 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              <motion.p
                className="text-xs text-center text-foreground/50 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {progress}%
              </motion.p>
            </div>

            {/* Floating Real Estate Icons */}
            {mounted && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => {
                  const icons = [Home, Building2, MapPin]
                  const Icon = icons[i % icons.length]
                  const positions = [
                    { x: "10%", y: "20%" },
                    { x: "80%", y: "15%" },
                    { x: "15%", y: "70%" },
                    { x: "85%", y: "75%" },
                    { x: "50%", y: "10%" },
                    { x: "5%", y: "50%" },
                    { x: "95%", y: "45%" },
                    { x: "45%", y: "85%" },
                  ]
                  const pos = positions[i] || { x: "50%", y: "50%" }
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: pos.x,
                        top: pos.y,
                      }}
                      initial={{
                        opacity: 0,
                        scale: 0.5,
                        y: 0,
                      }}
                      animate={{
                        y: [0, -30, 0],
                        opacity: [0, 0.4, 0],
                        scale: [0.5, 1, 0.5],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                      }}
                    >
                      <Icon
                        className="w-5 h-5 text-primary/15"
                        strokeWidth={1.5}
                      />
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

