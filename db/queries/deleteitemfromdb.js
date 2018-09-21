// wuery to delete an item from the db


let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";


let deleteitem = "DELETE FROM items WHERE p_id=$1";

// should also clear item out of bags,
function deleteItemFromDB(p_id, cb) {
  let client = new pg.Client(conString);
  client.connect();

  client.query(deleteitem, [ p_id], function(err, res) {

    if(err) {
      console.log('error deleting item from db, ', err);
      throw err
    }
    console.log('item with pid = ', p_id, ' should be deleted');
    console.log('res from delete, ', res)
    if(res.rowCount > 0) {
      cb(err, p_id)
    }
    else {
      cb(err, 'no item deleted')

    }
    console.log('should still try to delete item from all bags or collections it may be in.')
    client.end()
  })

}


module.exports = deleteItemFromDB;
