"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { FiPlus } from "react-icons/fi"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { useBooking } from "@/hooks/useBooking"

export function BookingsButton() {
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState({
        vehicleCode: "",
        driverCode: "",
        supervisorCode: "",
    })

    const { createBooking, loading } = useBooking()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        try {
            await createBooking(form)
            setOpen(false)
            setForm({ vehicleCode: "", driverCode: "", supervisorCode: "" })
            // optionally, you can show a toast/notification here
        } catch (err) {
            console.error("Failed to create booking:", err)
        }
    }

    return (
        <>
        {/* Button triggers dialog */}
        <Button className="space-x-1" onClick={() => setOpen(true)}>
            <span>Create New</span> <FiPlus size={16} />
        </Button>

        {/* Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle>Create New Booking</DialogTitle>
            </DialogHeader>

            {/* Form fields */}
            <div className="grid gap-4 py-4">
                <Input
                    name="vehicleCode"
                    placeholder="Vehicle Code"
                    value={form.vehicleCode}
                    onChange={handleChange}
                />
                <Input
                    name="driverCode"
                    placeholder="Driver Code"
                    value={form.driverCode}
                    onChange={handleChange}
                />
                <Input
                    name="supervisorCode"
                    placeholder="Supervisor Code"
                    value={form.supervisorCode}
                    onChange={handleChange}
                />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 mt-4">
                <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Creating..." : "Submit"}
                </Button>
            </div>
            </DialogContent>
        </Dialog>
        </>
    )
}