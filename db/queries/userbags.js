// query to get all bags for a given user.

let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";

 // select * from items where p_id in (1,2,4);

// id's should be a array of integers and an optional callback
function userBags(ids, cb) {
  //console.log(ids.toString())
  let bagsString = ids;

  let client = new pg.Client(conString)
  client.connect();

  let queryString = 'SELECT * FROM userpack where up_id = any ($1);';

  client.query(queryString, [bagsString],function(err, res) {
    if(err) {
      console.log('err querying for userbags')
      throw err

    }
    console.log('query result from userbags = ', res.rows)
    if(cb) {
      cb(err, res.rows)
    }
    client.end();
  })
}

/* example of how to call it
userBags([1,2], function(err, d) {
  console.log('got d')
})

*/




module.exports = userBags;
