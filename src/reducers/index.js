// reducer main file

import { combineReducers } from 'redux'

import {SELECT_ITEM_CLASS, INVALIDATE_ITEM_CLASS, REQUEST_ITEMS, RECIEVE_ITEMS} from '../actions/actions'

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
    default:
      return state;

  }
}


function itemsByType(state={}, action) {
  switch (action.type) {
    case INVALIDATE_ITEM_CLASS:
    case RECIEVE_ITEMS:
    case REQUEST_ITEMS:
      return Object.assign({}, state, {
        [action.itemClass]: items(state[action.itemClass], action)

      })
    default:
      return state;

  }
}

const rootReducer = combineReducers({
  itemsByType,
  selectedItemClass
})

export default rootReducer;
