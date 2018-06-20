
import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

import categorizeItems from '../helpers/categorize.js'
import {selectItemClass, editItemQuantity, addItemToPack} from '../actions/actions'


class UserBag extends Component {
  // this function returns all items not in the current bag as in
  // selectedItemClass
  itemsNotInBag() {
      let itemsList = []
      // if we've gotten all the items initialized go!
      if(this.props.itemsByType.all) {
        itemsList = this.props.itemsByType.all.items;
        console.log('itemlister, ', itemsList)


        console.log('bagitems , ', this.props.collections.bags.find((d) => {
          return (d.up_id.toString() === this.props.selectedItemClass)
        }) )

        if ( this.props.collections.bags.find((d) => {
                return (d.up_id.toString() === this.props.selectedItemClass)
            }) )
            {

              let itemBag = this.props.collections.bags.find((d) => {
                return (d.up_id.toString() ===  this.props.selectedItemClass)
              });

              if(itemBag) {
                itemBag = itemBag.items
              };
//        console.log('itemlister later, ', itemsList)
          itemsList = itemsList.filter( function(d) {
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
    console.log('increment item quant', this.props)
    item.quantity = item.quantity + 1;
    let currentCollection = this.props.selectedItemClass;
    this.props.dispatch(editItemQuantity(item, this.props.selectedItemClass, this.props.user.name))

  }
  decrementItemQuantity(item) {

        item.quantity = item.quantity - 1;

        let currentCollection = this.props.selectedItemClass;

        this.props.dispatch(editItemQuantity(item, this.props.selectedItemClass, this.props.user.name))


  }
  addItemToBag(item) {
    let upItem = item;
    upItem.quantity = 1;
    console.log('need to edit up ', upItem);
    this.props.dispatch(addItemToPack(upItem, this.props.selectedItemClass, this.props.user.name))

  }
  changeFilter(filterValue) {
    console.log('change filter,', filterValue);
    // need to hide or show: potentialList and included

  //  document.body.
    if(filterValue === 'all') {
      console.log('set display of both to true');
      document.body.getElementsByClassName('included')[0].style.display = 'flex'
      document.body.getElementsByClassName('potentialList')[0].style.display = 'flex';
    }
    else if(filterValue === 'possible') {
      document.body.getElementsByClassName('included')[0].style.display = 'none'
      document.body.getElementsByClassName('potentialList')[0].style.display = 'flex';
    }
    else if(filterValue === 'inbag') {
      document.body.getElementsByClassName('included')[0].style.display = 'flex';
      document.body.getElementsByClassName('potentialList')[0].style.display = 'none';


    }

  }
  render() {
    let currentBag = {name:'none yet', description:'none found', items:[]}
    console.log('items not yet in bag, ', this.props);

    let bagId = 0;

    if(this.props.match.params.idnum) {
      bagId = this.props.match.params.idnum;
      this.props.dispatch(selectItemClass(bagId))
    }

    currentBag = this.props.collections.bags.find((d) => {
      return d.up_id === parseInt(bagId)
    }) || currentBag;

    console.log('current baggie', currentBag);

    let availableItems = Object.assign([], this.props.itemsByType.all.items.map((d) => {
      let item = d;
    //  console.log( 'item = ', item)
      let subquant = {}
      return item;
    })
  )

    let addableItems = this.itemsNotInBag();

    console.log('available items for this bag', addableItems)

    availableItems = categorizeItems(addableItems);
    let catArray = Object.keys(availableItems).sort();

    let bagItems = categorizeItems(currentBag.items);

    let bagCats = Object.keys(bagItems).sort();

    return (
      <div>
        <h3>{currentBag.name}</h3>
        <select defaultValue="all" className="filterSelect" onChange={(e) => {
            this.changeFilter(e.target.value);
          }} >
          <option value="all">All</option>
          <option value="possible">Items not in bag</option>
          <option value="inbag">Items included in bag</option>
        </select>
        <div className="potentialList">
        Items not yet in this bag:
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
                            this.addItemToBag(item);
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
        </div>

        <div className="included">
          <h2>Items currently in bag:</h2>
        {
          bagCats.map((category, i) => {
            return (
              <div key={i} >
                <h3>
                  {category}
                </h3>
                {bagItems[category].map( (item, i )  => {
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
      </div>)
  }

}

const mapStateToProps = state => {
  return state;
}



export default connect(mapStateToProps)(UserBag);
