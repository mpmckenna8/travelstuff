// reducer main file

import { combineReducers } from 'redux'


import {SELECT_ITEM_CLASS, INVALIDATE_ITEM_CLASS, REQUEST_ITEMS, RECIEVE_ITEMS,
  ADD_ITEM, EDIT_ITEM, ADD_EXISTING_ITEM} from '../actions/actions'

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

  //  console.log('recieved items in reducer', action.items)
      return Object.assign({}, state, {
        isFetching:false,
        didInvalidate:false,
        items: action.items,
        user: action.user,
        lastUpdatedAt: action.recievedAt
      })
    case ADD_ITEM:
    // want to actually add the item to the db in the action not here
  //    console.log('add item act', action)
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

let tempPid = 1000000;


function itemsByType(state={}, action) {
  switch (action.type) {
    case INVALIDATE_ITEM_CLASS:
    case RECIEVE_ITEMS:
//      console.log('recieved items in itemsByType')

//      console.log('action in recieve items itemsByType,', action);
      let userPacks =  {};

      for( let i in action.userPacks) {
      //  console.log('pack to set up', i);
        let userpack = action.userPacks[i];

        for( let q in userpack.items) {
          let o = userpack.items[q]
          let bagitem = Object.assign({},action.items.find(function(d) {
    //        console.log('setting up bag', o[0], d.p_id)
            return d.p_id === o[0];
          }) )

        bagitem.quantity = o[1];
  //      console.log('itemin pack', bagitem);
        userpack.items[q] = bagitem

      }
        userPacks[action.userPacks[i].up_id] = userpack;
      }

      console.log('itemclass aray thing, ', {[action.itemClass]: "blah"})

      return Object.assign({}, state, {
        [action.itemClass]: items(state[action.itemClass], action)
      }, userPacks)
    case REQUEST_ITEMS:
  //    console.log('request items',state)
      return Object.assign({}, state, {
        [action.itemClass]: items(state[action.itemClass], action)

      })
    case ADD_ITEM:{
      console.log('state in ADD_ITEM itemsByType ,', state)
  //    console.log('action in additem, ', action)
      let newIt = {name:action.item.name,
                    description:action.item.description,
                    category:action.item.category,
                    quantity:action.item.quantity,
                    p_id: tempPid};

      let newArr = state.itemClass;
      console.log(newArr)
      let tempstate = state;
      tempstate[action.itemClass].items.push(newIt);

      tempPid = tempPid + 1;


      return Object.assign({}, tempstate)
    }
    case EDIT_ITEM:{
      console.log('need to editItem with action = ', action)
        console.log('state in here, ', state)
        let tempstate = state;
        let edItem = tempstate[action.currentCollection].items.findIndex((d) => {
          return d.p_id === action.newItem.p_id;
        })

      //  console.log('still need to update in the db')
      //  edItem.description = action.newItem.description;
        tempstate[action.currentCollection].items[edItem] = action.newItem

      //  console.log(edItem);
      return Object.assign({}, tempstate);
    }
    case "ADD_EXISTING_ITEM": {
      console.log('need to update this state for this existing item, dont want 2 but do want to add to specify collection if selected', state)

      state.all.items.push(action.newItem);

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


function collections(state={bags:[{name:'all'}], allBags:[], locations:[], needsUpdate:true}, action) {
  switch(action.type) {
    case 'ADD_NEW_USER_BAG':
      let newUserBag = {
        packtype: action.newBag.coll_id,
        items:[],
        name: action.newBag.userDescription,
        up_id:null
      }
       state.bags.push(newUserBag)
       return Object.assign({}, state)
    case ADD_ITEM_CLASS:
      state.bags.push(action['itemClass'])
      return Object.assign({}, state)

    case RECIEVE_BAGS:

      console.log('recived some bags, ', action.bags)

      let combBags = state.allBags.concat(action.bags.data);
      // maybe should check for duplicate bags
      state.allBags = combBags;
    //  console.log('newbags', combBags)
      return Object.assign({}, state);

    case "RECIEVE_USER_BAGS":
      console.log('recieved user bags')
      return state;
    case RECIEVE_ITEMS:
      let userpacksnamed = action.userPacks.map(function(d) {
         d.name = d.description;
         return d;
      })

      console.log(userpacksnamed, 'state in collections after new items')
      state.bags = state.bags.concat(userpacksnamed)

      //console.log()


      return Object.assign({}, state);

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
