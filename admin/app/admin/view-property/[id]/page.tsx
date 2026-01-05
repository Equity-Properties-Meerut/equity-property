"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Home, MapPin, Calendar, /* DollarSign, */ ArrowLeft, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { propertiesAPI } from "@/lib/api"

interface Property {
  _id: string
  propertyType: string
  title: string
  price: number
  transactionType: string
  area: number
  description: string
  yearBuilt?: number
  keyFeatures: string[]
  status: "active" | "inactive"
  address: {
    state: string
    city: string
    area: string
    fullAddress: string
    pinCode: string
  }
  displayImage?: {
    url: string
    publicId: string
  }
  additionalImages?: Array<{
    url: string
    publicId: string
  }>
  createdAt: string
  updatedAt: string
}

export default function ViewPropertyPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchProperty()
  }, [id])

  const fetchProperty = async () => {
    try {
      setLoading(true)
      const response = await propertiesAPI.getById(id)
      if (response.success) {
        setProperty(response.data)
      }
    } catch (err: any) {
      setError(err.message || "Failed to load property")
    } finally {
      setLoading(false)
    }
  }

  // formatPrice function - commented out for future use
  // const formatPrice = (price: number) => {
  //   return new Intl.NumberFormat("en-IN", {
  //     style: "currency",
  //     currency: "INR",
  //     maximumFractionDigits: 0,
  //   }).format(price)
  // }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block size-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="text-muted-foreground">Loading property...</p>
        </div>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <p className="text-lg font-medium">
            {error || "Property not found"}
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push("/admin/my-properties")}
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to Properties
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-light text-foreground">
            {property.title}
          </h1>
          <p className="mt-2 text-muted-foreground">
            View property details and information.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/my-properties")}
          >
            <ArrowLeft className="mr-2 size-4" />
            Back
          </Button>
          <Button
            onClick={() => router.push(`/admin/edit-property/${property._id}`)}
          >
            <Edit className="mr-2 size-4" />
            Edit
          </Button>
        </div>
      </motion.div>

      {/* Display Image */}
      {property.displayImage?.url && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"
        >
          <img
            src={property.displayImage.url}
            alt={property.title}
            className="h-96 w-full object-cover"
          />
        </motion.div>
      )}

      {/* Additional Images */}
      {property.additionalImages && property.additionalImages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-lg border border-border bg-card p-6 shadow-sm"
        >
          <h2 className="mb-4 text-xl font-serif font-light">
            Additional Images
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {property.additionalImages.map((img, index) => (
              <div key={index} className="overflow-hidden rounded-lg">
                <img
                  src={img.url}
                  alt={`${property.title} - Image ${index + 1}`}
                  className="h-32 w-full object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Property Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="rounded-lg border border-border bg-card p-6 shadow-sm"
      >
        <h2 className="mb-6 text-xl font-serif font-light">
          Property Details
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <Home className="mt-1 size-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Property Type</p>
              <p className="text-base font-medium">{property.propertyType}</p>
            </div>
          </div>

          {/* Price display - commented out for future use */}
          {/* <div className="flex items-start gap-3">
            <DollarSign className="mt-1 size-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="text-base font-medium">
                {formatPrice(property.price)}
              </p>
            </div>
          </div> */}

          <div className="flex items-start gap-3">
            <div className="mt-1 size-5" />
            <div>
              <p className="text-sm text-muted-foreground">Transaction Type</p>
              <p className="text-base font-medium">
                {property.transactionType}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1 size-5" />
            <div>
              <p className="text-sm text-muted-foreground">Area</p>
              <p className="text-base font-medium">
                {property.area.toLocaleString()} sq ft
              </p>
            </div>
          </div>

          {property.yearBuilt && (
            <div className="flex items-start gap-3">
              <Calendar className="mt-1 size-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Year Built</p>
                <p className="text-base font-medium">{property.yearBuilt}</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <div className="mt-1 size-5" />
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="text-base font-medium capitalize">
                {property.status}
              </p>
            </div>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <p className="text-sm text-muted-foreground">Description</p>
            <p className="text-base leading-relaxed">{property.description}</p>
          </div>

          {property.keyFeatures && property.keyFeatures.length > 0 && (
            <div className="space-y-2 sm:col-span-2">
              <p className="text-sm text-muted-foreground">Key Features</p>
              <div className="flex flex-wrap gap-2">
                {property.keyFeatures.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full bg-muted px-3 py-1 text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Address */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="rounded-lg border border-border bg-card p-6 shadow-sm"
      >
        <h2 className="mb-6 text-xl font-serif font-light">Address</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 size-5 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-base font-medium">{property.address.fullAddress}</p>
              <p className="text-sm text-muted-foreground">
                {property.address.area}, {property.address.city},{" "}
                {property.address.state} - {property.address.pinCode}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Metadata */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="rounded-lg border border-border bg-card p-6 shadow-sm"
      >
        <h2 className="mb-6 text-xl font-serif font-light">Metadata</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Created At</p>
            <p className="text-base font-medium">
              {formatDate(property.createdAt)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Updated</p>
            <p className="text-base font-medium">
              {formatDate(property.updatedAt)}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

