// user reducer to be required in reducers/index.js

import {SET_USER} from '../actions/useracts.js'


function user(state={name:"test", id: 1, returnHome: false, loggingIn: false, needsRefresh: false}, action) {

  switch(action.type) {
    case SET_USER:{
  //    console.log('setting new user maybe', state, action)
      state.name = action.name;
      return Object.assign({}, state)
    }
    case "SET_USER_ID": {

      state.id = action.id;
      return Object.assign({}, state);
    }
    case "SET_RETURN_HOME": {
      state.returnHome = action.returnBool;
      return Object.assign({}, state)
    }
    case "LOGIN_SUCCESS": {
      state.name = action.user.email;
      state.id = action.user.u_id;
      state.loggingIn = true;

      return Object.assign({}, state)
    }
    case "SIGNUP_SUCCESS": {
      state.name = action.user.name;
      state.returnHome = true;
      state.id = action.user.u_id;
      return Object.assign({}, state)

    }

    default:
      return state;
  }
}

export default user;
