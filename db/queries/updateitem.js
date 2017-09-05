// takes an item and updates it in the db

// all bags query
let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";


function updateItem(newItem) {

  let client = new pg.Client(conString);
  client.connect();

  let queryStr = 'UPDATE items SET name=$2, description=$3, weight=$4, category=$5, value=$6 WHERE p_id=$1';

  client.query(queryStr, [newItem.p_id, newItem.name, newItem.description, newItem.weight, newItem.category, newItem.value],
    function( err, res) {
      if(err) { console.log('there was an error updateing the thing', err );}
      console.log('updated item in db ', res)
    });



}

module.exports = updateItem;
