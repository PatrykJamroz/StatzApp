var express = require('express');
var passport = require('passport');
var cors = require('cors');
var logger = require('morgan');
var StravaStrategy = require('passport-strava-oauth2').Strategy;

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
require('dotenv').config();

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new StravaStrategy(
    {
      clientID: STRAVA_CLIENT_ID,
      clientSecret: STRAVA_CLIENT_SECRET,
      callbackURL: '/auth/strava/callback'
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        return done(null, profile);
      });
    }
  )
);

var app = express();

app.use(cors());
app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.methodOverride());
app.use(cookieSession({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   // res.header('Access-Control-Allow-Headers', 'X-Requested-With');
//   next();
// });

const SCOPES = 'read,activity:read_all,read_all';

app.get('/auth/strava', passport.authenticate('strava', { scope: SCOPES }), function (req, res) {
  // The request will be redirected to Strava for authentication, so this
  // function will not be called.
});

app.get(
  '/auth/strava/callback',
  passport.authenticate('strava', {
    scope: SCOPES,
    failureRedirect: '/login'
  }),
  function (req, res) {
    res.redirect('http://localhost:3000');
  }
);

app.get('/api/athlete', async (req, res) => {
  fetch(`https://www.strava.com/api/v3/athlete?access_token=${req.user?.token ?? ''}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      res.status(response.status).json({ error: response.statusText });
      throw new Error(`${response.status} - ${response.statusText}`);
    })
    .then((data) => res.json(data))
    .catch((error) => console.error({ error }));
});

app.get('/activities', async function (req, res) {
  if (!req.user.token) {
    res.redirect('/login');
  }
  const activitiesPromise = await fetch(
    `https://www.strava.com/api/v3/athlete/activities?per_page=30&access_token=${req.user.token}`
  );
  const activitiesData = await activitiesPromise.json();
  res.json({ activitiesData });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// app.get('/account', ensureAuthenticated, function (req, res) {
//   // res.render('account', { user: req.user });
//   res.json({ user: req.user });
// });

// app.get('/login', function (req, res) {
//   res.render('login', { user: req.user });
// });

const listener = app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
