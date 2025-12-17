// src/controllers/dashboard.controller.ts
import { PrismaClient, VehicleStatus, BookingStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function getDashboardData(req, res) {
  try {
    // --- VEHICLE STATS ---
    const totalVehicles = await prisma.vehicle.count();

    // Available: ACTIVE and not currently booked
    const bookedVehicleIds = await prisma.booking.findMany({
      where: {
        status: { in: [BookingStatus.APPROVED, BookingStatus.APPROVED_ADMIN, BookingStatus.APPROVED_SPV] },
      },
      select: { vehicleId: true },
    }).then((b) => b.map((x) => x.vehicleId));

    const availableVehicles = await prisma.vehicle.count({
      where: {
        status: VehicleStatus.ACTIVE,
        id: { notIn: bookedVehicleIds },
      },
    });

    const inUseVehicles = await prisma.booking.count({
      where: { status: { in: [BookingStatus.APPROVED, BookingStatus.APPROVED_ADMIN, BookingStatus.APPROVED_SPV] } },
    });

    const finishedUseVehicles = await prisma.booking.count({
      where: { status: { in: [BookingStatus.REJECTED, BookingStatus.REJECTED_ADMIN, BookingStatus.REJECTED_SPV] } },
    });

    // --- BOOKING STATS ---
    const totalBookings = await prisma.booking.count();
    const pendingApproval = await prisma.booking.count({
      where: { status: BookingStatus.WAITING_ADMIN },
    });
    const approvedBookings = await prisma.booking.count({
      where: { status: { in: [BookingStatus.APPROVED, BookingStatus.APPROVED_ADMIN, BookingStatus.APPROVED_SPV] } },
    });
    const rejectedBookings = await prisma.booking.count({
      where: { status: { in: [BookingStatus.REJECTED, BookingStatus.REJECTED_ADMIN, BookingStatus.REJECTED_SPV] } },
    });

    // --- MONTHLY VEHICLE USAGE (past 30 days) ---
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const monthlyVehicleUsage = await prisma.booking.count({
      where: { createdAt: { gte: thirtyDaysAgo } },
    });

    // --- MOST USED CAR MODELS ---
    const mostUsedCarsRaw = await prisma.booking.groupBy({
      by: ["model"],
      _count: { model: true },
      orderBy: { _count: { model: "desc" } },
      take: 5,
    });

    const mostUsedCars = mostUsedCarsRaw
      .filter((m) => m.model) // remove nulls
      .map((m) => ({ model: m.model, count: m._count.model }));

// --- RECENT ACTIVITIES (latest 10) ---
const recentActivities = await prisma.booking.findMany({
  orderBy: { createdAt: "desc" },
  take: 5, // latest 10
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

// --- VEHICLE MAINTENANCE (top 5) ---
const maintenanceVehicles = await prisma.vehicle.findMany({
  where: {
    status: VehicleStatus.IN_SERVICE,
  },
  orderBy: { lastService: "asc" }, // oldest serviced vehicles first
  take: 5, // top 5
  select: {
    id: true,
    plateNumber: true,
    model: true,
    lastService: true,
    status: true,
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
