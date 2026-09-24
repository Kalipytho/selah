import Message from '../models/Message.js'
import { sendMessageNotification } from '../utils/sendEmail.js'

// =====================================================
// GET ALL MESSAGES
// =====================================================
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({
        createdAt: -1,
      })
      .lean()

    res.json({
      success: true,
      messages,
    })
  } catch (error) {
    console.error('Get messages error:', error)

    res.status(500).json({
      success: false,
      message: 'Could not load messages',
    })
  }
}

// =====================================================
// CREATE MESSAGE
// Public endpoint - used by the client contact form
// =====================================================
export const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body

    // -----------------------------------------------
    // VALIDATE
    // -----------------------------------------------
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and message are required',
      })
    }

    const cleanName = name.trim()
    const cleanEmail = email.trim().toLowerCase()
    const cleanMessage = message.trim()

    // -----------------------------------------------
    // SAVE MESSAGE TO MONGODB
    // -----------------------------------------------
    const newMessage = await Message.create({
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
      read: false,
    })

    // -----------------------------------------------
    // SEND EMAIL NOTIFICATION
    // -----------------------------------------------
    try {
      await sendMessageNotification({
        name: cleanName,
        email: cleanEmail,
        message: cleanMessage,
      })

      console.log(
        `Message email sent successfully to ${process.env.EMAIL_TO}`,
      )
    } catch (emailError) {
      // IMPORTANT:
      // The message is already saved in MongoDB.
      // So an email failure will NOT delete the message.

      console.error(
        'Email notification failed:',
        emailError,
      )
    }

    // -----------------------------------------------
    // SUCCESS RESPONSE
    // -----------------------------------------------
    res.status(201).json({
      success: true,
      message: 'Message received successfully',
      data: newMessage,
    })
  } catch (error) {
    console.error('Create message error:', error)

    res.status(500).json({
      success: false,
      message: 'Could not save message',
    })
  }
}

// =====================================================
// MARK MESSAGE AS READ
// =====================================================
export const markMessageRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      })
    }

    message.read = true

    await message.save()

    res.json({
      success: true,
      message: 'Message marked as read',
      data: message,
    })
  } catch (error) {
    console.error('Mark message read error:', error)

    res.status(500).json({
      success: false,
      message: 'Could not update message',
    })
  }
}

// =====================================================
// MARK MESSAGE AS UNREAD
// =====================================================
export const markMessageUnread = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      })
    }

    message.read = false

    await message.save()

    res.json({
      success: true,
      message: 'Message marked as unread',
      data: message,
    })
  } catch (error) {
    console.error('Mark message unread error:', error)

    res.status(500).json({
      success: false,
      message: 'Could not update message',
    })
  }
}

// =====================================================
// DELETE MESSAGE
// =====================================================
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      })
    }

    await Message.findByIdAndDelete(req.params.id)

    res.json({
      success: true,
      message: 'Message deleted successfully',
    })
  } catch (error) {
    console.error('Delete message error:', error)

    res.status(500).json({
      success: false,
      message: 'Could not delete message',
    })
  }
}