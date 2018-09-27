// a query to empty a bag with the option of deleting all the items or setting their quantities to zeroed

let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";

let setCollectionQuantitiesToZero = "UPDATE userpack SET items=$2 where up_id=$1 returning items";

let selectUserpack = 'SELECT * FROM userpack where up_id=$1';

/*
Empty bag will take a userCollection_id (up_id) and a options object and empty
the bag depending on the mode in options which can be either:
  - "setToZero"
    - Will leave all items in the bag but set their quantites to zero
  - "emptyArray"
    - Will make it so no items are in the userpack

*/
function emptyBag(userCollection_id, options={mode:'setToZero'}, cb) {
  let client = new pg.Client(conString);

  client.connect();
  console.log('options,', options)

  if(options.mode === 'setToZero') {
    client.query(selectUserpack, [userCollection_id], function(err, res) {
      if(err) {
        cb(err, res)
        throw err
      }
      console.log('should have set quantities to zero.')
      let itemsArray = res.rows[0].items;


      for(let o = 0; o < itemsArray.length; o++) {
        itemsArray[o][1] = 0;
      }
      console.log('items zeroed', itemsArray);
      client.query(setCollectionQuantitiesToZero, [userCollection_id, itemsArray], function(err, res) {
        if(err) {
          cb(err, res)
          throw err
        }
        client.end()
        cb(err, userCollection_id)
        return userCollection_id;
      })
    })
  }
  else if(options.mode === "emptyArray") {

    console.log('should be clearing all items')
    client.query(setCollectionQuantitiesToZero,[userCollection_id,[]],
    function(err, res) {
      if(err) {
        cb(err,res)
        throw err;

      }

      client.end()
      console.log('items should be cleared from userpack: ', userCollection_id)
      cb(err, res)

    })
  }
}

module.exports = emptyBag;
