//all the routes for our application

var express  = require('express');
var path = require('path')
var item = require('./models/item.js')
var Collection = require('./models/collection.js')


let getAllItems = require('../queries/getAllItems.js')
let getAllBags = require('../queries/allbags')
let updateItem = require('../queries/updateitem')


module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
      //  res.render('index.ejs'); // load the index.ejs file
      console.log('blah')
      res.send('heyo')
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


  app.get('/items/all', function(req, res){
      console.log('need to actually query db for items ')

      var resData = {data:{
        items:[
          {name:'bleep',
            description:'boop'},
          {name:"ipod", description:"antiquated"}
        ]}}

      getAllItems(function(err, dat) {
        console.log(err)
        console.log(dat)
        resData.data.items = dat;

        res.json(resData)
      })



    })

    app.post('/items/add', function(req, res){
        console.log('need to add an item to the db')
        var data = req.body;
        var newitem = new item();
        console.log(req.body);
        console.log(Object.keys(req.body))
        newitem.name = data.name;
        newitem.description = data.description;
        newitem.weight = data.weight;
        newitem.category = data.category;

        newitem.save();
        console.log('newitem should have been saved to db', newitem)

        res.json({data:{
          items:'tring to add'}})

      })

    app.post('/collections/add', function(req, res) {
      var newCollection = new Collection(req.body);

      console.log('trying to save ,', req.body);
      newCollection.save(function(d){
        console.log('thouls da done the insert of the collection')
      })

      res.json({data:req.body})

    })

    app.post('/items/edit', function(req, res) {

      console.log('need to update item in db');
      var updatedObj = req.body;
      updateItem(updatedObj);
      res.send('stil need to actually persist update, but new item got to server')
    })


    app.get('/collections/all', function(req, res) {

      // need to query the db for all collections
      getAllBags((err,bags) => res.send({data:bags}))

    //  res.send({bags:[chromeoly]})
    })

    // ...
    app.get('/static', function (req, res) {
  // and drop 'public' in the middle of here
      console.log('should send the public stuff from', path.join(__dirname, 'public') )


      app.use(express.static(path.join(__dirname, 'public')))

      res.sendFile(path.join(__dirname, '../../', 'public', 'index.html'))
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
