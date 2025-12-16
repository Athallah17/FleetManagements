import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} from '../controllers/booking.controllers.js'

const router = express.Router()

router.post('/', authMiddleware, createBooking)
router.get('/', authMiddleware, getBookings)
router.get('/:id', authMiddleware, getBookingById)
router.put('/:id', authMiddleware, updateBooking)
router.delete('/:id', authMiddleware, deleteBooking)

export default router
