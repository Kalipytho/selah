import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

const createToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    },
  )
}

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      })
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase().trim(),
    })

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const passwordMatches = await bcrypt.compare(
      password,
      admin.password,
    )

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const token = createToken(admin._id.toString())

    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Server error during login',
    })
  }
}

export const getCurrentAdmin = async (req, res) => {
  res.json({
    success: true,
    admin: req.admin,
  })
}

export const createInitialAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL.toLowerCase(),
    })

    if (existingAdmin) {
      console.log('Admin account already exists')
      return
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      12,
    )

    await Admin.create({
      email: process.env.ADMIN_EMAIL.toLowerCase(),
      password: hashedPassword,
      name: 'Selah Admin',
    })

    console.log('Initial admin account created')
  } catch (error) {
    console.error('Could not create initial admin:')
    console.error(error.message)
  }
}