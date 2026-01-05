"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Search, MapPin, Maximize2, ChevronLeft, ChevronRight, Loader2, Filter, X } from "lucide-react"
import Link from "next/link"
import { propertiesAPI } from "@/lib/api"
import meerutAreas from "@/data/meerut-areas.json"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface Property {
  _id: string
  title: string
  propertyType: string
  transactionType: string
  price: number
  area: number
  displayImage: {
    url: string
  }
  address: {
    area: string
    city: string
    state: string
  }
  status: string
}

const PROPERTIES_PER_PAGE = 9

export function PropertiesContent() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [priceFilter] = useState("all")
  const [areaFilter, setAreaFilter] = useState("all")
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("all")
  const [transactionTypeFilter, setTransactionTypeFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    fetchProperties()
  }, [areaFilter, propertyTypeFilter, transactionTypeFilter])

  const fetchProperties = async () => {
    try {
      setLoading(true)
      setError(null)

      const params: any = {
        status: "active",
        page: currentPage,
        limit: 100,
      }

      if (areaFilter !== "all") {
        params.area = areaFilter
      }

      if (propertyTypeFilter !== "all") {
        params.propertyType = propertyTypeFilter
      }

      if (transactionTypeFilter !== "all") {
        params.transactionType = transactionTypeFilter
      }

      const response = await propertiesAPI.getAll(params)
      if (response.success) {
        setProperties(response.data || [])
      } else {
        setError(response.message || "Failed to fetch properties")
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch properties")
    } finally {
      setLoading(false)
    }
  }

  const filteredProperties = properties.filter((prop) => {
    const matchesSearch =
      prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.address.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.propertyType.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, areaFilter, propertyTypeFilter, transactionTypeFilter])

  const totalPages = Math.ceil(filteredProperties.length / PROPERTIES_PER_PAGE)
  const startIndex = (currentPage - 1) * PROPERTIES_PER_PAGE
  const endIndex = startIndex + PROPERTIES_PER_PAGE
  const currentProperties = filteredProperties.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-balance mb-4 sm:mb-6 md:mb-8">
              Explore Our Collection
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-20 bg-background/95 backdrop-blur-md border-b border-border py-4 sm:py-6 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" size={18} />
              <input
                type="text"
                placeholder="Search properties..."
                className="w-full pl-10 pr-4 py-2.5 sm:py-2 text-sm sm:text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="relative px-4 py-2.5 sm:py-2 gap-2">
                  <Filter className="size-4 sm:size-5" />
                  <span className="hidden sm:inline">Filters</span>
                  {(areaFilter !== "all" || propertyTypeFilter !== "all" || transactionTypeFilter !== "all") && (
                    <span className="absolute -top-1 -right-1 size-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                      {[areaFilter !== "all", propertyTypeFilter !== "all", transactionTypeFilter !== "all"].filter(Boolean).length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[calc(100vw-2rem)] sm:w-96 max-h-[85vh] overflow-y-auto" align="end" side="bottom" sideOffset={8} collisionPadding={16}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between sticky top-0 bg-background pb-2 z-10">
                    <h3 className="font-semibold text-base">Filter Properties</h3>
                    {(areaFilter !== "all" || propertyTypeFilter !== "all" || transactionTypeFilter !== "all") && (
                      <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground" onClick={() => { setAreaFilter("all"); setPropertyTypeFilter("all"); setTransactionTypeFilter("all") }}>
                        <X className="mr-1 size-3" />
                        Clear
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Area</label>
                    <select value={areaFilter} onChange={(e) => setAreaFilter(e.target.value)} className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background">
                      <option value="all">All Areas</option>
                      {meerutAreas.areas.map((area) => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Property Type</label>
                    <select value={propertyTypeFilter} onChange={(e) => setPropertyTypeFilter(e.target.value)} className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background">
                      <option value="all">All Types</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                      <option value="House">House</option>
                      <option value="Plot">Plot</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Office Space">Office Space</option>
                      <option value="Shop">Shop</option>
                      <option value="Warehouse">Warehouse</option>
                      <option value="Farmhouse">Farmhouse</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Transaction Type</label>
                    <select value={transactionTypeFilter} onChange={(e) => setTransactionTypeFilter(e.target.value)} className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background">
                      <option value="all">All Transactions</option>
                      <option value="Sale">Sale</option>
                      <option value="Rent">Rent</option>
                      <option value="Lease">Lease</option>
                    </select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="size-8 animate-spin text-primary" />
              <span className="ml-3 text-foreground/70">Loading properties...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-destructive mb-4">{error}</p>
              <button onClick={fetchProperties} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">Try Again</button>
            </div>
          ) : (
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.1 }}>
              {currentProperties.map((property, idx) => (
                <Link key={property._id} href={`/properties/${property._id}`}>
                  <motion.div className="group cursor-pointer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -8 }}>
                    <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                      <img src={property.displayImage?.url || "/placeholder.svg"} alt={`${property.title} - ${property.propertyType} in ${property.address.area}, Meerut`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="text-lg font-serif font-light mb-2">{property.title}</h3>
                    <div className="flex items-center gap-2 text-foreground/70 text-sm mb-2">
                      <MapPin size={14} />
                      <span>{property.address.area}, {property.address.city}</span>
                    </div>
                    <p className="text-xs text-foreground/60 mb-2">{property.propertyType} • {property.transactionType}</p>
                    <div className="flex gap-6 text-sm text-foreground/70">
                      <div className="flex items-center gap-2">
                        <Maximize2 size={16} />
                        <span>{property.area.toLocaleString()} sqft</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          )}

          {filteredProperties.length === 0 && (
            <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-foreground/70 text-lg">No properties match your criteria.</p>
            </motion.div>
          )}

          {filteredProperties.length > PROPERTIES_PER_PAGE && (
            <motion.div className="flex items-center justify-center gap-2 mt-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`p-2 rounded-lg border border-border transition-all ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-primary hover:text-primary-foreground hover:border-primary"}`}>
                <ChevronLeft size={20} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                  return (
                    <button key={page} onClick={() => handlePageChange(page)} className={`px-4 py-2 rounded-lg border transition-all ${currentPage === page ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-primary/10 hover:border-primary"}`}>
                      {page}
                    </button>
                  )
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="px-2 text-foreground/50">...</span>
                }
                return null
              })}
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`p-2 rounded-lg border border-border transition-all ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-primary hover:text-primary-foreground hover:border-primary"}`}>
                <ChevronRight size={20} />
              </button>
            </motion.div>
          )}

          {filteredProperties.length > 0 && (
            <motion.div className="text-center mt-6 text-foreground/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <p className="text-sm">Showing {startIndex + 1}-{Math.min(endIndex, filteredProperties.length)} of {filteredProperties.length} properties</p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}

