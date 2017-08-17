import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

import Home from '../containers/home'
import AddItem from '../containers/additem'
import SingleItem from '../containers/singleitem'
import Footer from './footer'
import HeaderLinks from './headerlinks.js'
import Collections from '../containers/collections'
import NewBag from '../containers/newBag'


const App = ({params}) => {
  return (
    <Router>
      <div id="main">

        <HeaderLinks></HeaderLinks>
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/newitem" component={AddItem}/>
      <Route from="/collections" component={Collections}/>
      <Route path="/newbag" component={NewBag}/>
      <Route path="/item/:idnum" component={SingleItem}/>
      <Route component={NoMatch}/>
    </Switch>
    <Footer />
    </div>
  </Router>
  )
}



const WillMatch = () => <h3>Matched!</h3>

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)


export default App
