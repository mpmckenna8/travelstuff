// removes a given item from the bag.
let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";


// removes all the items with the given item_id from the collection with the pack_id
function removeItemFromBag(pack_id, item_id, cb) {
    console.log('at least queriying ', pack_id)

  let client = new pg.Client(conString);

  let selectUserpack = 'SELECT items FROM userpack where up_id=$1;';

  client.connect();

  client.query( 'SELECT items FROM userpack where up_id=$1;', [pack_id], function(err, res) {
      if(err) {
        console.log('error with query', err)
        throw err;
      }
      //console.log('query worked')
      //console.log(res.rows)

      let packitems = res.rows[0].items.filter(function(element, index, array) {
        console.log('item_id, element_id', item_id, element)
        return parseInt(element[0]) !==  parseInt(item_id)
      });

      let updateString = 'UPDATE userpack SET items=$1 where up_id=$2;';

      client.query(updateString, [packitems, pack_id], function(err, res) {
        console.log('should have deleted the item with id,', item_id)
        if(cb) {
          cb(item_id)
        }
        client.end();

      })


    })

}

module.exports = removeItemFromBag;

//removeItemFromBag(1,1000000);
