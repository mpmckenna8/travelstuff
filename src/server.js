//set up our application
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
//var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var pg           = require('pg');



var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();

}


// db connection string goes here,
var conString = "postgres://matthewmckenna@localhost/auth";
var client = new pg.Client(conString);

client.connect(function(err) {
    if(err) {
        return console.error('could not connect to postgres', err);
    }
    client.query('SELECT NOW() AS "theTime"', function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0].theTime);
        //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
        client.end();


    });
});


// configuration ===============================================================
require('../db/config/passport.js')(passport); // pass passport for configuration

//app.use(allowCrossDomain)

app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));



app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    //respond with 200
    res.send(200);
  }
  else {
  //move on
    next();
  }

});

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)


// required for passport, probably good to use an env variable for the secret if releasing to the wild.
app.use(session({
  secret: 'electroblubugaloo',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))
//(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('../db/config/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch the app and start listening on the port given above===================

app.listen(port);
console.log('The magic happens on port ' + port);
