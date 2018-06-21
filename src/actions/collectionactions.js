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
    //{
      //type: RECIEVE_BAGS,

    //}
  }

  //return {"name":'a bag name will end up here'};

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

  addUserBagToDb(newBag, userName);

  return {
    type:"ADD_NEW_USER_BAG",
    newBag: newBag
  }

}


function addUserBagToDb(newBag, userName) {
  let data = {
    bagInfo: newBag,
    userName
  }
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:8080/userbag/add', true);

  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  xhr.setRequestHeader('Accept', '*/*');

  xhr.send(JSON.stringify(data));

  console.log('tried to add to db, , ', newBag, userName)

  xhr.onloadend = function(res) {
    console.log('sent newbag and got response,', res)
  }

}

function addBagToDb(newbag) {

/* weird comments because of the headers
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:8080/collections/add', true);

  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

//  newbag.description = 'a bag';
  //newbag.weight_capacity = 20.0;
  // send the collected data as JSON
  xhr.send(JSON.stringify(newbag));

  xhr.onloadend = function (res) {
    // done
    console.log('sent it of to db and got a res')
    console.log(res)


  };

*/
console.log('new bag added to db', newbag)


  return {
    type:"ADD_BAG_TO_DB",
    mesg: "maybe worked",
    newbag: newbag
  }

}
