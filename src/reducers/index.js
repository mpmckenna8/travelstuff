// reducer main file

import { combineReducers } from 'redux'


import {SELECT_ITEM_CLASS, INVALIDATE_ITEM_CLASS, REQUEST_ITEMS, RECIEVE_ITEMS,
  ADD_ITEM, EDIT_ITEM } from '../actions/actions'

import {SET_USER} from '../actions/useracts.js'
import { ADD_ITEM_CLASS, RECIEVE_BAGS} from '../actions/collectionactions'

function selectedItemClass(state='all', action) {
  switch (action.type) {
    case SELECT_ITEM_CLASS:
      return action.itemClass
    default:
      return state;
  }
}


function items(
  state={
    isFetching: false,
    didInvalidate:false,
    items:[]
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_ITEM_CLASS:
      return Object.assign({}, state, {didInvalidate:true})
    case REQUEST_ITEMS:
      return Object.assign({}, state, {
        isFetching:true,
        didInvalidate:false
      })
    case RECIEVE_ITEMS:
      return Object.assign({}, state, {
        isFetching:false,
        didInvalidate:false,
        items: action.items,
        user: action.user,
        lastUpdatedAt: action.recievedAt
      })
    case ADD_ITEM:
    // want to actually add the item to the db in the action not here
      console.log('add item act', action)
      console.log('addit state, ', state)
      return Object.assign({}, state, {
        isFetching:false,
        didInvalidate:false,
        items: [...state.items, {name: action.item} ],
        lastUpdatedAt: action.recievedAt
      })
    default:
      return state;

  }
}



function itemsByType(state={}, action) {
  switch (action.type) {
    case INVALIDATE_ITEM_CLASS:
    case RECIEVE_ITEMS:
      console.log('recieved items in itemsByType')
      return Object.assign({}, state, {
        [action.itemClass]: items(state[action.itemClass], action)
      })
    case REQUEST_ITEMS:
      console.log('request items',state)
      return Object.assign({}, state, {
        [action.itemClass]: items(state[action.itemClass], action)

      })
    case ADD_ITEM:{
      console.log('state in ADD_ITEM itemsByType ,', state)
  //    console.log('action in additem, ', action)
      let newIt = {name:action.item.name,
                    description:action.item.description,
                    category:action.item.category};

      let newArr = state.itemClass;
      console.log(newArr)
      let tempstate = state;
      tempstate[action.itemClass].items.push(newIt);


      return Object.assign({}, tempstate)
    }
    case EDIT_ITEM:{
      console.log('need to editItem with action = ', action)
        console.log('state in here, ', state)
        let edItem = state[action.currentCollection].items.find((d) => {
          return d.p_id === action.newItem.p_id;

        })

        console.log('still need to update in the db')
        edItem.description = action.newItem.description;

      //  console.log(edItem);
      return state;
    }
    default:
      return state;

  }
}

function user(state={name:"test", id: 1}, action) {

  switch(action.type) {
    case SET_USER:{
      console.log('setting new user maybe', state, action)
      state.name = action.name;
      return Object.assign({}, state)
    }
    default:
      return state;
  }
}


function collections(state={bags:[{name:'all'}], locations:[], needsUpdate:true}, action) {
  switch(action.type) {
    case ADD_ITEM_CLASS:
      state.bags.push(action['itemClass'])
      return Object.assign({}, state)

    case RECIEVE_BAGS:
      let combBags = state.bags.concat(action.bags.data);
      // maybe should check for duplicate bags
      state.bags = combBags;
      console.log('newbags', combBags)
      return Object.assign({}, state)

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  itemsByType,
  selectedItemClass,
  user,
  collections
})

export default rootReducer;
