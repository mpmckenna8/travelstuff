// will delete a given bag given bag id.
// to delete a userbag see delete_user_bag.js
//
let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";

let delete_bag_string = "DELETE FROM packs WHERE coll_id=$1"
