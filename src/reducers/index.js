import { combineReducers } from 'redux'
import packingItems from './packingitems'
import visibilityFilter from './visibilityFilter'


const PackingApp = combineReducers({
  packingItems,
  visibilityFilter
})

export default PackingApp
