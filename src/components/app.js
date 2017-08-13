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
import Footer from './footer'
import Collections from '../containers/collections'
import NewBag from '../containers/newBag'


const App = ({params}) => {
  return (
    <Router>
      <div id="main">

        <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/newitem">New Item</Link></li>
      <li><Link to="/collections">Collections</Link></li>
      <li><Link to="/newbag">New Bag</Link></li>
      <li><Link to="/also/will/not/match">Also Will Not Match</Link></li>
    </ul>
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/newitem" component={AddItem}/>
      <Route from="/collections" component={Collections}/>
      <Route path="/newbag" component={NewBag}/>
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
