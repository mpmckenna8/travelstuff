// actions having to do with the bags/collections
import fetch from 'isomorphic-fetch'


export const fetchBagsIfNeeded = () => (dispatch, getState) => {

  console.log('after fetchbags if needed', getState());
  if(getState().collections.needsUpdate) {
    return dispatch(fetchBags())
  }
}


// query the db for all the appropriate bags
// for now gets all bags, in future only user appropriate bags hopefully
export const FETCH_BAGS = "FETCH_BAGS";
export const fetchBags = () => {

console.log("need to fetch the bags",{'name': 'getall the bags'} )

  return function(dispatch) {
    let fetchUrl = 'http://localhost:8080/collections/all'
    dispatch(requestBags())
    return fetch(fetchUrl)
      .then(res => res.json(), error => console.log('error with the bags fetch, ', error))
      .then(json => dispatch(recieveBags(json)))
  }

}

export const REQUEST_BAGS = "REQUEST_BAGS";

export function requestBags(){
  console.log('requesting bags')
  return {
    type:REQUEST_BAGS
  }
}

export const RECIEVE_BAGS = "RECIEVE_BAGS"

export const recieveBags = function(bags) {
  console.log('recieved the bags from req i think,', bags)
  return {
    type:RECIEVE_BAGS,
    bags: bags
  }

}

export const ADD_ITEM_CLASS = "ADD_ITEM_CLASS";

// note in the db and display this will be collections or bags or something else
export function addItemClass(newItemClass) {
  console.log('also need to add bag to db', newItemClass)

  return function (dispatch) {
    dispatch(addBagToDb(newItemClass));

    return fetch('http://localhost:8080/collections/add', {
      body: JSON.stringify(newItemClass),
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'accept': '*/*'
      }
    }).then(
      response => response.json(),
      error => console.log('there was an error in the add itemclass call thing to db, ', error)
    ).then(
      json => {
        return dispatch(badAddedToDB(json))
      }
    )
  }
}

function badAddedToDB(newbag) {
  console.log('added new bag to db', newbag)
  return {
    type:"ADDED_BAG_TO_DB",
    mesg: "maybe worked",
    newbag: newbag
  }
}

export function fetchPacks(userPacks) {
  console.log('fetching user packs')
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:8080/userpacks', true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.setRequestHeader('Accept', '*/*');
  xhr.send({userpacks: userPacks})
  xhr.onloadend = function(res) {
    console.log('res from userpacks,', res)
  }
}

export function addNewUserBag(newBag, userName) {
  return function(dispatch) {

    dispatch(addUserBagToDb(newBag, userName));

}

}


function addUserBagToDb(newBag, userName) {
  let data = {
    bagInfo: newBag,
    userName
  }
  return function(dispatch) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:8080/userbag/add', true);

  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.setRequestHeader('Accept', '*/*');

  xhr.send(JSON.stringify(data));

  console.log('tried to add to db, , ', newBag, userName)

  let loadcounter = 0;
  xhr.onloadend = function(e) {
    loadcounter = loadcounter + 1;
    console.log('loadcounter = ', loadcounter)
    console.log('sent newbag and got response,', xhr)
    if(xhr.response) {
      dispatch( userBagAddedToDB( JSON.parse(xhr.response) ) )
    }
  }

  return xhr.onloadend;

}
}

function userBagAddedToDB(newbag) {
  return {
    type: "USER_BAG_ADDED",
    msg: "Bag added to db and request ended",
    newbag: newbag
  }
}


function addBagToDb(newbag) {
console.log('new bag added to db', newbag)

  return {
    type:"ADD_BAG_TO_DB",
    mesg: "maybe worked",
    newbag: newbag
  }

}

export const DELETE_USER_BAG = "DELETE_USER_BAG";

export function deleteUserBag(user_bag_id, user_id) {

  console.log('need to delete bag in the db')
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:8080/collections/deleteuserbag', true);

  let del_bag_data = {
    bag_id: user_bag_id,
    user_id: user_id
  }

  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.setRequestHeader('Accept', '*/*');

  xhr.send(JSON.stringify(del_bag_data));

  xhr.onloadend = function(e) {
    if(xhr.response) {
      console.log('response from deleting bag',  JSON.parse(xhr.response) )
    }
  }

  return {
    type: DELETE_USER_BAG,
    msg: "user bag should be deleted",
    user_bag_id: user_bag_id
  }
}

export const FILTER_UNSTOCKED_ITEMS = "FILTER_UNSTOCKED_ITEMS";
export function filterUnstockedItems(checked) {
  return {
    type: FILTER_UNSTOCKED_ITEMS,
    msg: "filter all items with 0 quantity",
    checked: checked
  }
}

export const FILTER_STOCKED_ITEMS = "FILTER_STOCKED_ITEMS";
export function filterStockedItems(checked) {
  return {
    type: FILTER_STOCKED_ITEMS,
    msg: "filter all items with more than 0 quantity",
    checked: checked
  }
}

export const FILTER_COLLECTIONS = "FILTER_COLLECTIONS";
export function filterCollections(collection, dofilter) {
  return {
    type: FILTER_COLLECTIONS,
    msg: "start filtering by collection",
    checked: dofilter,
    collection_id: collection
  }
}
