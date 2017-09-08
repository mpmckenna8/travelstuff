import React, { Component } from 'react'
import { addItem } from '../actions/actions'
import { connect } from 'react-redux'


class AddItem extends Component {

  componentDidMount() {
  //const {selectedItemClass } = this.props

    console.log('mounted Additem, thisprops = ', this.props.selectedItemClass)
  //  dispatch(addItem('blah',this.props.selectedItemClass ))

  }
  addNewItem(thing){
    let dispatch = this.props.dispatch;

//    console.log('in the addNewItem functionthing', thing)
    dispatch(addItem(thing, this.props.selectedItemClass))

  }

  render(){
    let input;
    let description = {value:""};
    let count = {value:1};
    let weight = { value: 1.0 };
    let category = {value: 'other'}
    return (
    <div>
    <div>Add new item</div>
      <form id="newItemForm"
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          let newit = {
                    name: input.value,
                    description: description.value,
                    quantity: count.value,
                    weight: weight.value,
                    category: document.getElementById('catSelect').value
                  }

          console.log('input is', input.value)

          this.addNewItem(newit)
      //    dispatch(addItem(input.value, this.props.selectedItemClass))
        //  dispatch(addPackingItem(input.value, count.value))
          input.value = '';
          description.value = '';
          weight.value = 1.0;
          category.value = "Other"

        }}
      >

        <label>Name:</label>
          <input
            className="itemInName"
            ref={node => {
              input = node
            }}
            />
          <br />
          <label>description:</label>
            <input
              className="itemInputDescription"
              ref={node => {
                description = node
              }}
            />
            <br />
            <label>Quantity:</label>
            <input
              className="quantin"
              ref={node => {
                count = node;
              }}
              type="number"
              step="1"
              defaultValue="1"
            />
            <br />
            <label>weight:</label>
            <input
              className="weight"
              ref={node => {
                weight = node;
              }}
              type="number"
              step=".1"
              defaultValue="1"
            />



              <br />
                <select name="select" id="catSelect">
                  <option value="clothing">Clothing</option>
                  <option value="comestable" >Comestables</option>
                  <option value="tool">Tools</option>
                  <option value="potion">Potion</option>
                  <option value="other" defaultValue>other</option>
                </select>

                <br />

        <button type="submit">Add new item</button>
      </form>
    </div>
    )
  }
}

function mapStateToProps(state) {

  const { selectedItemClass, itemsByType} = state
  console.log(itemsByType)
  const {
    isFetching,
    lastUpdated,
    items
  } = itemsByType[selectedItemClass] || {
    isFetching: true,
    items: []
  }

  return {
  selectedItemClass,
  items,
  isFetching,
  lastUpdated
}
}


export default connect(mapStateToProps)(AddItem);
