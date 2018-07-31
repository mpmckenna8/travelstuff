// will delete a given bag given bag id.
// to delete a userbag see delete_user_bag.js
//
let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";

let delete_bag_string = "DELETE FROM packs WHERE coll_id=$1"


function delete_pack(coll_id, cb) {

  let client = new pg.Client(conString);

  client.connect();

  client.query(delete_bag_string, [coll_id], function(err, res) {
    if(err) {
      console.log('err deleting bag, ', err)
    }
    console.log('bag ', coll_id, ' is deleted')
    client.end();
  })
}


module.exports = delete_pack;


//delete_pack(20)
