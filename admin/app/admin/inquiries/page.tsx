"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Mail, Phone, Calendar, Home, User, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { inquiriesAPI, generalInquiriesAPI } from "@/lib/api"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface PropertyInquiry {
  _id: string
  name: string
  email: string
  phone: string
  property: {
    _id: string
    title: string
    address?: {
      area: string
      city: string
      state: string
      fullAddress?: string
      pinCode?: string
    }
  }
  message: string
  status: "New" | "Responded" | "Closed"
  createdAt: string
}

interface GeneralInquiry {
  _id: string
  name: string
  email: string
  phone: string
  inquiryType?: string
  message: string
  status: "New" | "Responded" | "Closed"
  createdAt: string
}

type TabType = "property" | "general"

export default function InquiriesPage() {
  const [activeTab, setActiveTab] = useState<TabType>("property")
  const [propertyInquiries, setPropertyInquiries] = useState<PropertyInquiry[]>([])
  const [generalInquiries, setGeneralInquiries] = useState<GeneralInquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    fetchInquiries()
  }, [statusFilter, activeTab])

  const fetchInquiries = async () => {
    try {
      setLoading(true)
      setError("")
      const params: any = { limit: 100 }
      if (statusFilter !== "all") {
        params.status = statusFilter
      }

      if (activeTab === "property") {
        const response = await inquiriesAPI.getAll(params)
        if (response.success) {
          setPropertyInquiries(response.data || [])
        }
      } else {
        const response = await generalInquiriesAPI.getAll(params)
        if (response.success) {
          setGeneralInquiries(response.data || [])
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to load inquiries")
    } finally {
      setLoading(false)
    }
  }

  const handlePropertyStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const response = await inquiriesAPI.update(id, { status: newStatus })
      if (response.success) {
        setPropertyInquiries((prev) =>
          prev.map((inq) =>
            inq._id === id ? { ...inq, status: newStatus as any } : inq
          )
        )
      }
    } catch (err: any) {
      setError(err.message || "Failed to update inquiry status")
    }
  }

  const handleGeneralStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const response = await generalInquiriesAPI.update(id, { status: newStatus })
      if (response.success) {
        setGeneralInquiries((prev) =>
          prev.map((inq) =>
            inq._id === id ? { ...inq, status: newStatus as any } : inq
          )
        )
      }
    } catch (err: any) {
      setError(err.message || "Failed to update inquiry status")
    }
  }

  const currentInquiries = activeTab === "property" ? propertyInquiries : generalInquiries
  const hasInquiries = currentInquiries.length > 0

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-foreground">
              Inquiries
            </h1>
            <p className="mt-2 text-muted-foreground">
              Manage property inquiries and general inquiries from potential clients.
            </p>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Responded">Responded</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("property")}
          className={cn(
            "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
            activeTab === "property"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          <div className="flex items-center gap-2">
            <Home className="size-4" />
            <span>Property Inquiries</span>
            {propertyInquiries.length > 0 && (
              <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                {propertyInquiries.length}
              </span>
            )}
          </div>
        </button>
        <button
          onClick={() => setActiveTab("general")}
          className={cn(
            "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
            activeTab === "general"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          <div className="flex items-center gap-2">
            <User className="size-4" />
            <span>General Inquiries</span>
            {generalInquiries.length > 0 && (
              <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                {generalInquiries.length}
              </span>
            )}
          </div>
        </button>
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mb-4 inline-block size-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="text-muted-foreground">Loading inquiries...</p>
          </div>
        </div>
      ) : !hasInquiries ? (
        <div className="rounded-lg border border-border bg-card p-12 text-center">
          <MessageSquare className="mx-auto mb-4 size-12 text-muted-foreground" />
          <p className="text-lg font-medium">No {activeTab === "property" ? "property" : "general"} inquiries found</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {statusFilter !== "all"
              ? `No ${statusFilter.toLowerCase()} inquiries.`
              : activeTab === "property"
              ? "Property inquiries will appear here when clients inquire about specific properties."
              : "General inquiries will appear here when clients contact you through the contact form."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeTab === "property" ? (
            propertyInquiries.map((inquiry, index) => (
              <motion.div
                key={inquiry._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="rounded-lg border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex gap-4 flex-1 min-w-0">
                    <Avatar className="size-10 sm:size-12 shrink-0">
                      <AvatarImage src="" alt={inquiry.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {inquiry.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <h3 className="text-base sm:text-lg font-serif font-light truncate">
                          {inquiry.name}
                        </h3>
                        <span
                          className={cn(
                            "rounded-full px-3 py-1 text-xs font-medium shrink-0",
                            inquiry.status === "New"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : inquiry.status === "Responded"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          )}
                        >
                          {inquiry.status}
                        </span>
                      </div>
                      <div className="mt-1 space-y-1">
                        <p className="text-sm font-medium text-primary flex items-center gap-1">
                          <Home className="size-3" />
                          {inquiry.property?.title || "Property"}
                        </p>
                        {inquiry.property?.address && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="size-3" />
                            {inquiry.property.address.area}, {inquiry.property.address.city}, {inquiry.property.address.state}
                            {inquiry.property.address.pinCode && ` - ${inquiry.property.address.pinCode}`}
                          </p>
                        )}
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="size-4 shrink-0" />
                          <span className="truncate">{inquiry.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="size-4 shrink-0" />
                          <span>{inquiry.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="size-4 shrink-0" />
                          <span>{format(new Date(inquiry.createdAt), "PPP")}</span>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-foreground">{inquiry.message}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    {inquiry.status === "New" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                        onClick={() => handlePropertyStatusUpdate(inquiry._id, "Responded")}
                      >
                        <MessageSquare className="mr-2 size-4" />
                        Mark as Responded
                      </Button>
                    )}
                    {inquiry.status === "Responded" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                        onClick={() => handlePropertyStatusUpdate(inquiry._id, "Closed")}
                      >
                        Mark as Closed
                      </Button>
                    )}
                    {inquiry.status === "Closed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                        onClick={() => handlePropertyStatusUpdate(inquiry._id, "New")}
                      >
                        Reopen
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            generalInquiries.map((inquiry, index) => (
              <motion.div
                key={inquiry._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="rounded-lg border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex gap-4 flex-1 min-w-0">
                    <Avatar className="size-10 sm:size-12 shrink-0">
                      <AvatarImage src="" alt={inquiry.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {inquiry.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <h3 className="text-base sm:text-lg font-serif font-light truncate">
                          {inquiry.name}
                        </h3>
                        <span
                          className={cn(
                            "rounded-full px-3 py-1 text-xs font-medium shrink-0",
                            inquiry.status === "New"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : inquiry.status === "Responded"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          )}
                        >
                          {inquiry.status}
                        </span>
                      </div>
                      {inquiry.inquiryType && (
                        <p className="mt-1 text-sm font-medium text-primary truncate flex items-center gap-1">
                          <User className="size-3" />
                          {inquiry.inquiryType}
                        </p>
                      )}
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="size-4 shrink-0" />
                          <span className="truncate">{inquiry.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="size-4 shrink-0" />
                          <span>{inquiry.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="size-4 shrink-0" />
                          <span>{format(new Date(inquiry.createdAt), "PPP")}</span>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-foreground">{inquiry.message}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    {inquiry.status === "New" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                        onClick={() => handleGeneralStatusUpdate(inquiry._id, "Responded")}
                      >
                        <MessageSquare className="mr-2 size-4" />
                        Mark as Responded
                      </Button>
                    )}
                    {inquiry.status === "Responded" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                        onClick={() => handleGeneralStatusUpdate(inquiry._id, "Closed")}
                      >
                        Mark as Closed
                      </Button>
                    )}
                    {inquiry.status === "Closed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                        onClick={() => handleGeneralStatusUpdate(inquiry._id, "New")}
                      >
                        Reopen
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
