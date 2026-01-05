"use client"

import { usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminNavbar } from "@/components/admin-navbar"
import { ProtectedRoute } from "@/components/ProtectedRoute"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/admin/login"

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Desktop Sidebar - Hidden on mobile */}
        <AdminSidebar />
        <div className="flex flex-1 flex-col overflow-hidden min-w-0">
          <AdminNavbar />
          <main className="flex-1 overflow-y-auto overflow-x-hidden bg-background p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

