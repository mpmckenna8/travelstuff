import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

import { selectItemClass, fetchItems } from './actions/actions.js'
import rootReducer from './reducers'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)


store.dispatch(selectItemClass('all'))
store
  .dispatch(fetchItems('all'))
  .then(() => console.log(store.getState()))
