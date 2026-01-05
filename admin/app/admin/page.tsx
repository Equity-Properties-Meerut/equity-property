"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Home, MessageSquare, CheckCircle } from "lucide-react"
import { propertiesAPI, inquiriesAPI, generalInquiriesAPI } from "@/lib/api"

interface DashboardStats {
  totalProperties: number
  activeProperties: number
  inactiveProperties: number
  propertiesAdded: number
}

interface InquiryStats {
  totalInquiries: number
  newInquiries: number
  respondedInquiries: number
  closedInquiries: number
}

interface Property {
  _id: string
  title: string
  status: string
  createdAt: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [inquiryStats, setInquiryStats] = useState<InquiryStats | null>(null)
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [statsRes, propertyInquiryStatsRes, generalInquiryStatsRes, propertiesRes] = await Promise.all([
        propertiesAPI.getDashboardStats(),
        inquiriesAPI.getStats(),
        generalInquiriesAPI.getStats(),
        propertiesAPI.getAll({ limit: 5, page: 1 }),
      ])

      if (statsRes.success) {
        setStats(statsRes.data)
      }
      
      // Combine property and general inquiry stats
      if (propertyInquiryStatsRes.success && generalInquiryStatsRes.success) {
        const propertyStats = propertyInquiryStatsRes.data || {}
        const generalStats = generalInquiryStatsRes.data || {}
        
        setInquiryStats({
          totalInquiries: (propertyStats.totalInquiries || 0) + (generalStats.totalInquiries || 0),
          newInquiries: (propertyStats.newInquiries || 0) + (generalStats.newInquiries || 0),
          respondedInquiries: (propertyStats.respondedInquiries || 0) + (generalStats.respondedInquiries || 0),
          closedInquiries: (propertyStats.closedInquiries || 0) + (generalStats.closedInquiries || 0),
        })
      } else if (propertyInquiryStatsRes.success) {
        setInquiryStats(propertyInquiryStatsRes.data)
      }
      
      if (propertiesRes.success) {
        setProperties(propertiesRes.data || [])
      }
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const statsCards = [
    {
      title: "Total Properties",
      value: stats?.totalProperties?.toString() || "0",
      change: "All properties",
      icon: Home,
      color: "text-primary",
    },
    {
      title: "Total Inquiries",
      value: inquiryStats?.totalInquiries?.toString() || "0",
      change: "New inquiries",
      icon: MessageSquare,
      color: "text-primary",
    },
    {
      title: "Active Properties",
      value: stats?.activeProperties?.toString() || "0",
      change: "Currently active",
      icon: CheckCircle,
      color: "text-primary",
    },
  ]

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block size-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
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
          Dashboard
        </h1>
        <p className="mt-2 text-muted-foreground">
          Welcome back! Here's an overview of your properties and inquiries.
        </p>
      </motion.div>

      {error && (
        <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="rounded-lg border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="mt-2 text-3xl font-serif font-light">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.change}
                  </p>
                </div>
                <div className={`rounded-full bg-secondary p-3 ${stat.color}`}>
                  <Icon className="size-6" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Properties Added Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="rounded-lg border border-border bg-card p-6 shadow-sm mb-20 sm:mb-6"
      >
        <h2 className="mb-4 text-xl font-serif font-light">Properties Added</h2>
        {properties.length === 0 ? (
          <p className="text-sm text-muted-foreground">No properties added yet.</p>
        ) : (
          <div className="space-y-3">
            {properties.map((property) => (
              <div
                key={property._id}
                className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <div className="flex-1">
                  <p className="font-medium">{property.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(property.createdAt).toLocaleDateString()}
                  </p>
                </div>
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
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
