// model for our collections to have a nice schema to match frontend and db


let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";


function Collection(obj) {

  this.name = obj.name || '';
  this.weight_capacity = obj.weight_capacity || 20;
  this.description = obj.description || 'a bag';

  this.save = function(cb) {
    var client = new pg.Client(conString);
    client.connect();
    // our table name for these is packs
    client.query('INSERT INTO packs(name, description, weight_capacity ) VALUES($1, $2, $3) RETURNING coll_id, name, weight_capacity, description', [this.name, this.description, this.weight_capacity],
    function(err, res){
      if(err){
        console.log('there was an err with the insertion', err)
      }
      client.end();
      console.log('result of insertion = ', res)
      cb(res.rows)
    } )

  }
}


module.exports = Collection;
