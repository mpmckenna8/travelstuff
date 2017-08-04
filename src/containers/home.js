// container for homepage of app
import React, { Component } from 'react'
 //import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// can't get this to work but haven had probs yet
//import { withRouter } from 'react-router-dom'
import VisibleItemList from './visibleItemList.js'

class Home extends Component {

  render() {
    console.log('this = ', this)


    return (
      <div>
      <h1>homepage</h1>
      <VisibleItemList>
      </VisibleItemList>

      </div>
    )
  }
}


function mapStateToProps(state) {

  const { selectedItemClass, itemsByType} = state
  console.log(itemsByType)
  const {
    isFetching,
    lastUpdated,
    items
  } = itemsByType[selectedItemClass] || {
    isFetching: true,
    items: []
  }

  return {
  selectedItemClass,
  items,
  isFetching,
  lastUpdated
}
}

Home = connect(mapStateToProps)(Home)
export default Home;
