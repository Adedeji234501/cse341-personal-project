const express = require('express');

const patientController = require('../controllers/patient.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

const router = express.Router();

// GET /feed/posts
router.get('/', patientController.getAllPatient);
router.get('/:id', patientController.getPatientById)
router.post('/', isAuthenticated, patientController.postPatient);
router.put('/:id', isAuthenticated, patientController.putPatient); // Ensure this line is present
router.delete('/:id', isAuthenticated, patientController.deletePatient);
// localhost:3000/patient/
module.exports = router;