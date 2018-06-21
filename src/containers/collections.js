// collections component here

import React, {Component} from 'react'
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
          return(
            <Bag bagObj={item} dispatch={this.props.dispatch} key={i} ></Bag>
          )
        })}
        <p>default should be all or something</p>
      </div>
    )
  }
}

const Bag = ( bagObj, dispatch, key ) => {
  console.log('bagobj = ', bagObj, dispatch)


  return (<div onClick={() => {
  //  dispatch(selectItemClass(bagObj.bagObj.up_id))
  }}> <Link to={ '/userbag/' +  bagObj.bagObj.up_id }  >
                  {bagObj.bagObj.name}
                  </Link>
          </div>)
}


const mapStateToProps = state => {
  return state;
}

export default connect(mapStateToProps)(Collections)
