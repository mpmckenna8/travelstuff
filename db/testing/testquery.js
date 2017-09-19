// a file to practice queries before i put em in the query directory


let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";


let queryString = "select * from users where name='test'"

let client = new pg.Client(conString);
client.connect();

client.query(queryString, function(err, res) {

  console.log('res of query , ', res.rows)
  var userInventory = res.rows[0].inventory;

  let itemIndex = userInventory.findIndex(function(d) {
    console.log(d)
    return (d === 8);
  })

  console.log('banna index is', itemIndex);

  let inventoryQuants = res.rows[0].inventoryquantity;

  inventoryQuants[itemIndex] = 1;

  let updateString = 'UPDATE users SET inventoryquantity=$1 where u_id=1';

  client.query(updateString, [inventoryQuants], function(err, res) {
    if(err)console.log('error updating qunat', err)

    console.log(res);
    client.end();

  })



})
