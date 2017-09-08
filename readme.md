Travel app

Right now just an inventory thing.

The server for the db backend is using node and postgres.  right now that dir
is:

/Users/matthewmckenna/Documents/hub/postgresprac

now it's in this directory but all the postgres files are in: /Users/matthewmckenna/Documents/hub/postgresprac/dbdir


But i need to clean it up for this and move it into a db dir or something once
it's kind of useful.

Trying to build up the db backend in
/db


The database structure:

users table,

packs table,

items table,




So the basic flow of things will be,

on first visit test user,

allows sign in.

Build up inventory,

pack it in packs.



Items table will not have any quantities.
