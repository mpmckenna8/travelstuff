// use
import React, {Component} from 'react'


function ItemView(currentItem) {

  console.log('currentItem in the view ', currentItem);


  return (
    <div>
  <h2 className="itemHeader">{currentItem.name}</h2>
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

export default ItemView;
