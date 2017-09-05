// collections component here

import React, {Component} from 'react'
//import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'


class Collections extends Component {

  render() {

    let bagArray = this.props.collections.bags;
  //  console.log('bagArray = ', bagArray)
    return (
      <div>

        <Link to='/'>backhome</Link>

      <h3>Bags:</h3>
        {bagArray.map((item,i) => {
      //    console.log(item)
          return(
            <Bag bagObj={item} key={i}></Bag>
          )
        })}
        <p>default should be all or something</p>
      </div>
    )
  }
}

const Bag = (bagObj, key) => {

    console.log('bagobj is ,', bagObj)
//  console.log('bagobj = ', bagObj)
  return (<div> {bagObj.bagObj.name} </div>)
}


const mapStateToProps = state => {
  return state;
}

export default connect(mapStateToProps)(Collections)
