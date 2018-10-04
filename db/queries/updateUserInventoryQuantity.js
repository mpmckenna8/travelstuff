// a query function to update th euser inventory


let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";


let queryString = "select * from users where name=$1"



function updateUserInventoryQuantity(userName, item) {

  let client = new pg.Client(conString);

  client.connect();


  client.query(queryString, [userName], function(err, res) {
    var userInventory = res.rows[0].inventory;
    let userinfo = res.rows[0];

    console.log('res.rows = ', res.rows);
    console.log('inventory length = ', userinfo.inventory.length, ' quantities length = ', userinfo.inventoryquantity.length)
    let itemIndex = userInventory.findIndex(function(d) {
    //  console.log(d)
      return (d === item.p_id);
    })


    let inventoryQuants = res.rows[0].inventoryquantity;
    console.log('item index is', itemIndex, 'item quantity is = ', inventoryQuants[itemIndex]);


    inventoryQuants[itemIndex] = item.quantity;

    console.log('updated quanity = ', inventoryQuants[itemIndex])

    let updateString = 'UPDATE users SET inventoryquantity=$1 where name=$2 returning inventoryquantity';



    client.query(updateString, [inventoryQuants, userName ], function(err, res) {
      if(err)console.log('error updating qunat', err)

      console.log('should have updated item quantity its now', res.rows[0].inventoryquantity[itemIndex]);

      client.end();

    })


  })

}

module.exports = updateUserInventoryQuantity;
