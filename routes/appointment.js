const express = require('express');

const appointmentController = require('../controllers/appointment');

const router = express.Router();

// GET /feed/posts
router.get('/', appointmentController.getAllAppointment);
router.get('/:id', appointmentController.getAppointmentById);
router.post('/', appointmentController.postAppointment);
router.put('/:id', appointmentController.putAppointment); // Ensure this line is present
router.delete('/:id', appointmentController.deleteAppointment);
// localhost:8080/professional/
module.exports = router;