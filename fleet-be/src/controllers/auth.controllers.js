import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../config/db.js'

export async function login(req, res) {
  try {
    const { email, password } = req.body

    console.log('LOGIN PAYLOAD:', req.body)

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    console.log('USER FOUND:', user)

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    console.log('PASSWORD MATCH:', isMatch)

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        office: user.office,
      },
    })
  } catch (error) {
    console.error('LOGIN ERROR 👉', error)
    return res.status(500).json({ message: error.message })
  }
}

