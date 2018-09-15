var pg           = require('pg');

var conString = "postgres://matthewmckenna@localhost/auth";
var client = new pg.Client(conString);


function User(){
    this.u_id = 0;
    //this.name ='';
    this.photo ='';
    this.email = "";
    this.password= ""; //need to declare the things that i want to be remembered for each user in the database
    this.save = function(callback) {
        var client = new pg.Client(conString);
        client.connect();

        console.log(this.email +' will be saved');

            client.query('INSERT INTO users(email, name, password, inventory, inventoryquantity, inventorydescription) VALUES($1, $1, $2, $3, $4, $5) returning u_id', [this.email, this.password, "{}", "{}", "{}"], function (err, result) {
                if(err){
                    console.log(err);
                    return console.error('error running query', err);
                }
                console.log('result of inserting new user', result.rows);
                client.end()
                //console.log(this.email);
            });

            client.query('SELECT * FROM users ORDER BY u_id desc limit 1', null, function(err, result){

                if(err){
                    return callback(null);
                }
                //if no rows were returned from query, then new user
                if (result.rows.length > 0){
                    console.log(result.rows[0] + ' is found!');
                    var user = new User();
                    user.email= result.rows[0]['email'];
                    user.password = result.rows[0]['password'];
                    user.u_id = result.rows[0]['u_id'];
                    console.log(user.email);
                    client.end();
                    return callback(user);
                }
            });

    };

    this.validPassword = function(passwordin) {
      console.log("checking password. given password = ", passwordin)
      return passwordin === this.password;
    }

    this.findOne= function(email, callback){
        var conString = "postgres://matthewmckenna@localhost/auth";
        var client = new pg.Client(conString);
        var isNotAvailable = false; //we are assuming the email is taking
        console.log( JSON.stringify(email) + ' is in the findOne function test');

        //check if there is a user available for this email;
        client.connect();
        client.query("SELECT * from users where email=$1", [email['email']], function(err, result){
            if(err){
                return callback(err, isNotAvailable, this);
            }
            console.log('queryingin user thing!!!', email, 'result.rows.length = ', result.rows.length)
            //if no rows were returned from query, then new user
            if (result.rows.length > 0){
                isNotAvailable = true; // update the user for return in callback
                ///email = email;
                //password = result.rows[0].password;
                console.log(result.rows[0])
                isNotAvailable = result.rows[0]
                console.log( ' is am not available!', email);
            }
            else{
                isNotAvailable = false;
                //email = email;
                console.log(email + ' is available');
                return callback('user does not exist', email)
            }
            //the callback has 3 parameters:
            // parameter err: false if there is no error
            //parameter isNotAvailable: whether the email is available or not
            // parameter this: the User object;
            console.log('users with this email, ', result.rows[0])
            // do things with the result.rows to make anew user and give it to the callback
            let logUser = new User;
            logUser.u_id = result.rows[0].u_id
            logUser.email = result.rows[0].email
            logUser.password = result.rows[0].password

            client.end();
            return callback(err, logUser, this);
        });
    //});
    };

    this.attemptLogIn = function(userLogin) {

    }


}



User.findById = function(id, callback){
    console.log("we are in findbyid");
    var conString = "postgres://matthewmckenna@localhost/auth";
    var client = new pg.Client(conString);

    client.connect();
    client.query("SELECT * from users where u_id=$1", [id], function(err, result){

        if(err){
            return callback(err, null);
        }
        //if no rows were returned from query, then new user
        if (result.rows.length > 0){
            console.log(result.rows[0] + ' is found!');
            var user = new User();
            user.email= result.rows[0]['email'];
            user.password = result.rows[0]['password'];
            user.u_id = result.rows[0]['u_id'];
            console.log(user.email);
            return callback(null, user);
        }

        client.end();
    });
};

//User.connect = function(callback){
//    return callback (false);
//};

//User.save = function(callback){
//    return callback (false);
//};

module.exports = User;
