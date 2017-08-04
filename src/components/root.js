import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

import App from './app'
/*
<Router>
  <Switch>
  <Route path="/" exact component={Home}/>
  </Switch>
</Router>
*/

const Root = ({ store }) => (


  <Provider store={store}>
    <App />
  </Provider>

)

Root.propTypes = {
  store: PropTypes.object.isRequired
}


export default Root
