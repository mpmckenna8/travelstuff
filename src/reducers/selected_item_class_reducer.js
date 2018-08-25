// reducer for the selected clientclass
import {SELECT_ITEM_CLASS} from  '../actions/actions'

function selectedItemClass(state={onCollection:'all', filters:{
    instock:true,
    outofstock:true,
    bags:['all'],
    all:true,
    categories:[]
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


      return Object.assign({},state)


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
          let categories =[]
          action.items.forEach( (x) => {
            if(!categories.includes(x.category)) {
              categories.push(x.category)
            }
          })
        state.filters.categories = categories;

        return state;
    default:
      return state;
  }
}


export default selectedItemClass;
