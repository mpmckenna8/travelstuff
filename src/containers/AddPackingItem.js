import React from 'react'
import { connect } from 'react-redux'
import { addPackingItem } from '../actions'

let AddPackingItem = ({ dispatch }) => {
  let input;
  let count = 1;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(addPackingItem(input.value, count.value))
          input.value = ''
        }}
      >
        <input
          className="itemInName"
          ref={node => {
            input = node
          }}
        />


      <input
        className="quantin"
        ref={node => {
          count = node;
        }}
        type="number"
        step="1"
        defaultValue="1"
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
