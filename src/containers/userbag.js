

import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

import {selectItemClass, editItemQuantity, addItemToPack} from '../actions/actions'

class UserBag extends Component {

  incrementItemQuantity(item) {

    let upItem = item;
    upItem.quantity = 1;
    console.log('need to edit up ', upItem);

    this.props.dispatch(addItemToPack(upItem, this.props.selectedItemClass, this.props.user.name))

  }
  decrementItemQuantity(item) {

    console.log('need to edit ', item);
    let upItem = item
    upItem.quantity = 1;
    this.props.dispatch(addItemToPack(upItem, this.props.selectedItemClass, this.props.user.name))

  }
  render() {
    let bagId = 0//



    if(this.props.match.params.idnum) {
      bagId = this.props.match.params.idnum

      this.props.dispatch(selectItemClass(bagId))
    }
    console.log('this thing', bagId, this.props.collections.bags.find((d) => {
      return d.up_id === parseInt(bagId)
    }))

    let currentBag = this.props.collections.bags.find((d) => {
      return d.up_id === parseInt(bagId)
    })



    let availableItems = Object.assign([], this.props.itemsByType.all.items.map((d) => {

      let item = d;

      console.log( 'item = ', item)
    //  let onbagID = this.props.match

      let subquant = {}

      try {
        subquant = currentBag.items.find( ( currentBagItem) => {
          return currentBagItem.p_id === item.p_id
        })
        item.quantity = item.quantity - subquant.quantity
      }
      catch(err) {
        item.quantity = 0;
      //  console.log('thing dont exist', err)
      }
      return item;
    })
  )

    console.log('available items for this bag', availableItems)
    availableItems = categorizeItems(availableItems);
    let catArray = Object.keys(availableItems).sort();


    return (
      <div>Show the bag and potential items from all of user inventory
        {catArray.map((category, i) => {
          return (
            <div key={i} >
              <h2>
                {category}
              </h2>
              {availableItems[category].map( (item, i )  => {

                return (
                  <div key={i} className="itemdiv">
                    <div className="itemNameDiv">
                      {item.name}
                    </div>
                      <div className="itemQuantDiv">
                        <div>
                          <button onClick={(e) => {
                              this.decrementItemQuantity(item);
                            } }>-</button>
                          0
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
        })}
      </div>)
  }

}

const mapStateToProps = state => {
  return state;
}

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


export default connect(mapStateToProps)(UserBag);
