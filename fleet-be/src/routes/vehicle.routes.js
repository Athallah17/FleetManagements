import express from 'express';
import {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  statsVehicle
} from '../controllers/vehicle.controllers.js';
import { checkAdmin } from '../middlewares/role.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js'; // your JWT auth

const router = express.Router();

// All authenticated users can view
router.get('/', authMiddleware, getVehicles);
router.get('/:id', authMiddleware, getVehicleById);

// Admin only
router.post('/', authMiddleware, checkAdmin, createVehicle);
router.put('/:id', authMiddleware, checkAdmin, updateVehicle);
router.delete('/:id', authMiddleware, checkAdmin, deleteVehicle);
router.get('/stats/data', authMiddleware, checkAdmin, statsVehicle);

export default router;
