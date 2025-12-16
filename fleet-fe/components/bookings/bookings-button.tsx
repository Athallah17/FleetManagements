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

export function BookingsButton() {
    const [open, setOpen] = useState(false)

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
                <Input placeholder="Plate Number" />
                <Input placeholder="Driver Name" />
                <Input placeholder="Model" />
                <Input placeholder="Supervisor"/>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 mt-4">
                <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={() => alert("Booking created!")}>Save</Button>
            </div>
            </DialogContent>
        </Dialog>
        </>
    )
}
