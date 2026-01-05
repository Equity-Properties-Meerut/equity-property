"use client"

import type React from "react"
import { useState } from "react"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Phone, Mail, MapPin, Loader2 } from "lucide-react"
import { generalInquiriesAPI } from "@/lib/api"

export function ContactContent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Combine first and last name
      const fullName = `${formData.firstName} ${formData.lastName}`.trim()
      
      // Add inquiry type to message if provided
      let message = formData.message
      if (formData.inquiryType) {
        message = `Inquiry Type: ${formData.inquiryType}\n\n${message}`
      }

      const response = await generalInquiriesAPI.create({
        name: fullName,
        email: formData.email,
        phone: formData.phone,
        inquiryType: formData.inquiryType || undefined,
        message: message,
      })

      if (response.success) {
        setSuccess(true)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          inquiryType: "",
          message: "",
        })
        setTimeout(() => setSuccess(false), 5000)
      }
    } catch (err: any) {
      setError(err.message || "Failed to send inquiry. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            suppressHydrationWarning
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-balance mb-4 sm:mb-6 md:mb-8">Get in Touch</h1>
            <p className="text-base sm:text-lg text-foreground/70">
              We'd love to hear from you. Contact us for property inquiries or general information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Contact Info Cards */}
            {[
              { icon: Phone, title: "Phone", details: ["+91 9690338698", "Mr. Gaurav Chaudhary (Owner)"] },
              { icon: Mail, title: "Email", details: ["Gav.chy12345@gmail.com"] },
              { icon: MapPin, title: "Address", details: ["Gayatri enclave colony, Meerut, Uttar Pradesh"] },
            ].map((info, idx) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={idx}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  suppressHydrationWarning
                >
                  <Icon className="w-12 h-12 text-primary mx-auto mb-6" />
                  <h3 className="text-xl font-serif font-light mb-4">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-foreground/70 mb-2">
                      {detail}
                    </p>
                  ))}
                </motion.div>
              )
            })}
          </div>

          {/* Contact Form */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            suppressHydrationWarning
          >
            {success && (
              <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg text-sm">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}
            {error && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Inquiry Type</label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value="">Select an option</option>
                  <option value="Property Inquiry">Property Inquiry</option>
                  <option value="Schedule Property Viewing">Schedule Property Viewing</option>
                  <option value="General Question">General Question</option>
                  <option value="Partnership Opportunity">Partnership Opportunity</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-32 resize-none bg-background"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                suppressHydrationWarning
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

