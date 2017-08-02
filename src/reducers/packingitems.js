
// want to make my state way more like the async example like with:
/*{
  isFetching: false,
  didInvalidate: false,
  items: []
}
for the state
*/

const packingItems = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PACKING_ITEM':
      console.log('trying to add a packing item, action = ', action)

      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          packed: false,
          /*eslint radix: ["error", "as-needed"]*/
          quantity: parseInt(action.quantity)
        }
      ]
    case 'TOGGLE_PACKED':
      console.log('state of stuff = ', state, action)
      return state.map(packingItem =>
        (packingItem.id === action.index)
          ? {...packingItem, packed: !packingItem.packed}
          : packingItem
      )
    case 'GET_PACKING_ITEMS':


      console.log('NEED TO IMPLEMENT THIS')
    default:
      return state
  }
}

export default packingItems
