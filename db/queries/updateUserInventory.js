// need to add the new items to a users inventory
// https://stackoverflow.com/questions/11007800/postgres-array-append-array-length-for-array-push
// above has good advice for adding stuff to a array.


let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";


function updateUserInventory(userName, newItemId, quantity=1) {

  console.log('need to update,', userName, newItemId)
  let client = new pg.Client(conString);
  client.connect();

  let queryStr = 'UPDATE users SET inventory=array_append(inventory, $2), inventoryquantity=array_append(inventoryquantity, $3) WHERE name=$1 RETURNING inventory';


  client.query(queryStr, [userName, newItemId, quantity],
    function( err, res) {
      if(err) { console.log('there was an error updateing the thing', err )}
      console.log('updated userinventory in db ', res)

      client.end();
    });


}

module.exports = updateUserInventory;
