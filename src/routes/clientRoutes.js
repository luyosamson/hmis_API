// src/routes/clientRoutes.js
const express = require('express');
const {
  registerClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient
} = require('../controllers/clientController');

const router = express.Router();

// Routes
router.post('/register', registerClient);
router.get('/', getClients);
router.get('/:id', getClientById);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

module.exports = router;
