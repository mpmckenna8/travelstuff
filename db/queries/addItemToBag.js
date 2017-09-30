


let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";


function addItemToBag(data) {

  let client = new pg.Client(conString);
  client.connect();
  var itemInfo = [ parseInt(data.item.p_id), parseInt(data.item.quantity) ]
  let packId = parseInt(data.itemClass);

  console.log(itemInfo, packId)
  let updateString = "UPDATE userpack SET items=items || $1 WHERE up_id=$2 returning items";

  client.query(updateString, [itemInfo, packId], function(err, res) {
    if(err) console.log('err updating bag,', err)

    console.log('hopfully updated the userpack with new item', res);
    client.end();

  });

}


module.exports = addItemToBag;
