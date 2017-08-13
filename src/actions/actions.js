
import fetch from 'isomorphic-fetch'

// actions to get items
// itemclass will basically be how to query items from the server
export const SELECT_ITEM_CLASS = "SELECT_ITEM_CLASS";

export function selectItemClass(itemClass) {
  return {
    type: SELECT_ITEM_CLASS,
    itemClass
  }
}

export const INVALIDATE_ITEM_CLASS = "INVALIDATE_ITEM_CLASS";

export function invalidateItemClass(itemClass) {
  return {
    type: INVALIDATE_ITEM_CLASS,
    itemClass
  }
}


export const ADD_ITEM_CLASS = "ADD_ITEM_CLASS";

// note in the db and display this will be collections or bags or something else
export function addItemClass(newItemClass) {
  console.log('also need to add bag to db')
  addBagToDb(newItemClass);
  return {
    type: ADD_ITEM_CLASS,
    itemClass: newItemClass
  }

}


function addBagToDb(newbag) {

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:8080/collections/add', true);

  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.setRequestHeader('Accept', '*/*');

//  newbag.description = 'a bag';

  //newbag.weight_capacity = 20.0;
  // send the collected data as JSON
  xhr.send(JSON.stringify(newbag));

  xhr.onloadend = function (res) {
    // done
    console.log('sent it of to db and got a res')
    console.log(res)

  };

}


export const REQUEST_ITEMS = "REQUEST_ITEMS";

export function requestItems(itemClass) {
  return {
    type: REQUEST_ITEMS,
    itemClass
  }
}



export const RECIEVE_ITEMS = "RECIEVE_ITEMS";

export function recieveItems(itemClass, json) {

  console.log('recieved json = ', json);

  return {
    type: RECIEVE_ITEMS,
    itemClass,
    items: json.data.items.map(child => child),
    recievedAt: Date.now()
  }
}



// a thunk action creator to fetch our items
export function fetchItems(itemClass) {
  // wierd thunk think is you do all the stuff in a callback like:
  return function(dispatch) {
    //updates state to show an api call happening
    dispatch(requestItems(itemClass))
    let fetchUrl = 'http://localhost:8080/items/' + itemClass
    // we return our fetch promise and it's result
    return fetch(fetchUrl)
      .then(res => res.json(),
        error => console.log('an error happend with fetch', error))
      .then(json =>
          // handle the incoming new items:
          dispatch(recieveItems(itemClass, json))
        )

  }
}

const shouldFetchItems = (state, itemClass) => {

  const items = state.itemsByType[itemClass];

  if(!items){
    return true
  }
  if(items.isFetching){
    return false;
  }
  return items.didInvalidate;

}


export const fetchItemsIfNeeded = itemClass => (dispatch, getState) => {
  if(shouldFetchItems(getState(),itemClass)) {
    return dispatch(fetchItems(itemClass))
  }
}

export const ADD_ITEM = "ADD_ITEM"

function addItemToDb(item) {

  //  console.log('need to do a post to the db in actions', item)

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/items/add', true);

    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.setRequestHeader('Accept', '*/*');

    // send the collected data as JSON
    xhr.send(JSON.stringify(item));

    xhr.onloadend = function () {
      // done
      console.log('sent it of to db and got a res')

    };


}

export const addItem = (item, className) => {
  console.log('adding item', item, className)

  addItemToDb(item)

  return {
    type: "ADD_ITEM",
    item,
    itemClass: className
  }
}
