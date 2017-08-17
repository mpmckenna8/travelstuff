// a container for a single item to view info and edit
import React, { Component } from 'react'
import { connect } from 'react-redux'


class SingleItem extends Component {

  render() {
    console.log('idnumber passed in from uri', this.props.match.params.idnum)
    const urlid = parseInt(this.props.match.params.idnum)
    let currentCollection = this.props.selectedItemClass;
    let currentItem = this.props.itemsByType[currentCollection].items.find(function(d){
      console.log(d)
      return (d.p_id === urlid)
    });
    if(!currentItem){
      currentItem = {name:'not here yet ',
        description:''}
    }
    console.log('currentItem = ', currentItem)
    return (
      <div className="singleItemDiv">
        <h2>{currentItem.name}</h2>
        <div className="itemDeets" >
          <h4>Description:</h4> <p>{currentItem.description}</p>
        </div>
        <div className="itemDeets">
          <h4>Category:</h4>
          <p>{currentItem.category}</p>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(SingleItem);
