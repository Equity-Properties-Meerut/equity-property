"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { MapPin, Maximize2, Calendar, Phone, Mail, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { use } from "react"
import { propertiesAPI, inquiriesAPI } from "@/lib/api"
import { formatPrice } from "@/lib/price-format"

interface Property {
  _id: string
  title: string
  propertyType: string
  transactionType: string
  price: number
  area: number
  yearBuilt?: number
  description: string
  keyFeatures: string[]
  displayImage: {
    url: string
  }
  additionalImages: Array<{
    url: string
  }>
  address: {
    area: string
    city: string
    state: string
    fullAddress: string
    pinCode: string
  }
}

export default function PropertyDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImage, setCurrentImage] = useState(0)
  const [inquiryLoading, setInquiryLoading] = useState(false)
  const [inquirySuccess, setInquirySuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  useEffect(() => {
    fetchProperty()
  }, [resolvedParams.id])

  const fetchProperty = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await propertiesAPI.getById(resolvedParams.id)
      if (response.success) {
        setProperty(response.data)
      } else {
        setError(response.message || "Property not found")
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch property")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!property) return

    try {
      setInquiryLoading(true)
      setInquirySuccess(false)
      const response = await inquiriesAPI.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        property: property._id,
        message: formData.message,
      })

      if (response.success) {
        setInquirySuccess(true)
        setFormData({ name: "", email: "", phone: "", message: "" })
        setTimeout(() => setInquirySuccess(false), 5000)
      }
    } catch (err: any) {
      alert(err.message || "Failed to send inquiry")
    } finally {
      setInquiryLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="size-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-foreground/70">Loading property...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (error || !property) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-3xl font-serif mb-4">Property not found</h1>
          <p className="text-foreground/70 mb-6">{error || "The property you're looking for doesn't exist."}</p>
          <Link href="/properties" className="text-primary hover:underline inline-block">
            Back to Properties
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const allImages = [property.displayImage, ...property.additionalImages].filter(Boolean)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Image Gallery */}
      <section className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground mb-6 transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Properties
          </Link>

          <div className="relative h-[60vh] rounded-2xl overflow-hidden group">
            <motion.img
              key={currentImage}
              src={allImages[currentImage]?.url || "/placeholder.svg"}
              alt={property.title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight size={24} />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {allImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentImage ? "bg-background w-8" : "bg-background/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 gap-4 mt-4">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`relative h-24 rounded-lg overflow-hidden transition-all ${
                    idx === currentImage ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img?.url || "/placeholder.svg"} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Property Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-4xl md:text-5xl font-serif font-light mb-4">{property.title}</h1>
                <div className="flex items-center gap-2 text-foreground/70 mb-2">
                  <MapPin size={20} />
                  <span className="text-lg">{property.address.area}, {property.address.city}</span>
                </div>
                <p className="text-sm text-foreground/60 mb-4">{property.propertyType} • {property.transactionType}</p>
                {property.price && (
                  <div className="mb-8">
                    <p className="text-4xl font-light text-primary">
                      {formatPrice(property.price, property.transactionType)}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-border">
                  <div className="flex items-center gap-3">
                    <Maximize2 size={24} className="text-foreground/70" />
                    <div>
                      <p className="text-sm text-foreground/70">Area</p>
                      <p className="font-semibold">{property.area.toLocaleString()} sqft</p>
                    </div>
                  </div>
                  {property.yearBuilt && (
                    <div className="flex items-center gap-3">
                      <Calendar size={24} className="text-foreground/70" />
                      <div>
                        <p className="text-sm text-foreground/70">Year Built</p>
                        <p className="font-semibold">{property.yearBuilt}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-serif font-light mb-4">About This Property</h2>
                  <p className="text-foreground/80 leading-relaxed">{property.description}</p>
                </div>

                {property.keyFeatures && property.keyFeatures.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-serif font-light mb-4">Key Features</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {property.keyFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-8 pt-8 border-t border-border">
                  <h2 className="text-2xl font-serif font-light mb-4">Address</h2>
                  <p className="text-foreground/80 leading-relaxed">{property.address.fullAddress}</p>
                  <p className="text-foreground/70 mt-2">
                    {property.address.area}, {property.address.city}, {property.address.state} - {property.address.pinCode}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Sidebar - Contact Form */}
            <div className="lg:col-span-1">
              <motion.div
                className="sticky top-24 p-8 rounded-2xl bg-secondary border border-border"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl font-serif font-light mb-6">Interested in this property?</h3>
                {inquirySuccess && (
                  <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg text-sm">
                    Inquiry sent successfully! We'll get back to you soon.
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-background resize-none"
                      placeholder="I'm interested in this property..."
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={inquiryLoading}
                    className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: inquiryLoading ? 1 : 1.02 }}
                    whileTap={{ scale: inquiryLoading ? 1 : 0.98 }}
                  >
                    {inquiryLoading ? "Sending..." : "Send Inquiry"}
                  </motion.button>
                </form>

                <div className="mt-8 pt-8 border-t border-border space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone size={20} className="text-primary" />
                    <div>
                      <p className="text-sm text-foreground/70">Call us</p>
                      <p className="font-medium">+91 9690338698</p>
                      <p className="text-xs text-foreground/60">Mr. Gaurav Chaudhary</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-primary" />
                    <div>
                      <p className="text-sm text-foreground/70">Email us</p>
                      <p className="font-medium">info@equityproperties.com</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
