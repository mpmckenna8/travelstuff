// reducer for the selected clientclass
import {SELECT_ITEM_CLASS} from  '../actions/actions'

function selectedItemClass(state={onCollection:'all', filters:{
    instock:true,
    outofstock:true,
    bags:['all'],
    all:true
}}, action) {
  switch (action.type) {
    case SELECT_ITEM_CLASS:
      state.onCollection = action.itemClass
      return Object.assign({}, state)
    case 'FILTER_UNSTOCKED_ITEMS':
      state.filters.outofstock = action.checked;
      return Object.assign({}, state)
    case "FILTER_STOCKED_ITEMS":
      state.filters.instock = action.checked;
      return Object.assign({}, state)
    case "FILTER_COLLECTIONS":
      console.log('collection to filter, ', action.collection_id)
      if(action.checked) {
        state.filters.bags.push(action.collection_id)
      }
      else {
        state.filters.bags = state.filters.bags.filter( (d) =>  d !== action.collection_id)
      }
      return Object.assign({}, state)
    case "DELETE_USER_BAG":
      console.log('state in selectedItemClass during DELETE_USER_BAG,',state)


      return state
    default:
      return state;
  }
}


export default selectedItemClass;
