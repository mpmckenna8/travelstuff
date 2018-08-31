// reducer for the selected clientclass
import {SELECT_ITEM_CLASS} from  '../actions/actions'
import { RECIEVE_BAGS} from '../actions/collectionactions'


function selectedItemClass(state={onCollection:'all',
  filters:{
    instock:true,
    outofstock:true,
    bags:[],
    all:true,
    categories:[],
    visible: false
}}, action) {
  switch (action.type) {
    case RECIEVE_BAGS:
      console.log('recieved bags need to set up the collections filter', action);
      return Object.assign({}, state);
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
        state.filters.bags = state.filters.bags.filter( (d) =>   d.toString() !== action.collection_id.toString())
      }
      return Object.assign({}, state)
    case "DELETE_USER_BAG":
      console.log('state in selectedItemClass during DELETE_USER_BAG,',state)


      return Object.assign({},state)

    case "TOGGLE_FILTER_DISPLAY":

      state.filters.visible = !state.filters.visible;
      return Object.assign({}, state);

      case "FILTER_CATEGORY":
        let category = action.category;
        let active = action.active;
        if( action.active ) {
          if( !state.filters.categories.includes(category) ) {
            state.filters.categories.push(category);
          }
        }
        else {
            state.filters.categories = state.filters.categories.filter( (d) => category !== d)
        }
        return Object.assign({},state);

      case "RECIEVE_ITEMS":
          console.log('need to make some categories in the filter', action);
          let categories =[];

          // also get all the bags
          state.filters.bags = action.userPacks.map( (d) => d.up_id);
          state.filters.bags.push('all');


          action.items.forEach( (x) => {
            if(!categories.includes(x.category)) {
              categories.push(x.category)
            }
          })
        state.filters.categories = categories;

        return Object.assign({}, state);
    default:
      return state;
  }
}


export default selectedItemClass;
