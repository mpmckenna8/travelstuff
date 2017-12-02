// to be a list of the existing items with the ability to add them to the inventory,
// should make sure things already in users inventory don't show up and make a filter search


import React, { Component } from 'react'

import {connect} from 'react-redux';

import { Link } from 'react-router-dom'


class AddExistingItemList extends Component {
  itemsUserDontHave() {

      let itemsList = []
      if(this.props.itemsByType.db) {
        itemsList = this.props.itemsByType.db.items;
        if ( this.props.itemsByType.all ) {

          let userItems = this.props.itemsByType.all.items;

          itemsList = itemsList.filter( function(d) {
          //  console.log(( userItems.findIndex( (q) => q.p_id === d.p_id ) ))
            return !( userItems.findIndex( (q) => (q.p_id === d.p_id) ) >= 0 )
          })
        }
      }
    return itemsList
  }

  render() {
        console.log('hopefully items user dont have', this.itemsUserDontHave())
        let dbItems = this.itemsUserDontHave() //this.props.itemsByType.db;
        console.log('db items to map', this.props.itemsByType.db);


      return (
        <div>
          { dbItems.map( (item,i) => {
              return (<div key={item.p_id}>
                <Link to={"addexistingitem/" + item.p_id}>{item.name}</Link></div>)
            })
          }
        blah
          list of db items with
        </div>
    )
  }
}


const mapStateToProps = state => {
  return state;
}

export default connect(mapStateToProps)(AddExistingItemList)
