import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

export const protect = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      })
    }

    const token = authorization.split(' ')[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const admin = await Admin.findById(decoded.id).select('-password')

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin account not found',
      })
    }

    req.admin = admin

    next()
  } catch (error) {
    console.error('Auth middleware error:', error)

    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    })
  }
}

// Keep default export for any existing files that use:
// import protect from '../middleware/authMiddleware.js'
export default protect