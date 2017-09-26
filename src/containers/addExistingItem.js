// a little page to add an existing item in db to inventory given the item
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import {addExistingItem} from "../actions/actions"

//import ItemView from '../components/itemView.js'
class AddExistingItem extends Component {
  addToInventory(item) {
    console.log('need to add item to thing', item);

    var itemquantity = document.body.querySelector('#itemquantity').value;
    item.quantity = itemquantity;
    // need to to a whole add exiting item action
    this.props.dispatch(addExistingItem(item, 'all', this.props.user.name));
  //  document.querySelector('#homelink').click();

    console.log(this)
    this.props.history.push('../');
  }

  render() {
    console.log('props in addexiting item', this.props);

    let currentItemId = this.props.match.params.idnum;

    let currentItem = this.props.dbItems.find(function(d) {
      console.log(d.p_id, 'and compared to', currentItemId)
      return (d.p_id === parseInt(currentItemId));
    })

  //  console.log('current item is: ', currentItem)

    let itemview = (<div></div>)
    if(currentItem) {
      itemview = (<ItemView currentItem={currentItem} />)
    }

  // var itemviewstuff = ItemView(currentItem);

    return (<div>
      <div>  <button onClick={(e) =>  this.addToInventory(currentItem) }>Add to inventory</button></div>
        {itemview}
        <div>  <button onClick={(e) =>  this.addToInventory(currentItem) }>Add to inventory</button></div>

    </div>)
  }
}

const mapStateToProps = state => {
  console.log('setting up state in add existing item');
//  console.log('this in map,', this, state)

  let dbItems = {
    dbItems:[],
    user: state.user
  }

  if(state.itemsByType.db){
    dbItems.dbItems = state.itemsByType.db.items;
  }

  return dbItems;
}

export default connect(mapStateToProps)(AddExistingItem)



function ItemView({currentItem}) {

  console.log('currentItem in the view ', currentItem);


  return (
    <div>
      <h2 className="itemHeader">{currentItem.name}</h2>
      <div>
        <h3>Quantity</h3>
      <span><input type="number" defaultValue="1" step="1" id="itemquantity" ></input></span>

    </div>

    <div className="itemDeets description" >


    <h4>Description:</h4>
    <span>
      <p>{currentItem.description}</p>
    </span>

  </div>
  <div className="itemDeets category">
    <h4>Category:</h4>
    <span>
    <p>{currentItem.category}</p>
    </span>
  </div>
  <div className="itemDeets value">
    <h4>Value:</h4>
    <span>
    <p>{currentItem.value}</p>
    </span>

  </div>
  <div className="itemDeets weight">
    <h4>Weight:</h4>
    <span>
      <p>{currentItem.weight}</p>
    </span>
  </div>
  </div>
)


}
