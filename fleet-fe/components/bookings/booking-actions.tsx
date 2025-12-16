"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { FiMoreVertical, FiEdit, FiTrash } from "react-icons/fi"
import { BookingEdit, BookingDelete } from "./booking-dialog"
import { useState } from "react"

export function BookingActions({ booking }: { booking: any }) {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <FiMoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <FiEdit className="mr-2" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setDeleteOpen(true)}
          >
            <FiTrash className="mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <BookingEdit
        open={editOpen}
        onOpenChange={setEditOpen}
        booking={booking}
      />

      <BookingDelete
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        booking={booking}
      />
    </>
  )
}
