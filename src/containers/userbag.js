
import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

import {selectItemClass, editItemQuantity, addItemToPack} from '../actions/actions'

class UserBag extends Component {
  itemsNotInBag() {

      let itemsList = []
      if(this.props.itemsByType.all) {
        itemsList = this.props.itemsByType.all.items;
        console.log('itemlister, ', itemsList)
        console.log('bagitems , ', this.props.collections.bags.find((d) => {
          return (d.up_id == this.props.selectedItemClass)
        }) )

        if ( this.props.collections.bags.find((d) => {
          return (d.up_id == this.props.selectedItemClass)
        }) ) {

          let itemBag = this.props.collections.bags.find((d) => {
            return (d.up_id == this.props.selectedItemClass)
          }).items;

          console.log('itemlister later, ', itemsList)

          itemsList = itemsList.filter( function(d) {
          console.log('index of item, ', ( itemBag.findIndex( (q) => q.p_id === d.p_id ) ))
            return !( itemBag.findIndex( (q) => q.p_id === d.p_id ) >= 0 )
          })
        }
      }

      let finalList = [];

      for( let o of itemsList ) {
        finalList.push( Object.assign({}, o))
      }
    return finalList;
  }
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
    let currentBag = {name:'none yet', description:'none found'}
    console.log('items not yet in bag, ', this.props);

    let bagId = 0;

    if(this.props.match.params.idnum) {
      bagId = this.props.match.params.idnum;
      this.props.dispatch(selectItemClass(bagId))
    }

  //  console.log('this thing', bagId, this.props.collections.bags.find((d) => { return d.up_id === parseInt(bagId); }))

    currentBag = this.props.collections.bags.find((d) => {
      return d.up_id === parseInt(bagId)
    }) || currentBag

    console.log('current baggie', currentBag);

    let availableItems = Object.assign([], this.props.itemsByType.all.items.map((d) => {
      let item = d;
    //  console.log( 'item = ', item)
    //  let onbagID = this.props.match
      let subquant = {}
      return item;
    })
  )

    let addableItems = this.itemsNotInBag();

    console.log('available items for this bag', addableItems)
    availableItems = categorizeItems(addableItems);
    let catArray = Object.keys(availableItems).sort();

    return (
      <div>
        <h3>{currentBag.description}</h3>
        Show the bag and potential items from all of user inventory
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
