// all bags query
let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";


function getAllBags(cb) {

  let client = new pg.Client(conString)
  client.connect();

  let queryString = 'SELECT * FROM packs;';

  client.query(queryString, function(err, res) {
    if(err) {
      throw err

    }
    cb(err, res.rows)
    client.end();
  })
}


module.exports = getAllBags;
