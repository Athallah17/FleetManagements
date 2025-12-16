import prisma from '../config/db.js';
import { log } from '../utils/logger.js';

// Get all vehicles (all roles)
export async function getVehicles(req, res) {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        code: true,
        plateNumber: true,
        model: true,
        type: true,
        fuelType: true,
        status: true,
        totalKm: true,
        lastService: true,
        createdAt: true,
      },
    });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch vehicles' });
  }
}

// Get single vehicle by id
export async function getVehicleById(req, res) {
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: req.params.id },
    });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch vehicle' });
  }
}

// Create vehicle (Admin only)

export async function createVehicle(req, res) {
  try {
    const { code, plateNumber, model, type, fuelType, status, totalKm, lastService } = req.body;

    const vehicle = await prisma.vehicle.create({
      data: {
        code,
        plateNumber,
        model,
        type,
        fuelType,
        status,
        totalKm,
        lastService: lastService ? new Date(lastService) : null,
      },
    });

    log('Vehicle created', { vehicleId: vehicle.id, code });
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create vehicle' });
  }
}

// Update vehicle (Admin only)
export async function updateVehicle(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    if (data.lastService) data.lastService = new Date(data.lastService);

    const vehicle = await prisma.vehicle.update({
      where: { id },
      data,
    });

    log('Vehicle updated', { vehicleId: id });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update vehicle' });
  }
}

// Delete vehicle (Admin only)
export async function deleteVehicle(req, res) {
  try {
    const { id } = req.params;

    await prisma.vehicle.delete({ where: { id } });
    log('Vehicle deleted', { vehicleId: id });

    res.json({ message: 'Vehicle deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete vehicle' });
  }
}

export async function statsVehicle(req, res) {
  try {
    // Count by status
    const activeCount = await prisma.vehicle.count({ where: { status: 'ACTIVE' } });
    const maintenanceCount = await prisma.vehicle.count({ where: { status: 'MAINTENANCE' } });
    const inServiceCount = await prisma.vehicle.count({ where: { status: 'IN_SERVICE' } });
    const retiredCount = await prisma.vehicle.count({ where: { status: 'RETIRED' } });

    // Total kilometers across all vehicles
    const totalKmResult = await prisma.vehicle.aggregate({
      _sum: { totalKm: true },
    });

    res.json({
      statusCounts: {
        ACTIVE: activeCount,
        MAINTENANCE: maintenanceCount,
        IN_SERVICE: inServiceCount,
        RETIRED: retiredCount,
      },
      totalKm: totalKmResult._sum.totalKm || 0,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch vehicle stats' });
  }
}