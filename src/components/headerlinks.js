// All the header stuff for the app with links to most of the routes
// and maybe a place to display the current user.

import React, {Component} from 'react';
import {Link } from 'react-router-dom'

class HeaderLinks extends Component {

  render() {


    return (
      <div className="headerLinkDiv">
        <div className="headLink">
          <Link to="/">Home</Link>
        </div>
        <div className="headLink">
          <Link to="/newitem">New Item</Link>

        </div>
        <div className="headLink">
          <Link to="/collections">Collections</Link>

        </div>
        <div className="headLink" >
          <Link to="/newbag">New Bag</Link>
        </div>


      </div>

    )
  }
}

export default HeaderLinks
