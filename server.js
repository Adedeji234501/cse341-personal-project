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
  .use('/', require('./routes/index')); // Use the routes
  
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function (_accessToken, _refreshToken, profile, done) { 
    //User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return done(null, profile)
    //});
  }
));
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => { 
  done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` :"Logged Out")});

app.get('/github/callback', passport.authenticate('github', { 
  failureRedirect: '/api-docs', session: false }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
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