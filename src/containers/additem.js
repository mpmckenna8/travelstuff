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

    console.log('in the addNewItem functionthing', thing)
    dispatch(addItem(thing, this.props.selectedItemClass))

  }

  render(){
    let input;
    let description = {value:""};
    let count = {value:1};

    return (
    <div>
    <div>New item Attributes</div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          let newit = {
                    name: input.value,
                    description: description.value,
                    quantity: count
                  }

          console.log('input is', input.value)

          this.addNewItem(newit)
      //    dispatch(addItem(input.value, this.props.selectedItemClass))
        //  dispatch(addPackingItem(input.value, count.value))
          input.value = '';
          description.value = '';

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
