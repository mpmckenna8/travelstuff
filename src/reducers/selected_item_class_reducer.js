// reducer for the selected clientclass
import {SELECT_ITEM_CLASS} from  '../actions/actions'

function selectedItemClass(state='all', action) {
  switch (action.type) {
    case SELECT_ITEM_CLASS:
      return action.itemClass
    default:
      return state;
  }
}


export default selectedItemClass;
