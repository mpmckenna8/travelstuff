To describe the db backend for the app

I think I wanted to kind of follow this for how to do it:
http://uitblog.com/postgres-with-passport/



It's in a postgres database. On my computer it's in a directory
/Users/matthewmckenna/Documents/hub/postgresprac/dbdir

and can be started with:


    postgres -D ./



Everything is served by a express server which can be run with the:

    node server.js


While in the db directory.


To create the required tables you need to run the createtables.sql script on a database you create with the createdb command.

I named mine auth which is referenced in the db url in a lot of the scripts.

To create the database (this one named auth), make sure you have an active database cluster and run:

    createdb auth

And if that doesn't work make sure you have a database cluster running and then try again,

Once you have that going you should be able to add tables to your database by running:

    psql -d auth -f createtables.sql

Then you should be good to go with a user called test


For our little sample user to add items.

UPDATE users SET inventory='{1,2,3,4,5}' WHERE u_id=1;

INSERT into userpack VALUES (0, 'DAYPACK', 1, '{1,1}');


The authentication idea is basically using passport with node.  Should allow user to log in with some third party ids.
