// a query to update the quantity in userpack


let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";


function editUserPackQuantity(data) {

  let client = new pg.Client(conString);

  let selectUserpack = 'SELECT * FROM userpack where up_id=$1';
  let updateString = 'UPDATE userpack SET items=$1 where up_id=$2';

  client.connect();

  client.query(selectUserpack, [data.collection], function(err, res) {
    if(err) {
      throw err;
    }
  //    console.log('should have updated the itemquantity in collection', res.rows[0])
    let packItems = res.rows[0].items

    for( i of packItems) {
      if( i[0] === data.item.p_id) {
        i[1] = data.item.quantity;
      }
    }

    console.log('packitems updated ', packItems)

    client.query(updateString, [packItems, data.collection], function(err, res) {
      if(err) throw err;
      console.log('items should be updated in the userpack', res);

      client.end()

    })


  })


}


/* example function call which worked
editUserPackQuantity({ item:
   { p_id: 1,
     name: 'laptop',
     description: 'smaller computer',
     weight: 3,
     value: 1000,
     category: 'tool',
     quantity: 16 },
  collection: 2,
  user: 'test' })

  */

  module.exports =  editUserPackQuantity;
