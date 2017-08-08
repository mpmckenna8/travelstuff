// to make an item model for saveing items in the db,
let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";

//var client = new pg.Client(conString);

function Item() {
  this.p_id = 0;
  this.name = '';
  this.description = '';
  this.weight = 0.1;
  this.value = 0.1;
  this.category = 'other'

  this.save = function(cb) {

      var conString = "postgres://matthewmckenna@localhost/auth";

      var client = new pg.Client(conString);
      client.connect();

      client.query('INSERT INTO items(name, description, weight, category ) VALUES($1, $2, $3, $4)', [this.name, this.description, this.weight, this.category],
      function(err, res){
        if(err){
          console.log('there was an err with the insertion', err)
        }
        console.log('result of insertion = ', res)
      } )

  }
}

Item.findItemById = function(pid) {
  let queryString = "SELECT * FROM items WHERE p_id=$1"

  client.query(queryString, [pid], function(err, res) {
      console.log(err, res)
    }
  )
}

module.exports = Item;
