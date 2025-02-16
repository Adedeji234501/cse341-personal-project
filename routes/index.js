const express = require('express');
const passport = require('passport');
const router = express.Router();
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.get('/',(req, res) => {
    if (req.session.user) {
        res.send('<p> Hello! Welcome to Medical Records API</p>' + 
            '<br><a href="/api-docs">API Documentation</a>' + 
            '<br> Logged in as: ' + req.session.user.name + 
            '<br><a href="/logout">Logout</a>');
    } else {
        res.send('<p> Hello! Welcome to Medical Records API</p>' + 
            '<br><a href="/api-docs">API Documentation</a>' + 
            '<br><a href="/auth/github` ">Login with GitHub</a>');
    }
});

const patientRoutes = require('./patient');
router.use('/patient', patientRoutes);

const appointmentRoutes = require('./appointment');
router.use('/appointment', appointmentRoutes);


router.get('/auth/github', passport.authenticate('github'));
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/',
    session: false
}), (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


module.exports = router;