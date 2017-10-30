// user reducer to be required in reducers/index.js

import {SET_USER} from '../actions/useracts.js'


function user(state={name:"test", id: 1}, action) {

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
    default:
      return state;
  }
}

export default user;
