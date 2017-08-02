import { combineReducers } from 'redux'
import packingItems from './packingitems'
import visibilityFilter from './visibilityFilter'
import user from "./userRed"
import selectedItems from "./selectedItems"



const PackingApp = combineReducers({
  packingItems,
  visibilityFilter,
  user,
  selectedItems
})

export default PackingApp
