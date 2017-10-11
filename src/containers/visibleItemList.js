import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {editItemQuantity} from '../actions/actions'
import categorizeItems from '../helpers/categorize.js'

// visible itemlist to go here interacting with reducer
class VisibleItemList  extends Component  {
  componentDidMount() {
  //const {selectedItemClass } = this.props
  //  console.log('mounted visible item list, thisprops = ', this.props);

  }

  incrementItemQuantity(item) {

    console.log('increment item quant', this.props)
    item.quantity = item.quantity + 1;

    let currentCollection = this.props.selectedItemClass;

    this.props.dispatch(editItemQuantity(item, this.props.selectedItemClass, this.props.user.name))




  }

  decrementItemQuantity(item) {
    console.log('dec item quant', item);

    item.quantity = item.quantity - 1;

    let currentCollection = this.props.selectedItemClass;

    this.props.dispatch(editItemQuantity(item, this.props.selectedItemClass, this.props.user.name))


  }

  render() {
    console.log('rerendering maybe list changed', this)
    let itemarray = (this.props.selectedItemClass === 'all') ? this.props.itemsByType[this.props.selectedItemClass] : this.props.collections.bags.find( (d) => d.up_id === parseInt(this.props.selectedItemClass ) )
    console.log(itemarray);
    var itemCats = {};
  //  console.log('really itemarray', itemarray);
    if(itemarray.items) {
      itemCats = categorizeItems(itemarray.items)
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
                  return (
                    <div key={i} className="itemdiv">
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
