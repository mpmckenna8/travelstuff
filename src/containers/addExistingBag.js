

import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import {addNewUserBag} from '../actions/collectionactions';


class AddExistingBag extends Component {
  constructor(props) {
  super(props);
  console.log('constructing add initial bag thing');

  this.state = {
  //  color: props.initialColor
  };
  }
  addBag(bagger) {
  //  console.log('need to add bag', bagger);
    let userDescription = document.getElementById('userBagDesc');
    bagger.userDescription = userDescription.value;

    console.log('trying to add bag, bagger=', bagger, '; username = ', this.props.user.name)

    this.props.dispatch(addNewUserBag(bagger, this.props.user.name))

  }
  render() {

    console.log('this in existing bag', this);

    let bagInfo = this.props.collections.allBags.find( (d) => {
      console.log('things in allbags, ', d.coll_id === parseInt(this.props.match.params.idnum))
      return d.coll_id === parseInt(this.props.match.params.idnum);
    }) || {name: 'no item yet'}

    console.log('the baginfo ,', bagInfo)
    return (<div className="bagInfo">bag info
              <div className="bagdeetDiv">
                <h4 className="bagInfoHeader">Name:</h4>
                <span className="bagDetails">{bagInfo.name}</span>
              </div>
              <div className="bagdeetDiv">
                <h4 className="bagInfoHeader">Description: </h4>
                <span className="bagDetails">{bagInfo.description}</span>
              </div>
              <div className="bagdeetDiv">
                <h4 className="bagInfoHeader">Weight Capacity: </h4>
                <span className="bagDetails">{bagInfo.weight_capacity}</span>
              </div>

              <div className="bagdeetDiv">
                <h4 className="bagInfoHeader">Custom bag name:</h4>
                <input id="userBagDesc" type="text" className="wideInput"/>
              </div>
              <button onClick={(e) => {this.addBag(bagInfo)}}>Add bag</button>
            </div>)
  }
}


const mapStateToProps = state => {
  const { collections } = state;

  return state;
}


export default connect(mapStateToProps)(AddExistingBag);
