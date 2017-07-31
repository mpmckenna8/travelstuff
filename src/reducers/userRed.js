// reduser for the user


const user = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user:'test'
      }
    default:
      return state;
  }

}


export default user;
