// services/auth.service.js

const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRES_IN = '1h';

// Register service
async function registerUser({ name, email, password }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const newUser = new User({ name, email, password });
  await newUser.save();

  return newUser;
}

// Login service
async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRES_IN }
  );

  return { user, token };
}

module.exports = {
  registerUser,
  loginUser,
};
