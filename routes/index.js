const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.get('/',(req, res) => {
    res.send('Hello World');
});

const patientRoutes = require('./patient');
router.use('/patient', patientRoutes);

const appointmentRoutes = require('./appointment');
router.use('/appointment', appointmentRoutes);


module.exports = router;