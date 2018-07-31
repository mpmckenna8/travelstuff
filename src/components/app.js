import React from 'react'

import {
  BrowserRouter,
  Route,
//  Link,
  Switch,
//  Redirect
} from 'react-router-dom'

import Home from '../containers/home'
import AddItem from '../containers/additem'
import SingleItem from '../containers/singleitem'
import Footer from './footer'
import HeaderLinks from './headerlinks.js'
import Collections from '../containers/collections'
import NewBag from '../containers/newBag'
import AddExistingItem from '../containers/addExistingItem';
import AddExistingBag from '../containers/addExistingBag'
import UserBag from '../containers/userbag';
import history from '../history';


const App = ({params}) => {
  return (
    <BrowserRouter history={history} forceRefresh={true}>
      <div id="main">
        <HeaderLinks></HeaderLinks>
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/home" component={Home}/>

      <Route path="/addexistingitem/:idnum" component={AddExistingItem}/>
      <Route path="/addexistingbag/:idnum" component={AddExistingBag}/>
      <Route path="/newitem" component={AddItem}/>
      <Route from="/collections" component={Collections}/>
      <Route path="/newbag" component={NewBag}/>
      <Route path="/item/:idnum" component={SingleItem}/>
      <Route path="/userbag/:idnum" component={UserBag}/>
      <Route component={NoMatch}/>
    </Switch>
    <Footer />
    </div>
  </BrowserRouter>
  )
}

//const WillMatch = () => <h3>Matched!</h3>

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)


export default App
