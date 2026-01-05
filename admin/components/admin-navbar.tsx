"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { LogOut, HelpCircle, ChevronDown, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ContactSupportDialog } from "@/components/contact-support-dialog"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { useAuth } from "@/contexts/AuthContext"

export function AdminNavbar() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  const handleContactSupport = () => {
    setIsContactDialogOpen(true)
    setIsOpen(false)
  }


  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <Menu className="size-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          {/* Desktop Logo - Hidden on mobile */}
          <div className="hidden text-lg font-serif font-light tracking-wide md:block">
            <span className="text-primary">Equity</span>{" "}
            <span className="text-foreground">Properties</span>{" "}
            <span className="text-foreground">Meerut</span>
          </div>

          {/* User Menu */}
          <div className="flex items-center">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <div className="flex cursor-pointer items-center gap-2 sm:gap-3 rounded-lg border border-border bg-card px-2 sm:px-4 py-2 shadow-sm transition-colors hover:bg-accent">
              <Avatar className="size-7 sm:size-8 shrink-0">
                <AvatarImage src={user?.image?.url} alt={user?.name || "User"} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start text-left sm:flex min-w-0">
                <span className="text-sm font-medium truncate max-w-[120px]">
                  {user?.name || "User"}
                </span>
                <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                  {user?.email || ""}
                </span>
              </div>
              <ChevronDown className="ml-1 sm:ml-2 size-4 shrink-0" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email || ""}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleContactSupport}>
              <HelpCircle className="mr-2 size-4" />
              <span>Contact Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} variant="destructive">
              <LogOut className="mr-2 size-4" />
              <span>Logout</span>
            </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
      </header>
      <MobileSidebar
        open={isMobileSidebarOpen}
        onOpenChange={setIsMobileSidebarOpen}
      />
      <ContactSupportDialog
        open={isContactDialogOpen}
        onOpenChange={setIsContactDialogOpen}
      />
    </>
  )
}

