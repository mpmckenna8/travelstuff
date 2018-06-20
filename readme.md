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


The database structure: see db/createtables.sql file to see structure


todos:
Fix adding items to collections so they are in arrays.
restyle:
  add item page
  editing item PAGE

clean up logging


A good example of a thunk to do async things is in addItemClass in the file collectionactions.js



Basic flow so far:

user loads page:
  Sees main inventory for test user and is logged in as test user to explore and try out the app.
  - src/index.js has all of its stuff fired;
    - The redux store is created, and a few actions are fired.
      - selectItemClass is set to all
      - fetchItemsIfNeeded is called with itemClass=all and userName=test
        - once that's done the same action is called with itemClass=db and user=test
      - fetchBagsIfNeeded is called and gets all of the bags from the db and stores them in collection.bags of the redux store
    - Renders the Root compmonet and gives it the store as the prop
      - Root component is in src/components/root.js
  - src/compnents/root.js
      - A super simple compnent which is passed the redux store and renders the App component which is in src/components/app.js
  - src/components/app.js
    - has the main routing and directs the user to the default page which is /containers/home.js


The routes:
  - /
    - default route with no extensions to the url
    - renders Home component which is in /src/containers/home.js
    - shows a list of the items currently in the users inventory with each being a link to /item/[itemIdNumber] which will show a page with the item details and the opportunity to edit the item details.
