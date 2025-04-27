// src/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper to create token
const createToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Register specialist
exports.registerSpecialist = async (req, res) => {
  try {
    const { fname, lname, specialization, phone, email, location, password } = req.body;

    // Check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const specialist = await User.create({
      fname,
      lname,
      specialization,
      phone,
      email,
      location,
      password,
      role: 'specialist',
    });

    res.status(201).json({
      message: 'Specialist registered successfully',
      specialistId: specialist._id,
    });
  } catch (error) {
    console.error('Error registering specialist:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login doctor or specialist
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Match password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = createToken(user._id, user.role);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        fname: user.fname,
        lname: user.lname,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
