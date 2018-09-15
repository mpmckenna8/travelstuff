import React, { Component } from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

import { attemptLogIn } from "../actions/useracts.js"
import { fetchItems } from "../actions/actions.js"

class Login extends Component {
  constructor(props) {
    super(props);
    let loggingIn = this.props.user.loggingIn;

    this.tryLogin = this.tryLogin.bind(this);
  }

  tryLogin(event) {
    event.preventDefault();
    let userdata = {
      username: '',
      password: ''
    }


    console.log('neet to try to login ', event,  event.target.querySelector("#emaillogin").value )

    userdata.username = event.target.querySelector("#emaillogin").value;
    userdata.password =  event.target.querySelector("#password_login").value
    console.log('userdata', userdata)
    this.props.dispatch(attemptLogIn(userdata))
    //.then(this.props.dispatch(fetchItems('all', this.props.user.name)))


  }
  render() {
    console.log('rendering login.');
    let loggingIn = this.props.user.loggingIn;

    if(loggingIn) {
      console.log('need to render the redirect home;')
  //    this.props.dispatch(fetchItems('all', this.props.user.name))
    }
    return (
        <div className="container">
        {
          (loggingIn) ? <Redirect to="/" /> : ""
        }

            <div className="col-sm-6 col-sm-offset-3">

                <h1><span className="fa fa-sign-in"></span> Login</h1>

                <div className="alert alert-danger">
                </div>

                <form onSubmit={this.tryLogin} >
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" name="email" id="emaillogin" >
                        </input>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input id="password_login" type="password" className="form-control" name="password" />
                    </div>
                    <button type="submit" className="btn btn-warning btn-lg">Login</button>
                </form>
                <hr/>

                <p>Need an account? <a href="/signup">Signup</a></p>
                <p>Or go <a href="/">home</a>.</p>

            </div>

        </div>
      )

  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)( Login );
