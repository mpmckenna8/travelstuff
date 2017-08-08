import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import React from 'react'
import { render } from 'react-dom'
import { selectItemClass, fetchItems } from './actions/actions.js'
import { setUser } from './actions/useracts.js'
import rootReducer from './reducers'
import Root from './components/root'


//console.log(process.env.NODE_ENV)

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);

store.dispatch(selectItemClass('all'))
store
  .dispatch(fetchItems('all'))
  .then(() => console.log(store.getState()))

store.dispatch(setUser('beebop'))

render(
  <Root store={store} />,
  document.getElementById('root')
)


/*
// can use to test reducer, below does an example get all items call

store.dispatch(selectItemClass('all'))
store
  .dispatch(fetchItems('all'))
  .then(() => console.log(store.getState()))
*/
