// to be a list of the existing items with the ability to add them to the inventory,
// should make sure things already in users inventory don't show up and make a filter search


import React, { Component } from 'react'

import {connect} from 'react-redux';

import { Link } from 'react-router-dom'


class AddExistingItemList extends Component {

  itemsUserDontHave() {
      let itemsList = []

      if(this.props.collections.bags) {
      let bagIndex = this.props.collections.bags.findIndex( (d) => {
        return d.up_id.toString() === this.props.selectedItemClass.onCollection.toString()
      })

      if(this.props.user_items.items) {
          if(this.props.selectedItemClass.onCollection !== "all") {
              itemsList = this.props.collections.bags[bagIndex];
            }
          else {
            itemsList = this.props.user_items.items
          }

          let userItems = this.props.user_items.items;

          itemsList = userItems.filter( function(d) {
          //  console.log(( userItems.findIndex( (q) => q.p_id === d.p_id ) ))
            return !( userItems.findIndex( (q) => (q.p_id === d.p_id) ) >= 0 )
          })
        }
      }

    return itemsList
  }

  render() {
        //console.log('hopefully items user dont have', this.itemsUserDontHave())
        let dbItems = this.itemsUserDontHave() //this.props.itemsByType.db;


      return (
        <div>
          <h3>List of items not in inventory:</h3>
          { dbItems.map( (item,i) => {
              return (<div key={item.p_id}>
                <Link to={"addexistingitem/" + item.p_id}>{item.name}</Link></div>)
            })
          }
        </div>
    )
  }
}


const mapStateToProps = state => {
  return state;
}

export default connect(mapStateToProps)(AddExistingItemList)
