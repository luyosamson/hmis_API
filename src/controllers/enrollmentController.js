const Enrollment = require('../models/Enrollment');

exports.createEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        enrollment
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('client_id')
      .populate('program_id');
    
    res.status(200).json({
      status: 'success',
      results: enrollments.length,
      data: {
        enrollments
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate('client_id')
      .populate('program_id');
    
    res.status(200).json({
      status: 'success',
      data: {
        enrollment
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'No enrollment found with that ID'
    });
  }
};

exports.updateEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('client_id').populate('program_id');
    
    res.status(200).json({
      status: 'success',
      data: {
        enrollment
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.deleteEnrollment = async (req, res) => {
  try {
    await Enrollment.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'No enrollment found with that ID'
    });
  }
};