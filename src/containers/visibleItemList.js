import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {editItemQuantity} from '../actions/actions'

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
//    console.log('rerendering maybe list changed')
    let itemarray = this.props.itemsByType[this.props.selectedItemClass]
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


// takes our array of items and returns an object with each key being a category
// and the value being an array of items in that category
function categorizeItems(itemarray) {
  var itemCats = {};

  for ( let o of itemarray ) {
  //  console.log(o.category === null)
    if(itemCats[o.category]) {
        itemCats[o.category].push(o)
    }
    else {
      if(o.category === null) {
          if(itemCats['other']){
            itemCats['other'].push(o)
          }
          else itemCats['other'] = [o];
      }
      else{
        if(o.category === 'comestable') {
          if(itemCats['comestables']){
            itemCats['comestables'].push(o)
          }
          else{
            itemCats['comestables'] = [o]
          }

        }
        else itemCats[o.category] = [o];
      }
    }
  }
  return itemCats;

}
//    {itemarray.map(item => (
//      <p>item.name</p>
//    ))}
