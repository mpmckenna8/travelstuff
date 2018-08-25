
import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link, Redirect, withRouter} from 'react-router-dom'

import categorizeItems from '../helpers/categorize.js'
import {selectItemClass, editItemQuantity, addItemToPack} from '../actions/actions'
import {deleteUserBag} from '../actions/collectionactions'

class UserBag extends Component {
  // this function returns all items not in the current bag as in
  componentDidMount() {
    console.log('the id for the bag from url, ', this.props.match.params.idnum)
    var bagID = this.props.match.params.idnum.toString();

    this.props.dispatch(selectItemClass(bagID ))
  }
  itemsNotInBag() {
      let itemsList = []
      // if we've gotten all the items initialized go!
      if(this.props.user_items.items) {
        itemsList = this.props.user_items.items;

        if ( this.props.collections.bags.find((d) => {
                return (d.up_id.toString() === this.props.selectedItemClass.onCollection)
            }) )
            {

              let itemBag = this.props.collections.bags.find((d) => {
                return (d.up_id.toString() ===  this.props.selectedItemClass.onCollection)
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
    console.log('increment item quant here, the props = ', this.props)
    item.quantity = item.quantity + 1;
    this.props.dispatch(editItemQuantity(item, this.props.selectedItemClass.onCollection, this.props.user.name))

  }
  decrementItemQuantity(item) {
        item.quantity = item.quantity - 1;
        this.props.dispatch(editItemQuantity(item, this.props.selectedItemClass.onCollection, this.props.user.name))
  }
  addItemToBag(item) {
    let upItem = item;
    upItem.quantity = 1;
    console.log('need to edit up ', upItem);
    this.props.dispatch(addItemToPack(upItem, this.props.selectedItemClass.onCollection, this.props.user.name))

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
  deleteBag() {
    console.log('need to delete the bag., thi', this.props)
    this.props.dispatch(deleteUserBag(this.props.onCollection, this.props.user.id))
  }
  render() {
    let currentBag = {name:'none yet', description:'none found', items:[]}
  //  console.log('this.props in userbag render =  ', this.props);
    let bagId = 0;

    if(this.props.match.params.idnum) {
      bagId = this.props.match.params.idnum;
      //console.log('setting item class in userBag to , ', bagId)
    }

    currentBag = this.props.collections.bags.find((d) => {
      return d.up_id === parseInt(bagId, 10)
    }) || currentBag;

    if(currentBag.name ==="none yet") {
      //this.props.dispatch(selectItemClass('all'))
    }
    else {
      //this.props.dispatch(selectItemClass(bagId))
    }

    let availableItems = Object.assign([], this.props.user_items.items.map((d) => {
      let item = d;
      return item;
    })
  )

    let addableItems = this.itemsNotInBag();

    console.log('available items for this bag', addableItems)

    availableItems = categorizeItems(addableItems);
    let catArray = Object.keys(availableItems).sort();

    let bagItems = categorizeItems(currentBag.items);

    let bagCats = Object.keys(bagItems).sort();

//console.log('should be rendering userbag')
    return (

      <div>

        <h3>{ currentBag.name ==='none yet'? <Redirect push to="/" /> : (currentBag.name) }</h3>
        <select defaultValue="all" className="filterSelect" onChange={(e) => {
            this.changeFilter(e.target.value);
          }} >
          <option value="all">All</option>
          <option value="possible">Items not in bag</option>
          <option value="inbag">Items included in bag</option>
        </select>

<button onClick={(e) => {
  if( window.confirm("Are you sure you want to delete the bag? Cannot be undone.") ) {
    console.log('need to delete the bag')
    this.deleteBag();

  }
}}>Delete Bag</button>
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
        <div className="potentialList">
          <h2>Items not yet in this bag:</h2>
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

      </div>)
  }

}

const mapStateToProps = state => {
  return state;
}



export default withRouter(connect(mapStateToProps)(UserBag));
