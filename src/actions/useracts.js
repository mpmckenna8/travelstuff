// actions pertaining to the user in here
//import fetch from 'isomorphic-fetch'


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
