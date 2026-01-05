"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryImage {
  url: string
  alt: string
}

export function PropertyGallery() {
  // Static gallery images from /Gallery/ directory
  const images: GalleryImage[] = [
    { url: "/Gallery/g1.jpeg", alt: "Gallery Image 1" },
    { url: "/Gallery/g2.jpeg", alt: "Gallery Image 2" },
    { url: "/Gallery/g3.jpeg", alt: "Gallery Image 3" },
    { url: "/Gallery/g4.jpeg", alt: "Gallery Image 4" },
    { url: "/Gallery/g5.jpeg", alt: "Gallery Image 5" },
    { url: "/Gallery/g6.jpeg", alt: "Gallery Image 6" },
    { url: "/Gallery/g7.jpeg", alt: "Gallery Image 7" },
    { url: "/Gallery/g8.jpeg", alt: "Gallery Image 8" },
    { url: "/Gallery/g9.jpeg", alt: "Gallery Image 9" },
    { url: "/Gallery/g10.jpeg", alt: "Gallery Image 10" },
    { url: "/Gallery/g11.jpeg", alt: "Gallery Image 11" },
    { url: "/Gallery/g12.jpg", alt: "Gallery Image 12" },
  ]

  // Duplicate images for seamless infinite scroll
  const duplicatedImages = [...images, ...images, ...images]
  const scrollRef = useRef<HTMLDivElement>(null)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "unset"
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length)
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    if (selectedImage !== null) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          closeLightbox()
        } else if (e.key === "ArrowRight") {
          setSelectedImage((prev) => (prev !== null ? (prev + 1) % images.length : null))
        } else if (e.key === "ArrowLeft") {
          setSelectedImage((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null))
        }
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedImage, images.length])

  // Handle seamless infinite scroll
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5 // pixels per frame
    
    // Calculate the width of one set of images dynamically
    const getSingleSetWidth = () => {
      const firstChild = scrollContainer.firstElementChild as HTMLElement
      if (!firstChild) return 0
      const cardWidth = firstChild.offsetWidth
      const gap = 24 // gap-6 = 1.5rem = 24px
      return images.length * (cardWidth + gap)
    }

    const animate = () => {
      scrollPosition += scrollSpeed
      const resetPoint = getSingleSetWidth()
      
      // Reset position seamlessly when we've scrolled through one set of images
      // This works because we have 3 sets of images, so when we reset, it looks seamless
      if (resetPoint > 0 && scrollPosition >= resetPoint) {
        scrollPosition = 0
      }
      
      scrollContainer.style.transform = `translateX(-${scrollPosition}px)`
      animationId = requestAnimationFrame(animate)
    }

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      animationId = requestAnimationFrame(animate)
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [images.length])

  return (
    <>
      <section className="py-20 md:py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
              Property Gallery
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-balance">
              Explore Our Portfolio
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
              A visual journey through our exceptional properties, showcasing the finest real estate in Meerut.
            </p>
          </motion.div>

          {/* Infinite Scroll Carousel */}
          <div className="overflow-hidden">
            <div
              ref={scrollRef}
              className="flex gap-6"
              style={{ willChange: 'transform' }}
            >
              {duplicatedImages.map((image, index) => {
                const originalIndex = index % images.length
                return (
                  <div
                    key={index}
                    className="shrink-0 cursor-pointer group relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 w-[300px]"
                    onClick={() => openLightbox(originalIndex)}
                  >
                    <div className="relative w-full aspect-square">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-background/90 backdrop-blur-sm rounded-full p-3">
                          <svg
                            className="w-6 h-6 text-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/20 hover:bg-background/40 transition-colors text-background"
          >
            <X size={24} />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                className="absolute left-4 z-10 p-3 rounded-full bg-background/20 hover:bg-background/40 transition-colors text-background"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                className="absolute right-4 z-10 p-3 rounded-full bg-background/20 hover:bg-background/40 transition-colors text-background"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <motion.div
            className="relative max-w-7xl max-h-[90vh] w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedImage].url}
              alt={images[selectedImage].alt}
              className="w-full h-full object-contain max-h-[90vh] rounded-lg"
            />
          </motion.div>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImage(idx)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === selectedImage
                      ? "bg-background w-8"
                      : "bg-background/50"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </>
  )
}

