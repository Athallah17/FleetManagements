// fleet-be/src/routes/dashboard.routes.js
import express from 'express';
import { getDashboardData } from '../controllers/dashboard.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

// GET /api/dashboard
router.get('/', authMiddleware, getDashboardData);

export default router;
