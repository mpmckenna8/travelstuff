// a query to the database to delete an item from a user inventory.

let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";


function deleteUserItem(u_id, p_id, deleteFromInventory=false, deleteFromUser=true) {
  let client = new pg.Client(conString);


  let deleteItemString = "DELETE FROM items where p_id=$1";

  let deleteUserItemString = "UPDATE users SET inventory=$1, inventoryquantity=$2 where u_id=$3 returning inventory, inventoryquantity";

  let userSelectQuery = 'SELECT * FROM users where u_id=$1';

  if( deleteFromUser ) {
    client.connect();

    client.query(userSelectQuery, [u_id], function(err, res) {
      if(err) {
        console.log('err getting items for user');
        throw err;
      }


      let user = res.rows[0];

      let userInventory = user.inventory;
      let userQuants = user.inventoryquantity;

      let itemIndex = userInventory.findIndex( (d) => d.toString() ===p_id.toString())

      console.log('should be user = ', user, 'itemindex = ', itemIndex)
      userInventory.splice(itemIndex, 1);
      userQuants.splice(itemIndex,1);

      client.query(deleteUserItemString, [userInventory, userQuants, u_id], function(err, res) {
        if(err) {
          console.log('err deleting item from user inventory');
          throw err;
        }

        console.log('updated inventory = ', res.rows[0])
        client.end()

      })

    })

  }

  if(deleteFromInventory) {
    client.connect();

    client.query(deleteItemString, [p_id], function(err, res) {
      if(err) {
        console.log('error deleting the item from the items table', err);
        throw err;

      }
      else {
        console.log('item should be delected;')

      }
      client.end()

    })
    }
}


module.exports = deleteUserItem;
// example of use but need to pick a new p_id
 //deleteUserItem(5, 1,  true, false)
