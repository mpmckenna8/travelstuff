

let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";

function addFirstUserItem( username, itemInfo) {

  let client = new pg.Client(conString);
  client.connect();

  let queryStr = 'UPDATE users SET inventory={$2}, inventoryquantity={$3} WHERE email=$1 RETURNING inventory';

  client.query(queryStr, [userName, newItemId, quantity],
    function( err, res) {
      if(err) { console.log('there was an error updateing the thing', err )
        throw err
    }

      console.log('updated userinventory with first item in db ', res.rows)

      client.end();
    });
}


module.exports = addFirstUserItem;
