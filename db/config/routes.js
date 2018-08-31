//all the routes for our application

var express  = require('express');
var path = require('path')
var item = require('./models/item.js')
var Collection = require('./models/collection.js')


let getAllItems = require('../queries/getAllItems.js')
let getAllBags = require('../queries/allbags')
let updateItem = require('../queries/updateitem')
let getUserItems = require('../queries/useritems.js')
let getUserBags = require('../queries/userbags')
const editUserPackQuantity = require('../queries/editUserPackQuantity');
const addUserBag = require('../queries/addUserBag');
const addItemToBag = require('../queries/addItemToBag')
const delete_user_bag = require('../queries/delete_user_bag')

let updateUserInventory = require('../queries/updateUserInventory.js')

let updateInventoryQuantity = require('../queries/updateUserInventoryQuantity.js')

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
      //  res.render('index.ejs'); // load the index.ejs file
      console.log('blah default thing')
      res.send('heyo')
    });



    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
        console.log('trying to log in a user')
        // render the page and pass in any flash data if it exists
        res.sendFile( path.join(__dirname,'../../','src/login/login.html') );
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
        res.sendFile( path.join(__dirname,'../../','src/login/signup.html') );
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
      //  console.log(dat)
        resData.data.items = dat;

        res.json(resData)
      })



    })

  app.post('/userbag/add', function(req, res) {
    let data = req.body;

    console.log('need to update in db, ', data)

      addUserBag(data, function(bag_id) {
        console.log('bag_id = ', bag_id)
        res.send(JSON.stringify(data))
    })
  })



  app.post('/items/editquant', function(req, res) {
      console.log('need to figure out how to update item', req.body)

      let data = req.body;

      if( data.collection === 'all') {

        updateInventoryQuantity(data.user, data.item)

      }
      else {
        console.log('need to actually update the userpack');
        editUserPackQuantity(data);

      }

      res.send('Item quantity should be updated')
  })





    app.get('/items/*', function(req, res){
      //  console.log('need to actually query db for items for user ', req)
        let userName = req.url.split('/')[2];
        console.log('user: ', userName)//Object.keys(userName))

        var resData = {data:{
          items:[
            {name:'bleep',
              description:'boop'},
            {name:"ipod", description:"antiquated"}
          ]}}

        getUserItems(userName, function(err, dat) {
          if(err) console.log(err)

          //console.log('sending user items', dat)

          resData.data = dat;


          getUserBags(dat.packs, (err, bagdata) => {

            console.log('trying to get userbags', bagdata);

            resData.data.bags = bagdata;
            console.log('stuff from the user items get', JSON.stringify(resData))
            res.json(resData)

          })

        })

})

app.get('/userpacks', function(req, res) {

  console.log('need to get packs,', req.body)

  res.json({status:'working on getting them items'})
})


  app.post('/existingitem', function(req, res) {
        console.log('got a req to add existing item, ', req);
        let data = req.body;
        // need to update
        updateUserInventory(data.user, data.item.p_id, parseInt(data.item.quantity));
        res.send('errr for some reason its adding two things')
  })

    app.post('/items/add', function(req, res){
        console.log('adding an item to the db', req.body)
        var userName = req.body.userName;
        var data = req.body.item;
        var newitem = new item();
      //  console.log(req.body);
        //console.log(Object.keys(req.body))

        newitem.name = data.name;
        newitem.description = data.description;
        newitem.weight = data.weight;
        newitem.category = data.category;
        quantity = data.quantity;

        if(req.body.className === 'all') {

        newitem.save( (itemID) => {
          console.log('need to pass this callback an item id so I can add it to the user inventory too', typeof itemID)
          updateUserInventory(userName, itemID, quantity);

          res.json({data:{
            newItem: newitem,
            item_id: itemID,
            items:'tring to add'}})

        });

        }
        else {
          console.log('need to add item to specific userbag')
        }




      })

    app.post('/collections/add', function(req, res) {
      var newCollection = new Collection(req.body);

      console.log('trying to save ,', req.body);
      newCollection.save(function(d){

            console.log('saved a collection, ', d)
          res.json({data:d[0]})

      })


    })

    app.post('/items/edit', function(req, res) {

      console.log('need to update item in db');
      var updatedObj = req.body;
      updateItem(updatedObj);
      res.send('stil need to actually persist update, but new item got to server');

    })

    app.post('/items/addtobag', function(req, res) {

      let data = req.body;

      addItemToBag(data);
      console.log('need to add item to bag from still', data)


      res.send('hooba')
    })

    app.post('/collections/deleteuserbag', function(req, res) {

      let del_bag_data = req.body;
      console.log('should be deleting the userbag')

      delete_user_bag( del_bag_data.user_id, del_bag_data.bag_id )
    })


    app.get('/collections/all', function(req, res) {

      // need to query the db for all collections
      getAllBags((err,bags) => {
        console.log('all bags: ', bags)
        res.send({
          data:bags
          }
        )})

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
