// A bunch of filters for the itemlist.

// container for homepage of app
import React, { Component } from 'react'
 //import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {selectItemClass} from '../actions/actions';
import {filterUnstockedItems, filterStockedItems, filterCollections, filterByCategories} from '../actions/collectionactions'

class Inventory_Filter extends Component {
  filterCollection(e) {
    console.log(e.value)
    let collection_id = e.target
    console.log('need to filter collection by', collection_id.value);
    console.log('is it checked', collection_id.checked)
    this.props.dispatch(filterCollections(collection_id.value, collection_id.checked))


  }
  filterByCategory(e, disp) {
  //  console.log('need to make and fire a category filter', e.target, 'this = ', this)

    var changed_category = e.target.value;
    var active_category = e.target.checked;
    disp(filterByCategories({category: changed_category,
                            active:active_category}))
  }
  filterStock(e) {
    this.props.dispatch(filterStockedItems(e.checked))
  }
  filterUnstocked(e) {
    console.log('checkbox val ', e.checked)
    this.props.dispatch(filterUnstockedItems(e.checked))
  }

  category_Array() {

    let itemlist = this.props.user_items.items;
    let itemCategories = [];
    for(let u of itemlist) {
      if( itemCategories.every( (d) => { return d !== u.category })) {
        itemCategories.push(u.category)
      }
    }
//    console.log('the item categories are. ', itemCategories);
    return itemCategories;
  }
  render() {
    let baggies = this.props.collections.bags || [];
    let categories = this.category_Array();
    let cat_filter = this.filterByCategory;
    let disp = this.props.dispatch;

    return (
      <div>
        A bunch of stuff to filter the items.
        <div id="bagFilters">
          <h4>Bag</h4>
          <span>
          <label>
            All
          <input
            type="checkbox"
            defaultChecked='false'
            value='all'
            onChange={e => this.filterCollection(e)} >
          </input>
          </label>

          </span>

          <br />
          {
            baggies.map((bag, i) => {
          //    console.log(bag)
              let bagname = bag.name;
              return (
                <span key={"bagfilter" + bagname}>
                <label>
                  {bagname}
                  <input
                    type="checkbox"
                //    defaultChecked='false'
                    value={bag.up_id || 'all'}
                    onChange={(e) => this.filterCollection(e)} >
                  </input>
                </label>
                <br />
                </span>
                )
          })}
        </div>


        <div>
          <h4>Quantities</h4>
          <label>In Stock
            <input
              type="checkbox"
              defaultChecked='true'
              value='notZeroed'
              onChange={e => this.filterStock(e.target)} />
          </label>
            <br />
          <label>Out of Stock
            <input
              type="checkbox"
              defaultChecked='true'
              value='zeroed'
              onChange={e => this.filterUnstocked(e.target)} />
            </label>

          </div>

          <div>
            <h4>Category</h4>
              {
                categories.map(function(d) {
                return (
                  <span key={"blah"+d}>
                  <label>{d}</label>
                  <input  type="checkbox"
                          defaultChecked="true"
                          value={d}
                          onChange={ e => cat_filter(e, disp) } />
                  <br />
                  </span>  )
              })
            }
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}


Inventory_Filter = connect(mapStateToProps)(Inventory_Filter)
export default Inventory_Filter;
