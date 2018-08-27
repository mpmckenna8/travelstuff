import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {editItemQuantity} from '../actions/actions'
import categorizeItems from '../helpers/categorize.js'

// visible itemlist to go here interacting with reducer
class VisibleItemList  extends Component  {
  componentDidMount() {
//    console.log('mounted visible item list, thisprops = ', this.props);
  }

  incrementItemQuantity(item) {
    console.log('increment item quant', this.props)
    item.quantity = item.quantity + 1;
    this.props.dispatch(editItemQuantity(item, this.props.selectedItemClass.onCollection, this.props.user.name))
  }

  decrementItemQuantity(item) {
  //  console.log('dec item quant', item);
    item.quantity = item.quantity - 1;
    this.props.dispatch(editItemQuantity(item, this.props.selectedItemClass.onCollection, this.props.user.name))
  }

  // will make a list of all the items applying the filters from selected_item_class_reducer
  filteredItems(itemL) {
  //  console.log('applying filters')
    let itemList = itemL
    let filters = this.props.selectedItemClass.filters;
    let tempList = []


    let bagFilterList = filters.bags;

    if(!filters.bags.includes('all')) {
      for(let bagID of bagFilterList) {
        let onFilterBag = this.props.collections.bags.find( (d) => {
          return d.up_id.toString() === bagID.toString()
        })
      //  console.log('need to get items from ,', onFilterBag)
        for(let includeItem of onFilterBag.items) {
            if( !tempList.includes( d => d.p_id === includeItem.p_id) ) {
              tempList.push( itemList.find( (d) => d.p_id.toString() === includeItem.p_id.toString()) )
            }
        }
      }
      itemList = tempList;

    }
    // apply the instock out of stock filter
    if(filters.instock && filters.outofstock === false) {
      itemList = itemList.filter( (d) => {
        return d.quantity > 0;
      })
    }
    if(filters.instock === false && filters.outofstock) {
      itemList = itemList.filter( (d) => {
        return d.quantity <= 0;
      })
    }
    if(filters.instock === false && filters.outofstock === false) {
      itemList = []
    }
    //console.log('filtered items are, but still need to filter categories', itemList, filters.categories)


    if( filters.categories.length > 0 && itemList ) {
      itemList = itemList.filter( (d) => {

      //  console.log('filtering items by category', d, filters.categories.includes(d.category)
      //)

        return filters.categories.includes(d.category)
      })
    }
    else {
      itemList = []
    }

    return itemList

  }

  render() {
    // console.log(this.props.itemsByType look wrongly assigned)
    let itemarray = this.props.user_items.items;
    let onClass = this.props.selectedItemClass.onCollection;

    if(onClass !== "all" ) {

      itemarray = this.props.collections.bags.find( function(dd) {
        //console.log('dd = ', dd)
        return (dd.up_id.toString() === onClass.toString())
      })
      if(itemarray ) {
        itemarray = itemarray.items
      }
    }

    itemarray = this.filteredItems(itemarray);
  //  console.log('itemarray = ', itemarray);
    var itemCats = {};
  //  console.log('really itemarray', itemarray);
    if(itemarray.length > 0) {

      itemCats = categorizeItems(itemarray)
    }

    let catArray = Object.keys(itemCats).sort();
    return (
      <div className="itemListDiv">
        {
          catArray.map((category, i) => {
            return (
              <div key={i} >
                <h2>
                  {category}
                </h2>
                {itemCats[category].map( (item, i )  => {
                  let haveItem = "haveItem";
                  //console.log('item = ', item)
                  if(item.quantity <= 0) {
                    haveItem = "noItem"
                  }
                  return (
                    <div key={i} className={ haveItem + " itemdiv" }>
                      <div className="itemNameDiv">
                        <Link to={"item/" + item.p_id}>{item.name}</Link>
                      </div>
                        <div className="itemQuantDiv">
                          <div>
                            <button onClick={(e) => {
                                this.decrementItemQuantity(item);
                              } }>-</button>
                          {item.quantity}
                          <button onClick={(e) => {
                              this.incrementItemQuantity(item);
                            }}>+</button>

                        </div>

                        </div>
                    </div>
                  )
                })
              }
              </div>
            )
          })
        }

      </div>

    )
  }
}


const mapStateToProps = state => {
  return state;

}

export default connect(mapStateToProps)(VisibleItemList)
