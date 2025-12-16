import { BookingsTable } from "@/components/bookings/booking-table";
import { BookingsButton } from "@/components/bookings/bookings-button";

export default function BookingsPage() {
return (
        <div className="min-h-screen p-6 bg-gray-50 dark:bg-zinc-900">
            {/* Page header */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
                Company's Fleet Management
                </h1>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                Monitor and manage all vehicle bookings efficiently
                </p>
            </div>

            {/* Bookings Button */}
            <div className="mb-6">
                <BookingsButton />
            </div>

            {/* Table Card */}
            <div className="overflow-x-auto bg-white dark:bg-zinc-800 shadow-md rounded-lg p-4">
                <BookingsTable />
            </div>
            {/* Pagination Page Number */}
        </div>
    );
}
