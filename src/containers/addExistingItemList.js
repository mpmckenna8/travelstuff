// to be a list of the existing items with the ability to add them to the inventory,
// should make sure things already in users inventory don't show up and make a filter search


import React, { Component } from 'react'

import {connect} from 'react-redux';



class AddExistingItemList extends Component {

  render() {
        let dbItems = [] //this.props.itemsByType.db;
        console.log('db items to map', this.props.itemsByType.db);
        if(this.props.itemsByType.db) {
          dbItems = this.props.itemsByType.db.items
        }


      return (
        <div>
          { dbItems.map( (item,i) => {
              return (<div key={i}>{item.name}</div>)
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
