import axiosInstance from "@/lib/axiosInstance"
import {API} from "@/lib/api-constants"

export interface MostUsedCar {
    model: string | null;
    _count: { model: number };
}

export interface RecentActivity {
    id: string;
    model: string | null;
    plateNumber: string;
    status: string;
    createdAt: string;
    driver: { name: string };
    supervisor: { name: string };
    admin: { name: string } | null;
}

export interface VehicleStats {
    totalVehicles: number;
    availableVehicles: number;
    inUseVehicles: number;
    finishedUseVehicles: number;
}

export interface BookingStats {
    totalBookings: number;
    pendingApproval: number;
    approvedBookings: number;
    rejectedBookings: number;
}

export interface DashboardData {
    vehicles: VehicleStats;
    bookings: BookingStats;
    monthlyVehicleUsage: number;
    mostUsedCars: MostUsedCar[];
    recentActivities: RecentActivity[];
    maintenanceVehicles: any[];
}

export const dashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    const { data } = await axiosInstance.get(API.DASHBOARD.DATA);
    return data;
  },
};