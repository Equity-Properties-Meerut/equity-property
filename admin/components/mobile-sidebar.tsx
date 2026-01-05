"use client"

import { SidebarContent } from "./admin-sidebar"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"

interface MobileSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 p-0">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="flex h-full flex-col">
          <SidebarContent onLinkClick={() => onOpenChange(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
