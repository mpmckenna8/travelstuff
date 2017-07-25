/*
 * action types
 */

export const ADD_PACKING_ITEM = 'ADD_PACKING_ITEM'
export const TOGGLE_PACKED = 'TOGGLE_PACKED'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_PACKED: 'SHOW_PACKED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */


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
