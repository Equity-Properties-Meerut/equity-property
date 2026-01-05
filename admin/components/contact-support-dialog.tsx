"use client"

import { Mail, Phone, MapPin, Globe } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ContactSupportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactSupportDialog({
  open,
  onOpenChange,
}: ContactSupportDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif font-light">
            Contact Support
          </DialogTitle>
          <DialogDescription>
            Get in touch with the Nexerve team for assistance
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="mb-4 text-lg font-serif font-light">
              Nexerve Team
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a
                    href="mailto:contact@nexerve.in"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    contact@nexerve.in
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="mt-0.5 size-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Website</p>
                  <a
                    href="https://www.nexerve.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    www.nexerve.in
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 size-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <div className="space-y-1">
                    <a
                      href="tel:+918115773284"
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      +91 8115773284
                    </a>
                    <a
                      href="tel:+916386570475"
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      +91 6386570475
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">
                    808, Block B Rolex Estate,<br />
                    Kamta, Lucknow, 226028
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

