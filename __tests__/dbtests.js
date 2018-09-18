// want to test the reducers

var getAllItems = require('../db/queries/getallitems.js');
let editUserPackQuantity = require('../db/queries/editUserPackQuantity.js')

getAllItems( (err,json) => console.log('all items are', json))


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
