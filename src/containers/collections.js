// collections component here

import React, {Component} from 'react'
//import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

class Collections extends Component {

  render() {
    return (
      <div>
        Put the collections for the signed in user here
      <Link to='/'>backhome</Link>
      <p>default should be all or something</p>
      </div>
    )
  }
}



export default Collections
