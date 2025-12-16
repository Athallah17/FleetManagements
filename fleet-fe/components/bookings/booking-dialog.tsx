import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function BookingEdit({ open, onOpenChange, booking }: any) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Booking</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input defaultValue={booking.plate} placeholder="Plate Number" />
          <Input defaultValue={booking.driver} placeholder="Driver" />

          <Button className="w-full">Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function BookingDelete({ open, onOpenChange, booking }: any) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Booking</DialogTitle>
        </DialogHeader>

        <p>
          Are you sure you want to delete booking{" "}
          <strong>{booking.plate}</strong>?
        </p>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function BookingCreate ({ open, onOpenChange, booking }: any) {
    
}
