import React, { Component } from 'react'
import { addItem } from '../actions/actions';
import {setReturnHome} from '../actions/useracts'
import { connect } from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom'

import AddExistingItemList from "./addExistingItemList.js"


class AddItem extends Component {

  componentDidMount() {


  }
  addNewItem(thing){
    let dispatch = this.props.dispatch;
    dispatch(setReturnHome(true))

//    console.log('in the addNewItem functionthing', thing)
    dispatch(addItem(thing, this.props.selectedItemClass.onCollection))

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
          console.log('new item form submitted, input.value is = ', input.value)

          this.addNewItem(newit)
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
                  <option value="electronics">Electronics</option>
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
      {this.props.returnHome ? ( <Redirect to="/home" /> ): (<span></span>)}

    </div>
    )
  }
}

function mapStateToProps(state) {
  const { user_items} = state;
  //console.log(itemsByType)
  let isFetching = state.user_items.isFetching,
    lastUpdated = state.user_items.lastUpdated,
  items = state.user_items.items;
  let selectedItemClass = state.selectedItemClass

  if(selectedItemClass.onCollection !== "all") {
    items = []
  }
  let returnHome = state.user.returnHome;

  return {
  selectedItemClass,
  items,
  isFetching,
  lastUpdated,
  returnHome
}
}


export default withRouter(connect(mapStateToProps)(AddItem));
