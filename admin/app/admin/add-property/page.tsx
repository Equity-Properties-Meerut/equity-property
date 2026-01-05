"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Upload, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { propertiesAPI } from "@/lib/api"
import meerutAreas from "@/data/meerut-areas.json"

const propertyTypes = [
  "Apartment",
  "Villa",
  "House",
  "Plot",
  "Commercial",
  "Office Space",
  "Shop",
  "Warehouse",
  "Farmhouse",
]

const transactionTypes = ["Sale", "Rent", "Lease"]

const keyFeatures = [
  "Parking",
  "Security",
  "Lift",
  "Power Backup",
  "Swimming Pool",
  "Gym",
  "Garden",
  "Balcony",
  "Modular Kitchen",
  "Furnished",
  "Semi-Furnished",
  "Unfurnished",
  "Air Conditioning",
  "CCTV",
  "24/7 Water Supply",
  "Intercom",
  "Main Road Facing",
  "Corner Plot",
  "East Facing",
  "West Facing",
  "North Facing",
  "South Facing",
  "Vaastu Compliant",
]

export default function AddPropertyPage() {
  const router = useRouter()
  const [displayImage, setDisplayImage] = useState<File | null>(null)
  const [displayImagePreview, setDisplayImagePreview] = useState<string | null>(null)
  const [additionalImages, setAdditionalImages] = useState<File[]>([])
  const [additionalImagesPreview, setAdditionalImagesPreview] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    propertyType: "",
    title: "",
    price: "",
    transactionType: "",
    area: "",
    description: "",
    yearBuilt: "",
    selectedArea: "",
    fullAddress: "",
    pinCode: "",
  })

  const handleDisplayImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setDisplayImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setDisplayImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAdditionalImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || [])
    const MAX_ADDITIONAL_IMAGES = 8
    
    // Check if adding these files would exceed the limit
    if (additionalImages.length + files.length > MAX_ADDITIONAL_IMAGES) {
      setError(`Maximum ${MAX_ADDITIONAL_IMAGES} additional images allowed. You can add ${MAX_ADDITIONAL_IMAGES - additionalImages.length} more image(s).`)
      e.target.value = '' // Reset input
      return
    }
    
    setError("") // Clear any previous errors
    setAdditionalImages((prev) => [...prev, ...files])
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAdditionalImagesPreview((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index))
    setAdditionalImagesPreview((prev) => prev.filter((_, i) => i !== index))
  }

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const formDataToSend = new FormData()
      
      // Add form fields
      formDataToSend.append("propertyType", formData.propertyType)
      formDataToSend.append("title", formData.title)
      formDataToSend.append("price", formData.price)
      formDataToSend.append("transactionType", formData.transactionType)
      formDataToSend.append("area", formData.area)
      formDataToSend.append("description", formData.description)
      if (formData.yearBuilt) {
        formDataToSend.append("yearBuilt", formData.yearBuilt)
      }
      formDataToSend.append("keyFeatures", JSON.stringify(selectedFeatures))
      formDataToSend.append("address[state]", "Uttar Pradesh")
      formDataToSend.append("address[city]", "Meerut")
      formDataToSend.append("address[area]", formData.selectedArea)
      formDataToSend.append("address[fullAddress]", formData.fullAddress)
      formDataToSend.append("address[pinCode]", formData.pinCode)

      // Add images
      if (displayImage) {
        formDataToSend.append("displayImage", displayImage)
      }
      additionalImages.forEach((image) => {
        formDataToSend.append("additionalImages", image)
      })

      const response = await propertiesAPI.create(formDataToSend)
      
      if (response.success) {
        router.push("/admin/my-properties")
      }
    } catch (err: any) {
      setError(err.message || "Failed to create property")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-serif font-light text-foreground">
          Add Property
        </h1>
        <p className="mt-2 text-muted-foreground">
          Create a new property listing for your portfolio.
        </p>
      </motion.div>

      {error && (
        <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Display Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="rounded-lg border border-border bg-card p-6 shadow-sm"
        >
          <Label className="mb-4 block text-base font-medium">
            Display Image <span className="text-destructive">*</span>
          </Label>
          <div className="space-y-4">
            {displayImagePreview ? (
              <div className="relative">
                <img
                  src={displayImagePreview}
                  alt="Display"
                  className="h-64 w-full rounded-lg object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => {
                    setDisplayImage(null)
                    setDisplayImagePreview(null)
                  }}
                >
                  <X className="size-4" />
                </Button>
              </div>
            ) : (
              <label className="flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 transition-colors hover:bg-muted">
                <Upload className="mb-2 size-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Click to upload display image
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleDisplayImageChange}
                  required
                />
              </label>
            )}
          </div>
        </motion.div>

        {/* Additional Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-lg border border-border bg-card p-6 shadow-sm"
        >
          <div className="mb-4 flex items-center justify-between">
            <Label className="block text-base font-medium">
              Additional Images
            </Label>
            <span className="text-sm text-muted-foreground">
              {additionalImages.length}/8 images
            </span>
          </div>
          <p className="mb-4 text-xs text-muted-foreground">
            You can add up to 8 additional images (1 display image + 8 additional = 9 total)
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {additionalImagesPreview.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Additional ${index + 1}`}
                  className="h-32 w-full rounded-lg object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute right-1 top-1 size-6"
                  onClick={() => removeAdditionalImage(index)}
                >
                  <X className="size-3" />
                </Button>
              </div>
            ))}
            {additionalImages.length < 8 && (
              <label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 transition-colors hover:bg-muted">
                <Plus className="size-6 text-muted-foreground" />
                <span className="mt-1 text-xs text-muted-foreground">
                  Add Image
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleAdditionalImagesChange}
                />
              </label>
            )}
          </div>
        </motion.div>

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
            <div className="space-y-2">
              <Label htmlFor="propertyType">
                Property Type <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.propertyType}
                onValueChange={(value) =>
                  setFormData({ ...formData, propertyType: value })
                }
              >
                <SelectTrigger id="propertyType">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">
                Property Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter property title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">
                Price (₹) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="Enter price in rupees"
                min="0"
                step="1000"
                required
              />
              <p className="text-xs text-muted-foreground">
                Enter price in Indian Rupees (e.g., 5000000 for ₹50 Lakhs)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transactionType">
                Transaction Type <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.transactionType}
                onValueChange={(value) =>
                  setFormData({ ...formData, transactionType: value })
                }
              >
                <SelectTrigger id="transactionType">
                  <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>
                <SelectContent>
                  {transactionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">
                Area (sq ft) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="area"
                type="number"
                value={formData.area}
                onChange={(e) =>
                  setFormData({ ...formData, area: e.target.value })
                }
                placeholder="Enter area in square feet"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearBuilt">Year Built (Optional)</Label>
              <Input
                id="yearBuilt"
                type="number"
                value={formData.yearBuilt}
                onChange={(e) =>
                  setFormData({ ...formData, yearBuilt: e.target.value })
                }
                placeholder="Enter year built"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description">
                Description (About this property){" "}
                <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe the property..."
                rows={5}
                required
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Key Features</Label>
              <div className="flex flex-wrap gap-2">
                {keyFeatures.map((feature) => (
                  <Button
                    key={feature}
                    type="button"
                    variant={
                      selectedFeatures.includes(feature) ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => toggleFeature(feature)}
                  >
                    {feature}
                  </Button>
                ))}
              </div>
            </div>
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
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value="Uttar Pradesh"
                disabled
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value="Meerut"
                disabled
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="selectedArea">
                Area <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.selectedArea}
                onValueChange={(value) =>
                  setFormData({ ...formData, selectedArea: value })
                }
              >
                <SelectTrigger id="selectedArea" className="w-full">
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  {meerutAreas.areas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pinCode">
                Pin Code <span className="text-destructive">*</span>
              </Label>
              <Input
                id="pinCode"
                type="text"
                value={formData.pinCode}
                onChange={(e) =>
                  setFormData({ ...formData, pinCode: e.target.value })
                }
                placeholder="Enter pin code"
                maxLength={6}
                pattern="[0-9]{6}"
                required
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="fullAddress">
                Full Address <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="fullAddress"
                value={formData.fullAddress}
                onChange={(e) =>
                  setFormData({ ...formData, fullAddress: e.target.value })
                }
                placeholder="Enter complete address"
                rows={3}
                required
              />
            </div>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-end gap-4"
        >
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Add Property"}
          </Button>
        </motion.div>
      </form>
    </div>
  )
}
