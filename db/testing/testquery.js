// a file to practice queries before i put em in the query directory


let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";


let queryString = "UPDATE users SET userpacks=$1 where name='test'"

let client = new pg.Client(conString);
client.connect();

client.query(queryString, [[1,2]], function(err, res) {

  console.log('updated userpacks with new packs')
  client.end();


})
