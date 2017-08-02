//all the routes for our application
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
      //  res.render('index.ejs'); // load the index.ejs file
    });






    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
    //    res.render('login.ejs', { message: req.flash('loginMessage') });

    });

    // process the login form only really works from same domain
    // app.post('/login', do all our passport stuff here);
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    let LocalStrategy = require('passport-local').Strategy;

    passport.use(new LocalStrategy(
      function(username, password, done) {

        console.log('trying to do local strategy')
        User.findOne({ username: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);

        });
      }
    ));


// secial login for my app
  app.post('/auth/login', function(req, res){
              console.log('req coma through')
        //    console.log(JSON.stringify(req))
              console.log(req.headers)
              console.log(req.body)
              res.json({"userName": "test"})
              }
            );

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
    //    res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {

        res.send( {
            user : req.user // get the user out of session and pass to template
        });

    });

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));


// =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    app.get('/items/*', function(req, res){


      res.json({data:{
        items:[
          {name:'bleep',
            description:'boop'},
          {name:"ipod", description:"antiquated"}
        ]}})

    })

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        console.log('isLoggedin');
        return next();
    }
    console.log('is not logged in');

    // if they aren't redirect them to the home page
    res.redirect('/');
}
