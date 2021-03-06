import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import React from 'react'
import { render } from 'react-dom'
import rootReducer from './reducers'
import Root from './components/root'

import { selectItemClass, fetchItemsIfNeeded, getEveryItem } from './actions/actions.js'
import { setUser } from './actions/useracts.js'
import { fetchBagsIfNeeded} from './actions/collectionactions.js'

//console.log(process.env.NODE_ENV)

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);


store.dispatch(setUser('test'))

store.dispatch(selectItemClass('all'));
store.dispatch(fetchItemsIfNeeded('all', 'test'))


store.dispatch(fetchBagsIfNeeded("all", 'test'))
.then((thinger) => {
    console.log('should have fetched the items', thinger)
  })

store.dispatch(getEveryItem())


render(
  <Root store={store} />,
  document.getElementById('root')
)
