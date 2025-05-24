"use client"

import { CheckCircle2 } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "../ui/button"

interface PaymentSuccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PaymentSuccessDialog({ open, onOpenChange }: PaymentSuccessDialogProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Remove payment parameter from URL when dialog is closed
      const newParams = new URLSearchParams(searchParams)
      newParams.delete("payment")
      router.replace(`?${newParams.toString()}`, { scroll: false })
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <DialogTitle>Payment Successful</DialogTitle>
          </div>
          <DialogDescription>Your payment has been processed successfully.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button size="sm">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
