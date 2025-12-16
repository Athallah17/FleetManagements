import prisma from '../config/db.js'
import { log, error as logError } from '../utils/logger.js'

export async function createBooking(req, res) {
    try {
        const { vehicleCode, driverCode, supervisorCode } = req.body

        if (!vehicleCode || !driverCode || !supervisorCode) {
        return res.status(400).json({ message: 'Missing required fields' })
        }

        // 1️⃣ Resolve vehicle
        const vehicle = await prisma.vehicle.findUnique({
        where: { code: vehicleCode },
        })

        // 2️⃣ Resolve driver
        const driver = await prisma.user.findUnique({
        where: { code: driverCode },
        })

        // 3️⃣ Resolve supervisor
        const supervisor = await prisma.user.findUnique({
        where: { code: supervisorCode },
        })

        if (!vehicle || !driver || !supervisor) {
        return res.status(404).json({
            message: 'Vehicle / Driver / Supervisor not found',
        })
        }

        // 4️⃣ Create booking
        const booking = await prisma.booking.create({
        data: {
            vehicleId: vehicle.id,
            driverId: driver.id,
            supervisorId: supervisor.id,

            // snapshot fields (optional but useful)
            vehicleCode: vehicle.code,
            plateNumber: vehicle.plateNumber,
            model: vehicle.model,

            status: 'WAITING',
        },
        include: {
        vehicle: {
            select: {
            code: true,
            plateNumber: true,
            model: true,
            },
        },
        driver: {
            select: {
            code: true,
            name: true,
            },
        },
        supervisor: {
            select: {
            code: true,
            name: true,
            },
        },
        }

        })

        log('Booking created', {
        bookingId: booking.id,
        vehicleCode,
        driverCode,
        supervisorCode,
        })

        return res.status(201).json(booking)
    } catch (err) {
        logError('Create booking failed', err)
        return res.status(500).json({ message: 'Failed to create booking' })
    }
}


export async function getBookings(req, res) {
  try {
    let where = {}

    // Driver → only own bookings
    if (req.user.role === 'DRIVER') {
      where.driverId = req.user.id
    }

    // Supervisor → bookings to approve
    if (req.user.role === 'SUPERVISOR') {
      where.supervisorId = req.user.id
    }

    const bookings = await prisma.booking.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
        vehicle: { select: { id: true, code: true, plateNumber: true } },
        driver: { select: { id: true, code: true, name: true } },
        supervisor: { select: { id: true, code: true, name: true } },
    },
    })

    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings' })
  }
}

export async function getBookingById(req, res) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: req.params.id },
      include: {
        vehicle: true,
        driver: true,
        supervisor: true,
      },
    })

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }

    res.json(booking)
  } catch {
    res.status(500).json({ message: 'Failed to fetch booking' })
  }
}

export async function updateBooking(req, res) {
  try {
    const booking = await prisma.booking.update({
      where: { id: req.params.id },
      data: req.body,
    })

    res.json(booking)
  } catch {
    res.status(500).json({ message: 'Failed to update booking' })
  }
}

export async function deleteBooking(req, res) {
  try {
    await prisma.booking.delete({
      where: { id: req.params.id },
    })

    res.json({ message: 'Booking deleted' })
  } catch {
    res.status(500).json({ message: 'Failed to delete booking' })
  }
}

