import React, { Component } from 'react'
import { addItem } from '../actions/actions'
import { connect } from 'react-redux'

import AddExistingItemList from "./addExistingItemList.js"


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

  toggleCategoryTextInput(value) {
        ( value === "other" ) ?
            document.body.getElementsByClassName('categoryText')[0].style.display = 'block' :
            document.body.getElementsByClassName('categoryText')[0].style.display = 'none'
  }

  render(){
    let input;
    let description = {value:""};
    let count = {value:1};
    let weight = { value: 1.0 };
    let category = {value: 'other'}

    return (
    <div>
    <div>Add custom new item</div>
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

          if(newit.category === "other") {
            let customCategory = document.body.getElementsByClassName('categoryText')[0].value;
            if( customCategory !== "") {
              newit.category = customCategory;
            }
          }

//          console.log('input is', input.value)

          this.addNewItem(newit)
      //    dispatch(addItem(input.value, this.props.selectedItemClass))
        //  dispatch(addPackingItem(input.value, count.value))
          input.value = '';
          description.value = '';
          weight.value = 1.0;
          category.value = "Other"
        }}
      >
      <div className="addItemDiv">
        <label className="addLabel">Name:</label>
          <input
            className="itemInName addInput"
            ref={node => {
              input = node
            }}
            />
      </div>
          <br />
      <div className="addItemDiv">
          <label className="addLabel">description:</label>
            <input
              className="itemInputDescription addInput"
              ref={node => {
                description = node
              }}
            />
      </div>

            <br />
      <div className="addItemDiv">
            <label className="addLabel">Quantity:</label>
            <input
              className="quantin addInput"
              ref={node => {
                count = node;
              }}
              type="number"
              step="1"
              defaultValue="1"
            />
      </div>

            <br />
      <div className="addItemDiv">

            <label className="addLabel">weight:</label>
            <input
              className="weight addInput"
              ref={node => {
                weight = node;
              }}
              type="number"
              step=".1"
              defaultValue="1"

            />
      </div>
              <br />
      <div className="addItemDiv">
              <label className="addLabel">Category:</label>
              <select name="select" defaultValue="other" className="addSelect" id="catSelect" onChange={(e) => {
                  //  console.log('e is', e.target.value);
                    this.toggleCategoryTextInput(e.target.value)
                  }}>
                  <option value="clothing">Clothing</option>
                  <option value="comestible" >Comestibles</option>
                  <option value="tool">Tools</option>
                  <option value="potion">Potion</option>
                  <option value="other">other</option>
              </select>

              <input type="text" className="categoryText" placeholder="add custom category">

              </input>
      </div>

                <br />

        <button type="submit">Add new item</button>
      </form>
      <div>
        <div>Add existing item</div>
        <AddExistingItemList/>
      </div>

    </div>
    )
  }
}

function mapStateToProps(state) {

  const { selectedItemClass, itemsByType} = state
  //console.log(itemsByType)
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
