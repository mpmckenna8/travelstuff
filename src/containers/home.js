// container for homepage of app
import React, { Component } from 'react'
 //import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

// can't get this to work but haven had probs yet
//import { withRouter } from 'react-router-dom'
import VisibleItemList from './visibleItemList.js'

import {selectItemClass} from '../actions/actions'

class Home extends Component {

  render() {
  //  console.log('this in home = ', this)
  let baggies = this.props.collections.bags || [];

  let itemclass = this.props.selectedItemClass;

  let editLink = "/newitem"

  if( itemclass !== 'all' ) {
    editLink = '/userbag/' + itemclass;
  }

  return (
      <div className="homeDiv" >
        <h1>Inventory</h1>

        <select defaultValue={itemclass}   onChange={(val) => {
        //      console.log('need to dispach change of bag ', val.target.value)
              let classID = 'all';
              if(val.target.value !== 'all') {
                
                  let onBag  = this.props.collections.bags.find((d) => {
                    console.log(d, val.target.value)
                    return parseInt(d.up_id, 10) === parseInt(val.target.value,0)
                  })
                  
                  if(onBag) {
                    
                    classID = onBag.up_id
                  }
              }

          //    console.log('change selectedItemClass to ', newClass)

              this.props.dispatch(selectItemClass(classID))
          }}>
          <option value="all" >All</option>
          {baggies.map((bag, i) => {
          //  console.log(i)
            return (<option key={i} value={bag.up_id || 'all'} >
                        {bag.name}</option>)
          })}

        </select>

        <span> <Link to={editLink}>add items</Link></span>
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
