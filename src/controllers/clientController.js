// src/controllers/clientController.js
const Client = require('../models/Client');

// Register a new client
exports.registerClient = async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json({
      message: 'Client registered successfully',
      clientId: client._id,
    });
  } catch (error) {
    console.error('Error registering client:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all clients
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find()
      .populate('program_id', 'name')
      .populate('health_specialistID', 'fname lname');

    res.status(200).json(clients);
  } catch (error) {
    console.error('Error getting clients:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single client by ID
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
      .populate('program_id', 'name')
      .populate('health_specialistID', 'fname lname');

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json(client);
  } catch (error) {
    console.error('Error getting client:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update client info
exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json({
      message: 'Client updated successfully',
      client,
    });
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a client
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json({
      message: 'Client deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
