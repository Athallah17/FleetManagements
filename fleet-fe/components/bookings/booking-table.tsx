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



const data = [
    {
        plate : "B 1234 ABC",
        driver : " John Doe",
        date: "22/12/2025",
        contact: "08123444444",
        status : "Accepted",
        supervisor : "Ilham",
        Spvcontact: "08123131321",
        model : "Toyota Innova",
    },
    {
        plate : "B 1223 ABS",
        driver : " John Saa",
        date: "21/12/2025",
        contact: "08123434242",
        status : "Waiting",
        supervisor : "Budi",
        Spvcontact: "08123131321",
        model : "Toyota Fortuner",
    },
    {
        plate : "B 1123 XXX",
        driver : " Micel Adas",
        date: "18/11/2025",
        contact: "0811111111",
        status : "Rejected",
        supervisor : "Asep",
        Spvcontact: "08123131321",
        model : "Hino Truck",
    },
]

export function BookingsTable () {
    const [sorting, setSorting] = React.useState<SortingState>([])

    const table = useReactTable({
    data,
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
            {/* Filter Data or Search Data */}
            <Table className='text-lg'>
                <TableCaption>List of Vehicle Bookings</TableCaption>
                    <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <TableHead key={header.id}>
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </TableHead>
                        ))}
                        </TableRow>
                    ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
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
        </div>
    )
}