// reducer main file

import { combineReducers } from 'redux'


import { INVALIDATE_ITEM_CLASS, REQUEST_ITEMS, RECIEVE_ITEMS,
  ADD_ITEM, EDIT_ITEM} from '../actions/actions'

import { ADD_ITEM_CLASS, RECIEVE_BAGS} from '../actions/collectionactions'

import user from './user_reducer.js'
import selectedItemClass from './selected_item_class_reducer.js'


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

// should delete the items from this maybe
function user_items(state={ items:[], lastUpdated: 0, isFetching: false }, action) {
  switch (action.type) {
    case RECIEVE_ITEMS:
      console.log('action in recieve items user_items,', action);
      state.items = action.items;
      state.isFetching = false;
      state.lastUpdated = Date.now()

      return Object.assign({}, state)
    case REQUEST_ITEMS:
  //    console.log('request items',state)
      return Object.assign({}, state, {
        [action.itemClass]: items(state[action.itemClass], action)

      })
    case ADD_ITEM:{
  //    console.log('state in ADD_ITEM user_items ,', state)
      let newIt = {name:action.item.name,
                    description:action.item.description,
                    category:action.item.category,
                    quantity:action.item.quantity,
                    p_id: tempPid};

      let tempstate = state;
      tempstate['all'].items.push(newIt);

      tempPid = tempPid + 1;
      return Object.assign({}, tempstate)
    }
    case "ADD_ITEM_RESPONSE":{
  //    console.log('in Add_ITEM_RESPONSE, item id', action);
      let itemname = action.item.name;
      let tempstate = state;
      let allitems = tempstate.user_items.items;

      let itemIndex = allitems.findIndex((d) => {
        return d.name = itemname
    })


    //console.log('item index = ', itemIndex)
      tempstate.user_items.items[itemIndex].p_id = action.itemID.data.item_id;

      return Object.assign({}, tempstate)
    }
    case EDIT_ITEM:{
      console.log('need to editItem with action = ', action)
        console.log('state in Edit_ITEM, ', state)
        let tempstate = state;
/*
        console.log(tempstate.collections)
    //    let bagIndex = tempstate.collections.bags.findIndex(function(d) {
          console.log('find the bag index', d, action.currentCollection)
          return d.up_id == action.currentCollection;
        })
        console.log('bag item index is, ', bagIndex)

      //  let edItemIndex = tempstate.collections.bags[bagIndex].items.findIndex( (d) => {
    //      return d.p_id === action.newItem.p_id;
      //  })
      //  console.log('still need to update in the db')
      //  edItem.description = action.newItem.description;
    //    tempstate.collections.bags[bagIndex].items[edItemIndex] = action.newItem;
      //  console.log(edItem);
      return Object.assign({}, tempstate);
      */
    }

    case "ADD_EXISTING_ITEM": {
      console.log('need to update this state for this existing item, dont want 2 but do want to add to specify collection if selected', state)
      state.all.items.push(action.newItem);

      return Object.assign({},state);
    }
    default:
      return state;

  }
}


function collections(state={
    bags:[],
    allBags:[],
    locations:[],
    needsUpdate:true},
  action) {
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
      case "DELETE_USER_BAG":
             let tempstate = state;
             let bagInd = tempstate.bags.findIndex(function(d) {
               return d.up_id.toString() === action.user_bag_id
             })
             console.log('need to delet bag in array at position: ', bagInd)
             tempstate.bags.splice(bagInd, 1)

             return Object.assign({},tempstate)

      case ADD_ITEM_CLASS:
        state.bags.push(action['itemClass']);
        state.allBags.push(action['itemClass']);
        return Object.assign({}, state)
      case 'ADD_ITEM_TO_PACK':
          let tempState = state;
          let temItem = Object.assign({}, action.item);
          temItem['quantity'] = 1;
//          console.log('tempState in add item to pack')
//          console.log('item trying to add', temItem, 'itemclass = ', action.itemClass)
          let bagsArray = tempState.bags;
          let bagIndex = bagsArray.findIndex(function(d) {
            return d.up_id.toString() == action.itemClass
          })
    //      console.log('bagsArray = ', bagsArray)
      //    console.log('bags Index', bagIndex)
          tempState.bags[bagIndex].items.push(temItem);
          return Object.assign({}, tempState)

      case RECIEVE_BAGS:
        console.log('recived some bags, ', action.bags)
        let combBags = []
        if (action.bags){
          combBags = state.allBags.concat(action.bags.data);
        }

        // maybe should check for duplicate bags
        state.allBags = combBags;
        //  console.log('newbags', combBags)
        return Object.assign({}, state);
      case RECIEVE_ITEMS:
        //let userpacksnamed = action.userPacks.map(function(d) {
      //     d.name = d.name;
        //   return d;
        //})
        let userPacks =  {};
        for( let i in action.userPacks) {
        //  console.log('pack to set up', i);
          let userpack = action.userPacks[i];
    //      console.log('userpacks')
          for( let q in userpack.items) {
            let o = userpack.items[q]
            let bagitem = Object.assign({}, action.items.find(function(d) {
  //            console.log('setting up bag', o[0], d.p_id)
              return d.p_id === o[0];
            }) )

          bagitem.quantity = o[1];
  //      console.log('itemin pack', bagitem);
          userpack.items[q] = bagitem
        }
          userPacks[action.userPacks[i].up_id] = userpack;
        }
        console.log('userpacks after update', userPacks)
        console.log( 'state in collections after new items', state, ', action = ', action )
        state.bags = state.bags.concat(action.userPacks)

        return Object.assign({}, state);

      case "EDIT_ITEM":
        let currentItems = [];
        console.log('dont know if editing items really works')
        if(action.currentCollection !== 'all') {
      //    console.log(action)
        //  itemIndex = state.bags.find((d) => d.up_id === action.currentCollection)
        let tempstate = state;

        let bagIndex = tempstate.bags.findIndex(function(d) {
          console.log('find the bag index', d, action.currentCollection)
          return d.up_id == action.currentCollection;
        })

        console.log('bag item index is, ', bagIndex)

          currentItems = state.bags.find( (d) => {
            return d.up_id.toString() === action.currentCollection });
          console.log('current items in bag edit, ', currentItems)
        }
        console.log('newstate is, ', state.bags)

        return Object.assign({}, state)
      case "ADD_BAG_TO_DB":
        console.log('need to add the bag to the list of stuff too', action);
        return state;
      case "ADDED_BAG_TO_DB":
        console.log('need to update the bag id', action)
        let mobags = state.allBags.concat([action.newbag.data]);
        state.allBags = mobags;
        let myBagger = state.bags.concat([action.newbag.data]);
        console.log('current bag', action.newbag.data);
        state.bags = myBagger;
        return Object.assign({}, state)
        //curbag.coll_id = action.data.coll_id
      default:
        return state;
    }
}



const rootReducer = combineReducers({
  user_items,
  selectedItemClass,
  user,
  collections
})

export default rootReducer;
