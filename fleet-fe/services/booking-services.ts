import axiosInstance from "@/lib/axiosInstance";
import {API} from "@/lib/api-constants";

// Booking payload
export interface BookingPayload {
  vehicleCode: string;
  driverCode: string;
  supervisorCode: string;
  startDate?: string;
  endDate?: string;
}

// Booking type
export interface Booking {
  id: string;
  vehicleCode: string;
  driverCode: string;
  supervisorCode: string;
  plateNumber?: string;
  model?: string;
  status: string;
  createdAt: string;
}

export const BookingService = {
  getAll: async (): Promise<Booking[]> => {
    const res = await axiosInstance.get(API.BOOKINGS.GET);
    console.log(res)
    return res.data;
  },

  getById: async (id: string): Promise<Booking> => {
    const res = await axiosInstance.get(API.BOOKINGS.DETAILED(id));
    return res.data;
  },

  create: async (payload: BookingPayload): Promise<Booking> => {
    const res = await axiosInstance.post(API.BOOKINGS.CREATE, payload);
    return res.data;
  },

  update: async (
    id: string,
    payload: Partial<BookingPayload & { status?: string }>
  ): Promise<Booking> => {
    const res = await axiosInstance.put(API.BOOKINGS.UPDATE(id), payload);
    return res.data;
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const res = await axiosInstance.delete(API.BOOKINGS.DELETE(id));
    return res.data;
  },
};

