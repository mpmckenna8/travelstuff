// to make an item model for saveing items in the db,
let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";

var client = new pg.Client(conString);

function Item() {
  this.p_id = 0;
  this.name = '';
  this.description = '';
  this.weight = 0;
  this.value = 0;

  this.save = function(cb) {
      var conString = "postgres://matthewmckenna@localhost/auth";

      var client = new pg.Client(conString);
      client.connect();

      client.query('INSERT INTO items(name, description, weight) VALUES($1, $2, #3)', [this.name, this.description, this.weight] )

  }
}

Item.findItemById = function(pid) {
  let queryString = "SELECT * FROM items WHERE p_id=$1"

  client.query(queryString, [pid], function(err, res) {
      console.log(err, res)
    }
  )
}

module.exports = item;
