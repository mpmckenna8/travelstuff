import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import PackingApp from './reducers'
import App from './components/App'

let store = createStore(PackingApp)


// main render function passing in the store to the Provider?
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
