// want to test the reducers

var getAllItems = require('../db/queries/getallitems.js');
let editUserPackQuantity = require('../db/queries/editUserPackQuantity.js')
let deletUserCollection = require('../db/queries/delete_user_bag.js')
let userItems = require('../db/queries/useritems.js')

let Item = require('../db/config/models/item.js');

let deleteItemFromDB = require('../db/queries/deleteitemfromdb.js')


let broom = new Item()
broom.name = 'brooomer';
broom.description = "sweeper thign"
broom.weight = 3;
broom.value = 10;
broom.category = "tool";


broom.save( (d) => {
 console.log('result from saving broom.', d)
 deleteItemFromDB(d, (err, d) => { console.log('result from deleting stuff, ', err, d)}) })
// want to delete item {"p_id":76}

//deleteItemFromDB(667, (err, d) => console.log('result from deleting stuff, ', err, d))


//getAllItems( (err,json) => console.log('all items are', json))

//userItems('test', function(err, data) { console.log('data returned by user items = ', data) })




//deletUserCollection(1, 15, (err, d) => {  console.log('deleted collection') });


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
