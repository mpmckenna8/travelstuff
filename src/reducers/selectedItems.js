// selectedItems stuff

const selectedItems = (state = 'all', action) => {
  switch (action.type) {
    case 'SELECT_ITEMTYPE':
      return action.itemType
    default:
      return state
  }
}


export default selectedItems;
