// add item to the db query
// to make an item model for saveing items in the db,
let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";


function getAllItems(cb){

    let client = new pg.Client(conString);
    client.connect();

    let queryString = "SELECT * FROM items;"

    client.query(queryString, function(err, res){
      if(err){
        throw err;
        console.log('error with the db query', err)
        client.end()
      }
    //  console.log('all items should be ', res.rows)
      cb(err, res.rows)
      client.end()

    })

}


module.exports = getAllItems
