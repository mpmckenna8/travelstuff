// gets all the items in a given users inventory array.

// query to get all bags for a given user.

let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";


 // select * from items where p_id in (1,2,4);

// id's should be a
function userItems(ids, cb) {

  //console.log(ids.toString())

  let bagsString = ids.toString();


  let client = new pg.Client(conString)
  client.connect();

  let queryString = 'SELECT * FROM packs where up_id in ($1);';

  client.query(queryString, [bagsString],function(err, res) {
    if(err) {
      throw err

    }
    cb(err, res.rows)
    client.end();
  })
}


module.exports = userItems;
