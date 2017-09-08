// make a new bag containers
import React, { Component } from 'react'
import { addItemClass } from '../actions/collectionactions'
import { connect } from 'react-redux'


class AddBag extends Component {


  formsub(e) {
    //  console.log(this, e)
    e.preventDefault()
    console.log('this', this)
    let dispatch = this.props.dispatch;

      let form = document.getElementById('bagForm');
      let formData = new FormData(form)
      console.log('formdata = ', formData.keys())
      for(let i of formData.keys()) {
        console.log('formkey: ', i)
      }
  //    need to build up the bag object to be sent
      let formobj = {name: formData.get('name'),
                      weight_capacity: formData.get('weightCap'),
                      description:formData.get('description')};

      if(!formobj.name){
        console.log('no name input found');
      }

      dispatch(addItemClass(formobj))

      console.log('need to handle form submission', formobj)
  }
  render() {

    let input = {value:''}
//    let weightCap = {value:10.0}
  //  let description = {value:'a baggy'}

    return (
      <div>
        need a form to add bags
        <form onSubmit={this.formsub.bind(this)}
              id="bagForm"
              name="bagform">
        <label>Name:</label>
          <input
            className="itemInName"
            name="name"
            />
          <br/>

            <label>description:</label>
              <input
                className="itemInputDescription"
                name="description"
              />
              <br />

            <label>Weight Capacity:</label>
            <input
              className="weight_cap"
              name = 'weightCap'
              type="number"
              step=".5"
              defaultValue="10"
            />


              <br />

            <button type="submit">Add new bag</button>

        </form>


      </div>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(AddBag);
