


// want to make my state way more like the async example like with:
/*{
  isFetching: false,
  didInvalidate: false,
  items: []
}
for the state
*/

const packingItems = (state = {
  isFetching: false,
  didInvalidate: false,
  items: [] }, action) => {
  switch (action.type) {
    case 'ADD_PACKING_ITEM':
      console.log('trying to add a packing item, action = ', action)
      state.items.push(
            {
              id: action.id,
              text: action.text,
              packed: false,
              /*eslint radix: ["error", "as-needed"]*/
              quantity: parseInt(action.quantity)
            })
      return {...state,};
    case 'TOGGLE_PACKED':
      console.log('state of stuff = ', state, action)
      return state.map(packingItem =>
        (packingItem.id === action.index)
          ? {...packingItem, packed: !packingItem.packed}
          : packingItem
      )
    case 'GET_PACKING_ITEMS':

      console.log('NEED TO IMPLEMENT THIS')
      return state;
      case "INVALIDATE_ITEMREQ":
        return {
          ...state,
          didInvalidate: true
        }
    default:
      return state
  }
}

const itemsByType = (state = { }, action) => {
  switch (action.type) {
    case 'INVALIDATE_ITEMS':
    case 'RECEIVE_ITEMS':
    case 'REQUEST_ITEMS':
      console.log('state,', state)
      return {
        ...state,
        [action.type]: packingItems(state[action.type], action)
      }
    default:
      return state
    }
}

export default packingItems
