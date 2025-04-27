// src/routes/authRoutes.js
const express = require('express');
const { registerSpecialist, login } = require('../controllers/authController');
const router = express.Router();

// Public routes
router.post('/register-specialist', registerSpecialist);
router.post('/login', login);

module.exports = router;
