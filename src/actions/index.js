/*
 * action types
 */
 export const SELECT_ITEMTYPE = 'SELECT_ITEMTYPE'


 export const selectItemType = itemType => ({
   type: SELECT_ITEMTYPE,
   itemType
 })


export const REQUEST_ITEMS = "REQUEST_ITEMS"
export const requestItems = itemType => {
  console.log('request the items, ', itemType)
  return ({
  type: REQUEST_ITEMS,
  itemType
})
}



export const ADD_PACKING_ITEM = 'ADD_PACKING_ITEM'
export const TOGGLE_PACKED = 'TOGGLE_PACKED'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const SET_USER = "SET_USER"

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_PACKED: 'SHOW_PACKED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const GET_PACKING_ITEMS = "GET_PACKING_ITEMS";

export function getPackingItems() {

  return { type:"all"}
}

/*
 * action creators
 */

//let dburl = "http://localhost:8080/db/";



export function logInUser() {
  console.log('not implemented or even called i think')
}

export function setUser(userName){

  return {
    type: SET_USER,
    userName
  }
}



let nextPackItemID = 0;
export function addPackingItem(text, quant) {

  console.log('input to AddPackingItem action:', text, quant)

  return { type: ADD_PACKING_ITEM,
            id: nextPackItemID++,
            quantity: quant,
            text }
}

export function toggleTodo(index) {
  return { type: TOGGLE_PACKED,
          index }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }

}
