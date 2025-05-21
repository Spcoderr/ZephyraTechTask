// controllers/auth.controller.js

const authService = require('../services/auth.service');

// Register Controller
exports.register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Register Error:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { token } = await authService.loginUser(req.body);
    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(401).json({ message: error.message });
  }
};
