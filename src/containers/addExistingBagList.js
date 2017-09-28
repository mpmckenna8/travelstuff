// to show the bags that are already created with an option for the user to add them
import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

class AddExistingBagList extends Component {
  render() {

    console.log('things to look at here, ', this.props)
    let existingBags = this.props.collections.allBags || [];

    return (
      <div>Make list of bags
        {existingBags.map( (bag, i) => {
          console.log('existing bag,', bag)
          return (<div key={i}> <Link to={"/addexistingBag/"+ bag.coll_id} >{bag.name} </Link></div>)
        })}

      </div>)
  }
}

const mapStateToProps = state => {
  const { collections } = state;

  return {collections: collections};
}

export default connect(mapStateToProps)(AddExistingBagList)
