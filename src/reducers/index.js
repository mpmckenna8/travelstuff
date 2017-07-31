import { combineReducers } from 'redux'
import packingItems from './packingitems'
import visibilityFilter from './visibilityFilter'
import user from "./userRed"



const PackingApp = combineReducers({
  packingItems,
  visibilityFilter,
  user
})

export default PackingApp
