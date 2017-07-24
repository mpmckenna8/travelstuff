const packingItems = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PACKING_ITEM':
      console.log('trying to add a packing item, action = ', action)
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      console.log('state of stuff = ', state, action)
      return state.map(packingItem =>
        (packingItem.id === action.index)
          ? {...packingItem, completed: !packingItem.completed}
          : packingItem
      )
    default:
      return state
  }
}

export default packingItems
