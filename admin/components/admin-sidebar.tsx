"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { LayoutDashboard, Plus, Home, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Add property",
    href: "/admin/add-property",
    icon: Plus,
  },
  {
    title: "My properties",
    href: "/admin/my-properties",
    icon: Home,
  },
  {
    title: "Inquiries",
    href: "/admin/inquiries",
    icon: MessageSquare,
  },
]

interface AdminSidebarProps {
  onLinkClick?: () => void
}

export function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname()

  return (
    <>
      {/* Logo */}
      <div className="flex h-20 flex-col justify-center border-b border-sidebar-border px-4">
        <Link href="/admin" className="flex-shrink-0" onClick={onLinkClick}>
          <motion.div
            className="flex items-center gap-2 min-w-0"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="/EPM-logo.jpg"
              alt="Equity Properties Meerut Logo"
              className="h-8 w-8 flex-shrink-0 rounded-full object-cover"
            />
            <div className="flex flex-col min-w-0 flex-1">
              <div className="text-base font-serif font-bold tracking-wide leading-tight">
                <div>
                  <span className="text-primary">Equity</span>{" "}
                  <span className="text-sidebar-foreground">Properties</span>
                </div>
                <div className="text-sidebar-foreground">
                  Meerut
                </div>
              </div>
              <div className="mt-0.5 text-xs font-medium text-sidebar-foreground/60 truncate">
                Admin Dashboard
              </div>
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                onClick={onLinkClick}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="size-5 shrink-0" />
                <span>{item.title}</span>
              </Link>
            </motion.div>
          )
        })}
      </nav>
    </>
  )
}

export function AdminSidebar({ onLinkClick }: AdminSidebarProps) {
  return (
    <aside className="hidden h-full w-64 flex-col border-r border-sidebar-border bg-sidebar md:flex">
      <SidebarContent onLinkClick={onLinkClick} />
    </aside>
  )
}
