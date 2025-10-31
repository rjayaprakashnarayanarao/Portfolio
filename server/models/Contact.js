import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
  },
  subject: {
    type: String,
    default: 'Portfolio Contact',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema)

export default Contact

