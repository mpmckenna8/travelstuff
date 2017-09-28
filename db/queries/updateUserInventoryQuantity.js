// a query function to update th euser inventory


let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";


let queryString = "select * from users where name=$1"



function updateUserInventoryQuantity(userName, item) {

  let client = new pg.Client(conString);

  client.connect();


  client.query(queryString, [userName], function(err, res) {
    var userInventory = res.rows[0].inventory;

    let itemIndex = userInventory.findIndex(function(d) {
      console.log(d)
      return (d === item.p_id);
    })

    console.log('item index is', itemIndex);

    let inventoryQuants = res.rows[0].inventoryquantity;

    inventoryQuants[itemIndex] = item.quantity;

    let updateString = 'UPDATE users SET inventoryquantity=$1 where name=$2';

    client.query(updateString, [inventoryQuants, userName ], function(err, res) {
      if(err)console.log('error updating qunat', err)

      console.log('should have updated item quantity', res);
      client.end();

    })


  })

}

module.exports = updateUserInventoryQuantity;
