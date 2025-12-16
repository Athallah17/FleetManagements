import { ColumnDef } from "@tanstack/react-table"
import { SortableHeader } from "@/components/bookings/bookings-sort"
import { StatusBadge } from '@/components/ui/statusbadge'
import { BookingActions } from "./booking-actions"
import { cn , getInitials} from '@/lib/utils'
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "plate",
        header: "Plate Number",
    },
    {
        accessorKey: "model",
        header: "Model",
    },
    {
        accessorKey: "date",
        header: ({ column }) => (
        <SortableHeader column={column} title="Date" />
        ),
        enableSorting: true,
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
        <SortableHeader column={column} title="Status" />
        ),
        enableSorting: true,
        cell: ({ getValue }) => {
        const status = getValue() as string
        return <StatusBadge status={status} />
    },
    },
    {
    accessorKey: "driver",
    header: "Driver",
    cell: ({ row }) => {
        const driverName = row.original.driver as string
        return (
        <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials(driverName)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
            <span>{driverName}</span>
            </div>
        </div>
        )
    }
    },
    {
        accessorKey: "supervisor",
        header: "Supervisor",
        cell: ({ row }) => {
        const spvName = row.original.supervisor as string
        return (
        <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials(spvName)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
            <span>{spvName}</span>
            </div>
        </div>
        )
    }
    },
    {
        id: 'actions',
        cell : ({ row }) => (
            <div className="w-">
                <BookingActions booking={row.original} />
            </div>
        ),
    }
    ]
