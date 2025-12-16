import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { allowRoles } from '../middlewares/role.middleware.js'
import { adminApproval, supervisorApproval } from '../controllers/approval.controllers.js'

const router = express.Router()

// Admin approval (Level 1)
router.patch('/:id/admin-approval',authMiddleware,allowRoles('ADMIN'), adminApproval)

// Supervisor approval (Level 2)
router.patch('/:id/spv-approval',authMiddleware,allowRoles('SUPERVISOR'),supervisorApproval)

export default router
