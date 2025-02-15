const express = require('express');

const appointmentController = require('../controllers/appointment.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

const router = express.Router();

// GET /feed/posts
router.get('/', appointmentController.getAllAppointment);
router.get('/:id', appointmentController.getAppointmentById);
router.post('/', isAuthenticated, appointmentController.postAppointment);
router.put('/:id', isAuthenticated, appointmentController.putAppointment); // Ensure this line is present
router.delete('/:id', isAuthenticated, appointmentController.deleteAppointment);
// localhost:3000/appointment/
module.exports = router;