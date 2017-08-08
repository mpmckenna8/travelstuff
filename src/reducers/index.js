// reducer main file

import { combineReducers } from 'redux'

import {SELECT_ITEM_CLASS, INVALIDATE_ITEM_CLASS, REQUEST_ITEMS, RECIEVE_ITEMS,
  ADD_ITEM, ADD_ITEM_CLASS} from '../actions/actions'
import {SET_USER} from '../actions/useracts.js'

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
        lastUpdatedAt: action.recievedAt
      })
    case ADD_ITEM:
    // want to actually add the item to the db in the action not here
      console.log('addit act', action)
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
      console.log('state in itemsByType ,', state)
  //    console.log('action in additem, ', action)

      let newIt = {name:action.item.name,
                    description:action.item.description};

      let newArr = state.itemClass;
      console.log(newArr)
      let tempstate = state;
      tempstate[action.itemClass].items.push(newIt)

      return Object.assign({}, state)
    }
    default:
      return state;

  }
}

function user(state={name:"test"}, action) {

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


function collections(state={bags:[{name:'all'}], locations:[]}, action) {
  switch(action.type) {
    case ADD_ITEM_CLASS:
      state.bags.push(action['itemClass'])
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
