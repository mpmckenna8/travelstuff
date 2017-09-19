
import fetch from 'isomorphic-fetch';

const urlStart = "http://localhost:8080/"


// need to think or implement a better way to do this
let username = 'test';

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

export function requestItems(itemClass, userName) {

  return {
    type: REQUEST_ITEMS,
    itemClass
  }
}



export const RECIEVE_ITEMS = "RECIEVE_ITEMS";

export function recieveItems(itemClass, json, userName) {

  console.log('recieved json = ', json);

  return {
    type: RECIEVE_ITEMS,
    user: userName,
    itemClass,
    items: json.data.items.map(child => child),
    recievedAt: Date.now()
  }
}


// a thunk action creator to fetch our items
export function fetchItems(itemClass, userName) {
  // wierd thunk think is you do all the stuff in a callback like:
  return function(dispatch) {
    //updates state to show an api call happening
    dispatch(requestItems(itemClass));

    if(itemClass === 'db') {
      userName = 'all'
    }
    let fetchUrl = 'http://localhost:8080/items/' +  userName;
    // we return our fetch promise and it's result
    return fetch(fetchUrl)
      .then(res => res.json())
      //  error => console.log('an error happend with fetch', error))
      .then(json =>
          // handle the incoming new items:
          dispatch(recieveItems(itemClass, json, userName))
        )
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation which needs to be handeled better: ' + error.message);
  });

  }
}




const shouldFetchItems = (state, itemClass) => {

  const items = state.itemsByType[itemClass];
  console.log(state.user)

  if(!items){
    return true
  }
  if(items.isFetching){
    return false;
  }
  return items.didInvalidate;

}




export const fetchItemsIfNeeded = (itemClass, userName) => (dispatch, getState) => {
  console.log('state in fetch items if needed for ,', itemClass,  getState())


  if(shouldFetchItems(getState(),itemClass)) {
    username = getState().user.name;
    return dispatch(fetchItems(itemClass, username))
  }
}








export const ADD_ITEM = "ADD_ITEM"

const addItemToDb = (item, userName, className='all' ) =>  {

    //console.log('really need to do a post to the db in actions', item, 'state is', getState())
    let sendObj = {userName: userName,
                    item: item }

    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost:8080/items/add', true);

    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.setRequestHeader('Accept', '*/*');

    // send the collected data as JSON
    xhr.send(JSON.stringify(sendObj));

    xhr.onloadend = function () {
      // done
      console.log('sent it of to db and got a res')

    };

    return {
      type: "ADD_ITEM",
      item,
      itemClass: className
    }

}




export const EDIT_ITEM = "EDIT_ITEM"

export const editItem = (newItem, currentCollection) => {


  updateItemInDb(newItem)

  return {
    type: "EDIT_ITEM",
    newItem: newItem,
    currentCollection: currentCollection
  }

}

export const editItemQuantity = (item, currentCollection, userName) => {

  updateQuantityDb(item, currentCollection, userName);
  return {
    type: "EDIT_ITEM",
    newItem: item,
    currentCollection: currentCollection
  }
}


function updateQuantityDb(item, currentCollection, userName) {

  console.log('need to do an endpoint for quantity for ,', item)
  let xhr = new XMLHttpRequest();

  let updateData = {item: item, collection:currentCollection, user: userName};



  xhr.open('POST','http://localhost:8080/items/editquant', true);

  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8' )
  xhr.send(JSON.stringify(updateData));

  xhr.onloadend = function (res) {
    // done
    console.log('sent it of to db and got a res', res);

  };


}





// so I think the action thing isn't triggering the reducer i think because of the thunk, so I'll dispatch another thing
export const addItem = (item, className) => (dispatch, getState) => {

  console.log('getstate in additem, ', getState())
  console.log('adding item', item, className)

  dispatch(addItemToDb(item, getState().user.name), className)


}


export const ADD_EXISTING_ITEM = "ADD_EXISTING_ITEM";

export const addExistingItem = (newItem, collection, username) => {

  addExistingItemToDb(newItem, username);


  return {
    type: ADD_EXISTING_ITEM,
    newItem: newItem,
    itemClass: collection
  }

}


function updateItemInDb(item) {
  let xhr = new XMLHttpRequest();

  xhr.open('POST','http://localhost:8080/items/edit', true);

  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8' )
  xhr.send(JSON.stringify(item));

  xhr.onloadend = function (res) {
    // done
    console.log('sent it of to db and got a res', res);

  };


}


function addExistingItemToDb(item, user) {
  let xhr = new XMLHttpRequest();
  let sendjson = {item:item, user: user}
  let urlend = urlStart + "existingitem"
  xhr.open('POST', urlend, true);

  xhr.setRequestHeader("Content-Type", 'application/json; charset=UTF-8');

  xhr.send(JSON.stringify(sendjson));

  xhr.onloadend = function(res) {
    console.log('sent data off and got res,', res)
  }

}
