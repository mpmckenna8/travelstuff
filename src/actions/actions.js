
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

export const addItem = (item, className) => {
  console.log('need to add item', item, className)

  return {
    type: "ADD_ITEM",
    item,
    itemClass: className
  }
}
