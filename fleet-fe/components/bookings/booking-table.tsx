"use client"
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
    flexRender,
    getSortedRowModel,
    SortingState,
    useReactTable,
    getCoreRowModel,
} from "@tanstack/react-table"
import {columns} from "./bookings-columns"
import { useBooking } from '@/hooks/useBooking';

export function BookingsTable () {
    const {bookings, loading, error} = useBooking();
    const [sorting, setSorting] = React.useState<SortingState>([])

    const table = useReactTable({
        data: bookings, // use live data
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return(
        <div className=''>
        {loading && <p>Loading bookings...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
                <Table className='text-lg'>
                    <TableCaption>List of Vehicle Bookings</TableCaption>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No bookings found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}