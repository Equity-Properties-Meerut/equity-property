"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Home, Edit, Trash2, Power, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { propertiesAPI } from "@/lib/api"

interface Property {
  _id: string
  title: string
  address: {
    area: string
    city: string
    state: string
  }
  price: number
  status: "active" | "inactive"
  displayImage?: {
    url: string
    publicId: string
  }
}

export default function MyPropertiesPage() {
  const router = useRouter()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      setLoading(true)
      const response = await propertiesAPI.getAll({ limit: 100 })
      if (response.success) {
        setProperties(response.data || [])
      }
    } catch (err: any) {
      setError(err.message || "Failed to load properties")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    try {
      setUpdatingStatus(id)
      const newStatus = currentStatus === "active" ? "inactive" : "active"
      const response = await propertiesAPI.updateStatus(id, newStatus)
      if (response.success) {
        setProperties((prev) =>
          prev.map((prop) =>
            prop._id === id ? { ...prop, status: newStatus } : prop
          )
        )
      }
    } catch (err: any) {
      setError(err.message || "Failed to update status")
    } finally {
      setUpdatingStatus(null)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await propertiesAPI.delete(id)
      setProperties((prev) => prev.filter((prop) => prop._id !== id))
    } catch (err: any) {
      setError(err.message || "Failed to delete property")
    }
  }

  const handleEdit = (id: string) => {
    router.push(`/admin/edit-property/${id}`)
  }

  const handleView = (id: string) => {
    router.push(`/admin/view-property/${id}`)
  }

  // formatPrice function - commented out for future use
  // const formatPrice = (price: number) => {
  //   return new Intl.NumberFormat("en-IN", {
  //     style: "currency",
  //     currency: "INR",
  //     maximumFractionDigits: 0,
  //   }).format(price)
  // }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block size-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="text-muted-foreground">Loading properties...</p>
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
      >
        <h1 className="text-2xl sm:text-3xl font-serif font-light text-foreground">
          My Properties
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage all your property listings in one place.
        </p>
      </motion.div>

      {error && (
        <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {properties.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <Home className="mx-auto mb-4 size-12 text-muted-foreground" />
          <p className="text-lg font-medium">No properties found</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Get started by adding your first property.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property, index) => (
            <motion.div
              key={property._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-48 bg-muted overflow-hidden">
                {property.displayImage?.url ? (
                  <img
                    src={property.displayImage.url}
                    alt={property.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Home className="size-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      property.status === "active"
                        ? "bg-accent/20 text-accent"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {property.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-1 text-lg font-serif font-light">
                  {property.title}
                </h3>
                <p className="mb-1 text-sm text-muted-foreground">
                  {property.address.area}
                </p>
                <p className="mb-1 text-sm text-muted-foreground">
                  {property.address.city}, {property.address.state}
                </p>
                {/* Price display - commented out for future use */}
                {/* <p className="mb-4 text-xl font-medium text-primary">
                  {formatPrice(property.price)}
                </p> */}

                {/* Status Toggle */}
                <div className="mb-4 flex items-center justify-between rounded-lg border border-border bg-muted/50 p-3">
                  <div className="flex items-center gap-2">
                    <Power className="size-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Status</span>
                  </div>
                  <Switch
                    checked={property.status === "active"}
                    onCheckedChange={() =>
                      handleStatusToggle(property._id, property.status)
                    }
                    disabled={updatingStatus === property._id}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleView(property._id)}
                    >
                      <Eye className="mr-2 size-4" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEdit(property._id)}
                    >
                      <Edit className="mr-2 size-4" />
                      Edit
                    </Button>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full">
                        <Trash2 className="mr-2 size-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the property "{property.title}".
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(property._id)}
                          className="bg-destructive text-white hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
