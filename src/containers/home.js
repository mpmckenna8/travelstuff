// container for homepage of app
import React, { Component } from 'react'
 //import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect, withRouter } from 'react-router-dom';

// can't get this to work but haven had probs yet
//import { withRouter } from 'react-router-dom'
import VisibleItemList from './visibleItemList.js'

import {selectItemClass} from '../actions/actions'
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
  }
  render() {
  //  console.log('this in home = ', this)
  let baggies = this.props.collections.bags || [];

  let itemclass = this.props.selectedItemClass;

  let editLink = "/newitem"
  let navBag = false

  let bagLink = '/userbag/' ;


  return (

      <div className="homeDiv" >
        <h1>Inventory</h1>
        <select defaultValue='all'  onChange={(val) => {
              let classID = 'all';
              if(val.target.value !== 'all') {
                  let onBag  = this.props.collections.bags.find((d) => {
                    console.log(d, val.target.value)
                    return parseInt(d.up_id, 10) === parseInt(val.target.value,0)
                  })
                navBag=true;

                  if(onBag) {

                    classID = onBag.up_id
                  }
              }
          //    console.log('change selectedItemClass to ', newClass)
            this.props.dispatch(selectItemClass(classID));
            console.log('should change itemclass and load new view')
            history.push(bagLink + classID)

          }}>
          <option value="all" >All</option>
          {baggies.map((bag, i) => {
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
