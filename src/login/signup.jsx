import React, { Component } from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { signupUser } from "../actions/useracts.js";

class Signup extends Component {
  constructor(props) {
    super(props);
    let loggingIn = this.props.user.loggingIn;

    this.submitSignup = this.submitSignup.bind(this);
  }
  submitSignup(event) {
    event.preventDefault()
    console.log('need so submit the signup stuff manually i guess')
    let userdata = {
      username: '',
      password: ''
    }
    userdata.username = event.target.querySelector("#signup_email").value;
    userdata.password =  event.target.querySelector("#signup_password").value;
    console.log('need so submit the signup stuff manually i guess, ', userdata)

    this.props.dispatch(signupUser(userdata))


  }

  render(){
    return (
      <div className="signupDiv">
        {
          this.props.user.returnHome ? <Redirect to="/" /> : ""
        }
        <div className="col-sm-6 col-sm-offset-3">

            <h1><span className="fa fa-sign-in"></span> Signup</h1>

            <div className="alert alert-danger">

            </div>

            <form onSubmit={this.submitSignup} >
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" name="email" id="signup_email" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" id="signup_password" />
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
