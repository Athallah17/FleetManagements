import { useState, useEffect } from "react";
import { Booking, BookingService, BookingPayload } from "@/services/booking-services";

export function useBooking() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBookings = async () => {
        try {
        setLoading(true);
        const data = await BookingService.getAll();
        setBookings(data);
        } catch (err: any) {
        setError(err.message || "Failed to fetch bookings");
        } finally {
        setLoading(false);
        }
    };

    const createBooking = async (payload: BookingPayload) => {
        try {
        const newBooking = await BookingService.create(payload);
        setBookings((prev) => [newBooking, ...prev]);
        return newBooking;
        } catch (err: any) {
        throw new Error(err.message || "Failed to create booking");
        }
    };

    const updateBooking = async (id: string, payload: Partial<BookingPayload & { status?: string }>) => {
        try {
        const updatedBooking = await BookingService.update(id, payload);
        setBookings((prev) => prev.map((b) => (b.id === id ? updatedBooking : b)));
        return updatedBooking;
        } catch (err: any) {
        throw new Error(err.message || "Failed to update booking");
        }
    };

    const deleteBooking = async (id: string) => {
        try {
        await BookingService.delete(id);
        setBookings((prev) => prev.filter((b) => b.id !== id));
        } catch (err: any) {
        throw new Error(err.message || "Failed to delete booking");
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

return {
    bookings,
    loading,
    error,
    fetchBookings,
    createBooking,
    updateBooking,
    deleteBooking,
    };
}
