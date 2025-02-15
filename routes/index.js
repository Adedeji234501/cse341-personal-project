const express = require('express');
const passport = require('passport');
const router = express.Router();

router.use('/', require('./swagger'));
router.get('/',(req, res) => {
    res.send('Welcome to Medical Records API');
});

const patientRoutes = require('./patient');
router.use('/patient', patientRoutes);

const appointmentRoutes = require('./appointment');
router.use('/appointment', appointmentRoutes);

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if(err) { return next(err);}
        res.redirect('/');
    });
});


module.exports = router;