// add userbag to db


let pg = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";


function addUserBag(data, cb) {
  let client = new pg.Client(conString);
  client.connect();
  let updateString = 'INSERT INTO userpack(packtype, name, items) VALUES($1, $2, $3) returning up_id'

  let updateUserString = 'UPDATE users SET userpacks=array_append(userpacks, $1) where name=$2;'
  let userName = data.userName
  client.query(updateString, [data.bagInfo.coll_id, data.bagInfo.userDescription, []], (err,res) => {
    if(err) {
      console.log('error adding userpack to username. ', err)
    }
    console.log('tring to update userpacks', res.rows[0])

    if(res ) {
      let bag_id = res.rows[0].up_id;
      client.query(updateUserString, [bag_id, userName], (err, res) => {

        if(err) throw err;
        client.end();
        cb(bag_id)
    })

  }
  else {
    cb("bag add failure somehow without an error")
    console.log('sorry there was no bag associated with this user.')
    client.end();

  }

  //  cb()
  })

}


module.exports = addUserBag;
