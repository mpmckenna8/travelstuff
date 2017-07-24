import React from 'react'
import { connect } from 'react-redux'
import { addPackingItem } from '../actions'

let AddPackingItem = ({ dispatch }) => {
  let input

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(addPackingItem(input.value))
          input.value = ''
        }}
      >
        <input
          ref={node => {
            input = node
          }}
        />
        <button type="submit">
          Add Packing item
        </button>
      </form>
    </div>
  )
}
AddPackingItem = connect()(AddPackingItem)

export default AddPackingItem
