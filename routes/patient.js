const express = require('express');

const patientController = require('../controllers/patient');

const router = express.Router();

// GET /feed/posts
router.get('/', patientController.getAllPatient);
router.get('/:id', patientController.getPatientById)
router.post('/', patientController.postPatient);
router.put('/:id', patientController.putPatient); // Ensure this line is present
router.delete('/:id', patientController.deletePatient);
// localhost:8080/professional/
module.exports = router;