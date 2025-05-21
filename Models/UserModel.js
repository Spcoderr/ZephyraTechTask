// models/user.model.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // remove extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true, // no duplicate emails
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
}, {
  timestamps: true // adds createdAt and updatedAt automatically
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // only hash if password is changed
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Create and export the model
const User = mongoose.model('User', userSchema);
module.exports = User;
