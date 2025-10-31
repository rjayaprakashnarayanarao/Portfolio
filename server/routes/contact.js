import express from 'express'
import Contact from '../models/Contact.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { name, email, message, subject } = req.body

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      })
    }

    // Create new contact entry
    const contact = new Contact({
      name,
      email,
      message,
      subject: subject || 'Portfolio Contact',
    })

    await contact.save()

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact,
    })
  } catch (error) {
    console.error('Error saving contact:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
})

router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(50)
    res.json({
      success: true,
      count: contacts.length,
      data: contacts,
    })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
    })
  }
})

export default router

