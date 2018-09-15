
import fetch from 'isomorphic-fetch';


const urlStart = "http://localhost:8080/"


// need to think or implement a better way to do this

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

export function getEveryItem() {
  let getAllurl = 'http://localhost:8080/allitems';

return function(dispatch) {
  fetch(getAllurl, {
    //credentials: 'include', //pass cookies, for authentication
    method: 'GET',
    headers: {
    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
    'Content-Type': 'application/json; charset=UTF-8'
    },
    })
    .then(res =>  res.json())
    .then(json => {
        // handle the incoming new items:
        console.log('actually made a new fetch for ALL items , ', json)
        return dispatch(recievedAllItems(json))
        // return dispatch(recievedAllItems(json))
        }
      )
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation getting the all items which needs to be handeled better: ' + error.message);
      })

      }


}

function recievedAllItems(items) {
  console.log('recived all items ')
  return {
    type:'RECIEVED_ALL_ITEMS',
    items:items.items
  }
}
export const REQUEST_ITEMS = "REQUEST_ITEMS";

export function requestItems(itemClass, userName) {
  return {
    type: REQUEST_ITEMS,
    itemClass,
    userName
  }
}



export const RECIEVE_ITEMS = "RECIEVE_ITEMS";

export function recieveItems(itemClass, json, userName) {
  //console.log('recieved items json = ', json, 'for , ', userName);

  let userBags = [];
  if(json.data.bags) {
    //console.log(' recieved items and bags, json.data =', json.data);
      userBags = json.data.bags
  }

  return {
    type: RECIEVE_ITEMS,
    user: userName,
    itemClass,
    items: json.data.items.map(child => child),
    recievedAt: Date.now(),
    userPacks: userBags
  }
//}
}


// a thunk action creator to fetch our items
export function fetchItems(itemClass, userName) {
  // wierd thunk think is you do all the stuff in a callback like:
//  console.log('need to fetch items for , ', userName)
  return function(dispatch) {
    //updates state to show an api call happening

    dispatch(requestItems(itemClass, userName));

    if(itemClass === 'db') {
      userName = 'all'
    }

    console.log('fetching items for: ', userName)


    var fetchUrl = 'http://localhost:8080/items/' +  userName;
    console.log('fetching items for: ', fetchUrl);

    let USERNAME = userName;

    // we return our fetch promise and it's result

    return fetch(fetchUrl)
      .then(res =>  res.json())
      .then(json => {
          // handle the incoming new items:
          console.log('actually made a new fetch for items for, ', USERNAME)
           return dispatch(recieveItems(itemClass, json, userName))
          }
        )
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation getting the items for a user which needs to be handeled better: ' + error.message);
  });

  }
}




const shouldFetchItems = (state, itemClass) => {
  const items = state.user_items.items;
  console.log("should fetch items?", state.user_items)

  if(items.length < 1){
    return true
  }
  if(items.isFetching){
    return false;
  }
  return items.didInvalidate;
}



export const fetchItemsIfNeeded = (itemClass, userName) => (dispatch, getState) => {
  console.log('is it trying to fetch the items? ', itemClass)
  let shouldFetch = shouldFetchItems(getState(),itemClass);
  console.log(shouldFetch)
//  console.log('state in fetch items if needed for ,', itemClass,  getState())
  if(shouldFetchItems(getState(),itemClass)) {
    userName = getState().user.name;
    return dispatch(fetchItems(itemClass, userName))
  }
}



export const ADD_ITEM = "ADD_ITEM"


export const EDIT_ITEM = "EDIT_ITEM"

export const editItem = (newItem, currentCollection) => {


  updateItemInDb(newItem);

  return {
    type: "EDIT_ITEM",
    newItem: newItem,
    currentCollection: currentCollection
  }

}

export const editItemQuantity = (item, currentCollection, userName) => {
  updateQuantityDb(item, currentCollection, userName);
  console.log('dont know why action dont return', item)
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
    console.log('sent it of to db to edit quantity and got a res', res);

  };


}





// so I think the action thing isn't triggering the reducer i think because of the thunk, so I'll dispatch another thing
export const addItem = (item, className) => (dispatch, getState) => {

  console.log('getstate in additem, ', getState())
  console.log('adding item', item, className)

  dispatch( addItemToDb(item, getState().user.name), className.toString)

}



const addItemToDb = (item, userName, className = 'all') =>  (dispatch,getstate) => {

    //console.log('really need to do a post to the db in actions', item, 'state is', getState())
    let sendObj = {userName: userName,
                    item: item,
                    className: className }

    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost:8080/items/add', true);

    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.setRequestHeader('Accept', '*/*');

    // send the collected data as JSON
    xhr.send(JSON.stringify(sendObj));

    xhr.onloadend = function (a, b) {
      // done
      console.log('sent it of to db and got a res', a, 'b = ', b, this)
      dispatch(itemAddDBresponse(this, item))
    };

    return {
      type: "ADD_ITEM",
      item,
      itemClass: className
    }

}

export const itemAddDBresponse = ( res, item ) => {

  console.log('got response, ', res)
  let itemID = JSON.parse(res.response)
  return {
    type:"ADD_ITEM_RESPONSE",
    itemID: itemID,
    item: item
  }
}



export const ADD_EXISTING_ITEM = "ADD_EXISTING_ITEM";

export const addExistingItem = (newItem, collection, userName) => {

  addExistingItemToDb(newItem, userName);


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
    console.log('sent data off and got res for adding the existing item,', res)
  }

}


export const addItemToPack = (item, itemClass, userName) => {

  console.log('need to additem to userpack, ', item)

  var url = 'http://localhost:8080/items/addtobag'
  fetch(url, {
    //credentials: 'include', //pass cookies, for authentication
    method: 'post',
    headers: {
    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
    'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({item: item, userName:userName, itemClass: itemClass})
    });


    return {
      type:"ADD_ITEM_TO_PACK",
      item,
      itemClass: itemClass
    }

}
