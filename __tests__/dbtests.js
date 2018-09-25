// want to test the reducers
var assert = require('assert');



var getAllItems = require('../db/queries/getallitems.js');
let editUserPackQuantity = require('../db/queries/editUserPackQuantity.js')
let deletUserCollection = require('../db/queries/delete_user_bag.js')
let userItems = require('../db/queries/useritems.js')

let getUserBags = require('../db/queries/userbags.js')

let Item = require('../db/config/models/item.js');

let deleteItemFromDB = require('../db/queries/deleteitemfromdb.js')
let addItemToBag = require('../db/queries/addItemToBag.js')

let removeItemFromBag = require('../db/queries/removeItemFromBag.js');

let deleteUserBag = require('../db/queries/delete_user_bag');

let broom = new Item()
broom.name = 'brooomer';
broom.description = "sweeper thign"
broom.weight = 3;
broom.value = 10;
broom.category = "tool";


broom.save( (d) => {
 console.log('result from saving broom.', d)
 assert(typeof d !== undefined , 'saving an item returned a thing')
 deleteItemFromDB(d, (err, q) => { console.log('result from deleting stuff, ', err, q)
 assert(q >= 1, 'rowcount should be greater than 0 if something was deleted.')
 console.log('sucessfully added and deleted an item.')
}) })

getUserBags([6], (err, d) => console.log(d))



//addItemToBag( { item:{p_id: 3, quantity: 4}, itemClass: 6}, (d) => console.log('result from adding item to bag', d) )

// be careful as this will delete all items with that p_id

// takes pack_id = up_id and item_id = p_id
//removeItemFromBag( 6, 30, (deletedItem) => console.log('should have deleted item ' , deletedItem,  ' from the bag.') )


//getAllItems( (err,json) => console.log('all items are', json))

//userItems('test', function(err, data) { console.log('data returned by user items = ', data) })




//deletUserCollection(1, 15, (err, d) => {  console.log('deleted collection') });

//deleteUserBag(1, 49, (dbres) => console.log('cb from deleteUserBag returns', dbres))
/* example function call which worked
editUserPackQuantity({ item:
   { p_id: 1,
     name: 'laptop',
     description: 'smaller computer',
     weight: 3,
     value: 1000,
     category: 'tool',
     quantity: 16 },
  collection: 2,
  user: 'test' })
  */
