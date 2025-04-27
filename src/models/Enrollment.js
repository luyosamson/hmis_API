const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, 'Client ID is required']
  },
  program_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program',
    required: [true, 'Program ID is required']
  },
  enrollment_date: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);