// container for homepage of app
import React, { Component } from 'react'
 //import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// can't get this to work but haven had probs yet
//import { withRouter } from 'react-router-dom'
import VisibleItemList from './visibleItemList.js'

import {selectItemClass} from '../actions/actions'

class Home extends Component {

  render() {
    console.log('this in home = ', this)
  let baggies = this.props.collections.bags || [];

  let itemclass = this.props.selectedItemClass;

    return (
      <div className="homeDiv" >
        <h1>Inventory</h1>
        <select onChange={(val) => {

              console.log('need to dispach change of bag ', val.target.value)
              let newClass = 'all'
              if(val.target.value !== 'all') {
                  newClass = this.props.collections.bags.find((d) => {

                    console.log(d, val.target.value)
                    return d.up_id == val.target.value
                  }).up_id
              }


              console.log('change selectedItemClass to ', newClass)

              this.props.dispatch(selectItemClass(newClass))
          }}>
          {baggies.map((bag, i) => {
            console.log(i)
            return (<option key={i} value={bag.up_id || 'all'} selected={ (itemclass === bag.name )}>{bag.name}</option>)
          })}



        </select>
        <VisibleItemList>
        </VisibleItemList>
      </div>
    )
  }
}


function mapStateToProps(state) {

  const { selectedItemClass, itemsByType, collections} = state
//  console.log(itemsByType)
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
  lastUpdated,
  collections
}
}

Home = connect(mapStateToProps)(Home)
export default Home;
