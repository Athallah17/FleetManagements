// src/controllers/dashboard.controller.ts
import { PrismaClient, VehicleStatus, BookingStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function getDashboardData(req, res) {
  try {
    // --- VEHICLE STATS ---
    const totalVehicles = await prisma.vehicle.count();
    const availableVehicles = await prisma.vehicle.count({
      where: { status: VehicleStatus.ACTIVE },
    });
    const inUseVehicles = await prisma.booking.count({
      where: { status: BookingStatus.APPROVED },
    });
    const finishedUseVehicles = await prisma.booking.count({
      where: { status: BookingStatus.REJECTED }, // adjust if you have a "finished" status
    });

    // --- BOOKING STATS ---
    const totalBookings = await prisma.booking.count();
    const pendingApproval = await prisma.booking.count({
      where: { status: BookingStatus.WAITING_ADMIN },
    });
    const approvedBookings = await prisma.booking.count({
      where: {
        OR: [
          { status: BookingStatus.APPROVED_ADMIN },
          { status: BookingStatus.APPROVED_SPV },
          { status: BookingStatus.APPROVED },
        ],
      },
    });
    const rejectedBookings = await prisma.booking.count({
      where: {
        OR: [
          { status: BookingStatus.REJECTED_ADMIN },
          { status: BookingStatus.REJECTED_SPV },
          { status: BookingStatus.REJECTED },
        ],
      },
    });

    // --- MONTHLY VEHICLE USAGE (past 30 days) ---
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const monthlyVehicleUsage = await prisma.booking.count({
      where: { createdAt: { gte: thirtyDaysAgo } },
    });

    // --- MOST USED CAR MODELS ---
    const mostUsedCars = await prisma.booking.groupBy({
      by: ["model"],
      _count: { model: true },
      orderBy: { _count: { model: "desc" } },
      take: 5,
    });

    // --- RECENT ACTIVITIES ---
    const recentActivities = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        model: true,
        plateNumber: true,
        status: true,
        createdAt: true,
        driver: { select: { name: true } },
        supervisor: { select: { name: true } },
        admin: { select: { name: true } },
      },
    });

    // --- VEHICLE MAINTENANCE ---
    const maintenanceVehicles = await prisma.vehicle.findMany({
      where: {
        status: VehicleStatus.IN_SERVICE,
      },
      select: {
        id: true,
        plateNumber: true,
        model: true,
        lastService: true,
      },
    });

    return res.json({
      vehicles: { totalVehicles, availableVehicles, inUseVehicles, finishedUseVehicles },
      bookings: { totalBookings, pendingApproval, approvedBookings, rejectedBookings },
      monthlyVehicleUsage,
      mostUsedCars,
      recentActivities,
      maintenanceVehicles,
    });
  } catch (error) {
    console.error("Dashboard fetch error 👉", error);
    return res.status(500).json({ message: "Failed to fetch dashboard data", error: error.message });
  }
}
