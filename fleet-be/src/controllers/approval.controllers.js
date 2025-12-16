import prisma from '../config/db.js'
import { log } from '../utils/logger.js'

// LEVEL 1: Admin approval
export async function adminApproval(req, res) {
  try {
    const { id } = req.params
    const { action } = req.body // APPROVE | REJECT

    const booking = await prisma.booking.findUnique({ where: { id } })
    if (!booking) return res.status(404).json({ message: 'Booking not found' })
    if (booking.status !== 'WAITING_ADMIN')
      return res.status(400).json({ message: 'Booking not waiting for admin approval' })

    const status = action === 'APPROVE' ? 'APPROVED_ADMIN' : 'REJECTED_ADMIN'

    const updated = await prisma.booking.update({
      where: { id },
      data: {
        status,
        adminId: req.user.id,
        adminApprovedAt: new Date(),
      },
    })

    log('Admin approval updated', { bookingId: id, status })
    res.json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to update booking' })
  }
}

// LEVEL 2: Supervisor approval
export async function supervisorApproval(req, res) {
  try {
    const { id } = req.params
    const { action } = req.body // APPROVE | REJECT

    const booking = await prisma.booking.findUnique({ where: { id } })
    if (!booking) return res.status(404).json({ message: 'Booking not found' })
    if (booking.status !== 'APPROVED_ADMIN')
      return res.status(400).json({ message: 'Booking not ready for supervisor approval' })

    const status = action === 'APPROVE' ? 'APPROVED_SPV' : 'REJECTED_SPV'

    const updated = await prisma.booking.update({
      where: { id },
      data: {
        status,
        spvApprovedAt: new Date(),
      },
    })

    log('Supervisor approval updated', { bookingId: id, status })
    res.json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to update booking' })
  }
}