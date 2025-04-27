const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');

router
  .route('/')
  .get(programController.getAllPrograms)
  .post(programController.createProgram);

router
  .route('/:id')
  .get(programController.getProgram)
  .patch(programController.updateProgram)
  .delete(programController.deleteProgram);

module.exports = router;