// gets all the items in a given users inventory array.

// query to get all bags for a given user.

let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";


 // select * from items where p_id in (1,2,4);

// id's should be a
function userItems(username, cb) {

  //console.log(ids.toString())

//  let bagsString = ids.toString();


  let client = new pg.Client(conString)
  client.connect();
  let userquerystring = 'SELECT * FROM users where name=$1';
  let itemqueryString = 'SELECT * FROM items where p_id in (';

  client.query(userquerystring, [username],function(err, res) {
    if(err) {
      console.log('error querying for user')
      throw err
    }

  //  console.log('inventory is', res.rows[0].inventory)
    let inventory = res.rows[0].inventory;

    let quantities = res.rows[0].inventoryquantity;

    let userPacks = res.rows[0].userpacks

    console.log(inventory.toString())


    itemqueryString = itemqueryString + inventory.toString() + ');'
    client.query(itemqueryString, (err,res) => {
      if(err) {
        console.log("error in item query un useritems", err)
        throw err
      }

      for( i in res.rows ) {
      //  console.log('in the row iterator,', i)
        let itemIndex = inventory.findIndex(function(d) {
          return res.rows[i].p_id === d;
        })
        res.rows[i].quantity = quantities[itemIndex];

      }

      console.log('user items with quants, ', res.rows)

      var finalData = {items:res.rows, packs: userPacks};

      cb(err, finalData)


      client.end();
    })
  })
}


module.exports = userItems;
