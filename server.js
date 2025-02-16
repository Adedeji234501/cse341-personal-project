const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app
  .use(bodyParser.json())
  .use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: true})) // Initialize the session
  .use(passport.initialize()) // Initialize Passport on every route call.
  .use(passport.session()) // Allow passport to use sessions.
  
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    next();
  })
  .use(cors({methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']})) // Allow the methods
  .use(cors({origin: '*'})) // Allow the origin

app.use('/', require('./routes/index.js')); // Use the routes

process.on('uncaughtException', (err) => {
  console.log(process.stderr.fd, `Caught exception: ${err} \nException origin: ${origin}`);
});
  
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function (accessToken, refreshToken, profile, done) { 
    //User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return done(null, profile)
    //});
  }
));
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) { 
  done(null, user);
});
    
mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port,() => {
          console.log(`Connected to Database and listening on ${port}`);
        });
    }
});