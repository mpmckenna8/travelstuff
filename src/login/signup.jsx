import React, { Component } from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

class Signup extends Component {

  render(){
    return (
      <div className="signupDiv">
        blah
        <div className="col-sm-6 col-sm-offset-3">

            <h1><span className="fa fa-sign-in"></span> Signup</h1>

            <div className="alert alert-danger">

            </div>

            <form action="/signup" method="post">
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" name="email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" />
                </div>

                <button type="submit" classNameName="btn btn-warning btn-lg">Signup</button>
            </form>

            <hr/>

            <p>Already have an account? <a href="/login">Login</a></p>
            <p>Or go <a href="/">home</a>.</p>

        </div>

    </div>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)( Signup);
