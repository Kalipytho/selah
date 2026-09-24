import express from 'express'

import {
  getMessages,
  createMessage,
  markMessageRead,
  markMessageUnread,
  deleteMessage,
} from '../controllers/messageController.js'

import protect from '../middleware/authMiddleware.js'

const router = express.Router()

// =====================================================
// PUBLIC
// Client contact form
// =====================================================
router.post('/', createMessage)

// =====================================================
// ADMIN
// Authentication required
// =====================================================
router.get('/', protect, getMessages)

router.put('/:id/read', protect, markMessageRead)

router.put('/:id/unread', protect, markMessageUnread)

router.delete('/:id', protect, deleteMessage)

export default router