//configuring the strategies for passport


// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
//var FacebookStrategy = require('passport-facebook').Strategy;
var pg           = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";

var client = new pg.Client(conString);

// load up the user model
var User  = require('./models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log(user.u_id +" was seralized");
        done(null, user.u_id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        console.log(id + "is deserialized");
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {

          console.log('trying to local signup')

            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function(callback) {


                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne(email, function(err, isNotAvailable, user) {
                    //console.log('userfound: ' + isNotAvailable);
                    // if there are any errors, return the error
                    console.log('looking for, ', email, isNotAvailable)


                    if (err)
                        return done(err);
                    //if (){
                    //
                    //}

                    // check to see if theres already a user with that email
                    if (isNotAvailable == true) {
                        //console.log(user.email +' is not available');
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        console.log('new local user');

                        // if there is no user with that email
                        // create the user
                        user  = new User();


                        // set the user's local credentials

                        user.email    = req.body.email;
                        user.password = req.body.password;
                        //newUser.photo = 'http://www.flippersmack.com/wp-content/uploads/2011/08/Scuba-diving.jpg';

                        user.save(function(newUser) {
                            console.log("the object new user is: ", newUser);
                            passport.authenticate();
                            return done(null, newUser);
                            //newUser.password = newUser.generateHash(password);
                        });
                    }

                });

            });

        }));



    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },

        function(req, email, password, done) { // callback with email and password from our form

          console.log('should be locally logging in')
          // function i should use below
          var isValidPassword = function(user, password){
          //  return bCrypt.compareSync(password, user.password);
          }

          console.log('looking for, ', email, password)

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'local.email' :  email }, function(err, user) {
                // if there are any errors, return the error before anything else
                console.log('is there a user User = ',user)

                console.log('req email', req.body.email)
                console.log('req password', req.body.password);
                console.log('dbpassword = ', user.password)
                let reqpass = req.body.password;

                if (err){
                    console.log('errgetting usermail')
                    return done(err);
                  }
                // if no user is found, return the message
                if (!user) {
                    console.log('not finding the user!!!')
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                  }
                // if the user is found but the password is wrong
// need to fix
               if (user.password !== reqpass) {
                    console.log('wrong password given')
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                  }
                // all is well, return successful user

                console.log('supposedly sucessful user')

                return done(null, user);
            });

        }));

        passport.use('userauth',
          new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField : 'email',
                passwordField : 'password',
                passReqToCallback : true // allows us to pass back the entire request to the callback
            },

            function(req, email, password, done) { // callback with email and password from our form

              console.log('trying to auth th euser actually', req)
            }
      ))

    };
