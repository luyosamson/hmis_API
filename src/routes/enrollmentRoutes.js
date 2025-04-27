const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

router
  .route('/')

  .get(enrollmentController.getAllEnrollments)
  .post(enrollmentController.createEnrollment);

router
  .route('/:id')
  .get(enrollmentController.getEnrollment)
  .patch(enrollmentController.updateEnrollment)
  .delete(enrollmentController.deleteEnrollment);

module.exports = router;

