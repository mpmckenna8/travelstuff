// actions pertaining to the user in here
import fetch from 'isomorphic-fetch'
import { fetchItems } from "../actions/actions.js"


export const SET_USER = "SET_USER";

export function setUser(username) {
  console.log('in setuser action', username)
  return {
    type: SET_USER,
    name: username
  }
}


export function setReturnHome(returnBool) {
  return {
    type: "SET_RETURN_HOME",
    returnBool: returnBool
  }
}

export const ATTEMPT_LOGIN = "ATTEMPT_LOGIN";

export function attemptLogIn( login_info ) {

  return function(dispatch) {
    console.log('trying to login', login_info)
    let loginData = JSON.stringify(login_info);
    console.log('want to try to log in with, ', loginData)
    var myInit = { method: 'POST',
                   headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                   mode: 'cors',
                   cache: 'default',
                  body: loginData};

    console.log('myInit', myInit)

    let loginURL = "http://localhost:8080/login"
  //  dispatch(loginFailure())

    return fetch(loginURL, myInit)
              .then(res => {
            //    console.log(res)
                return res.json()
              })
              .then(json => {
                console.log('json from sign user in is: ', json);
                if(json.login === "fail") {
                  return dispatch(loginFailure())
                }
                else {
                  dispatch(loginSuccess(json))
                  return dispatch(fetchItems("all", json.email))

                }
              })

              .catch(function(err) {

                console.log('error with the login, ', err)
                return dispatch(loginFailure())
              })


}

}


function loginFailure() {

  return {
    type: "LOGIN_FAILURE"
  }
}

function loginSuccess(user) {
  //return function(dispatch) {


  return {
    type: "LOGIN_SUCCESS",
    user: user
  }

//  }
}

export function signupUser(userData) {
  return function(dispatch) {


    let userName = userData.name;
    let userPass = userData.password;

    let sendData = {name:userName, password: userPass}
    sendData = JSON.stringify(sendData)

    console.log('tring to signup, ', sendData)
    var signupInit = { method: 'POST',
                  // headers: myHeaders,
                   mode: 'cors',
                   cache: 'default',
                   headers: {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
},
                   body: sendData};

    console.log(signupInit)

    let signUpURL = "http://localhost:8080/signup"

    return fetch(signUpURL, signupInit)
              .then(res => {

              //  console.log('res from signup', res);

                return res.json()
              })
              .then(json => {
                console.log('json from sign up is: ', json);
                if(json.msg) {
                  return dispatch(signUpFailure())
                }
                else {

                   return dispatch(signUpSucess(json))

                }
              })

              .catch(function(err) {
                console.log('error with the signUP, ', err)
                return dispatch(signUpFailure())
              })
  }
}

function signUpSucess(json) {
  console.log('sucessfully signed up: ', json)
  return {
    type:"SIGNUP_SUCCESS",
    user: json
  }
}

function signUpFailure() {
  return {
    type:"SIGNUP_FAILURE"
  }
}
