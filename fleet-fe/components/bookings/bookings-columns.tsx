import { ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "@/components/bookings/bookings-sort";
import { StatusBadge } from '@/components/ui/statusbadge';
import { BookingActions } from "./booking-actions";
import { cn , getInitials} from '@/lib/utils';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "vehicle.plateNumber",
    header: "Plate Number",
    cell: ({ row }) => row.original.vehicle?.plateNumber || "-"
  },
  {
    accessorKey: "vehicle.model",
    header: "Model",
    cell: ({ row }) => row.original.vehicle?.model || "-"
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <SortableHeader column={column} title="Date" />
    ),
    enableSorting: true,
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString()
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <SortableHeader column={column} title="Status" />
    ),
    enableSorting: true,
    cell: ({ getValue }) => <StatusBadge status={getValue() as string} />
  },
  {
    accessorKey: "driver",
    header: "Driver",
    cell: ({ row }) => {
      const driver = row.original.driver;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials(driver?.name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span>{driver?.name}</span>
            <span className="text-xs text-muted-foreground">{driver?.code}</span>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: "supervisor",
    header: "Supervisor",
    cell: ({ row }) => {
      const spv = row.original.supervisor;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials(spv?.name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span>{spv?.name}</span>
            <span className="text-xs text-muted-foreground">{spv?.code}</span>
          </div>
        </div>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <BookingActions booking={row.original} />
  }
];