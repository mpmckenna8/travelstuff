// container for homepage of app
import React, { Component } from 'react'
 //import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect, withRouter } from 'react-router-dom';

// can't get this to work but haven had probs yet
//import { withRouter } from 'react-router-dom'
import VisibleItemList from './visibleItemList.js'
import Inventory_Filter from './inventory_filter.js'

import {selectItemClass} from '../actions/actions'
import {setReturnHome} from '../actions/useracts'

import history from '../history';


class Home extends Component {
  bagRedirect(bagID) {
    let bagLink = '/userbag/' + bagID;
    return (
       <Redirect push to={bagLink} />
    )

  }
  componentWillUnmount() {
  //  this.props.dispatch(selectItemClass('all'))
  }
  componentDidMount() {
     this.props.dispatch(selectItemClass('all'))
     this.props.dispatch(setReturnHome(false))
  }
  render() {
  //  console.log('this in home = ', this)
  let baggies = this.props.collections.bags || [];

  let itemclass = this.props.selectedItemClass.onCollection;

  let editLink = "/newitem"
  let navBag = false

  let bagLink = '/userbag/' ;


  return (

      <div className="homeDiv" >
        <h1>Inventory</h1>
        <Inventory_Filter />

        <span> <Link to={editLink}>add items</Link></span>
        <VisibleItemList>
        </VisibleItemList>
        <span> <Link to={editLink}>add items</Link></span>

      </div>
    )
  }
}


function mapStateToProps(state) {

  const { selectedItemClass, user_items, collections} = state
//  console.log(itemsByType)
  const isFetching = false;
  let {items, lastUpdated} = user_items
  return {
  selectedItemClass,
  items,
  isFetching,
  lastUpdated,
  collections}
}

Home = withRouter(connect(mapStateToProps)(Home))
export default Home;
