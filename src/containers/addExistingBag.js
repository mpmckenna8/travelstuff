import React, {Component} from 'react'
import { connect } from 'react-redux'
import {addNewUserBag} from '../actions/collectionactions';

import {Redirect} from "react-router-dom";

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

    bagger.collection_name = bagger.name;
    bagger.name = userDescription.value;

    console.log('trying to add bag, bagger=', bagger, '; username = ', this.props.user.name)


    this.props.dispatch(addNewUserBag(bagger, this.props.user.name))

  }
  render() {

    console.log('this is rendering in add existing bag, this = ', this);

    let bagInfo = this.props.collections.allBags.find( (d) => {
      console.log( 'things in allbags, ', d.coll_id === parseInt( this.props.match.params.idnum, 10 ) )
      return d.coll_id === parseInt( this.props.match.params.idnum, 10 );
    }) || {name: 'no item yet'}

    console.log('the baginfo ,', bagInfo)
    return (<div className="bagInfo">
      {this.props.selectedItemClass.onCollection !== "all" ? <Redirect to={"/userbag/" + this.props.selectedItemClass.onCollection.toString() } /> : ""}
              <h2>Collection details</h2>
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
                <h4 className="bagInfoHeader">Custom collection name:</h4>
                <input id="userBagDesc" type="text" className="wideInput"/>
              </div>
              <button onClick={(e) => {this.addBag(bagInfo)}}>Add bag</button>
            </div>)
  }
}


const mapStateToProps = state => {
  return state;
}


export default connect(mapStateToProps)(AddExistingBag);
