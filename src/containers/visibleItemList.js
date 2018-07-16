import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {editItemQuantity} from '../actions/actions'
import categorizeItems from '../helpers/categorize.js'

// visible itemlist to go here interacting with reducer
class VisibleItemList  extends Component  {
  componentDidMount() {
    console.log('mounted visible item list, thisprops = ', this.props);
  }

  incrementItemQuantity(item) {
    console.log('increment item quant', this.props)
    item.quantity = item.quantity + 1;
    this.props.dispatch(editItemQuantity(item, this.props.selectedItemClass, this.props.user.name))
  }

  decrementItemQuantity(item) {
    console.log('dec item quant', item);
    item.quantity = item.quantity - 1;
    this.props.dispatch(editItemQuantity(item, this.props.selectedItemClass, this.props.user.name))
  }

  render() {
    // console.log(this.props.itemsByType look wrongly assigned)
    console.log('rerendering maybe list changed', this.props)
    let itemarray = this.props.user_items.items;
    let onClass = this.props.selectedItemClass;

    if(this.props.selectedItemClass !== "all" ) {
      itemarray = this.props.collections.bags.find( function(dd) {
        //console.log('dd = ', dd)
        return (dd.up_id == onClass)
      }).items
    }
    console.log('itemarray = ', itemarray);
    var itemCats = {};
  //  console.log('really itemarray', itemarray);
    if(itemarray) {
      itemCats = categorizeItems(itemarray)
    }

    let catArray = Object.keys(itemCats).sort();
    console.log('item categories', catArray.sort())

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
                  console.log('item = ', item)
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
