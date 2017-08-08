// make a new bag containers
import React, { Component } from 'react'
import { addItemClass } from '../actions/actions'
import { connect } from 'react-redux'


class AddBag extends Component {


  formsub(e) {
  //  console.log(this, e)
  e.preventDefault()
  console.log('this', this)
  let dispatch = this.props.dispatch;

    let form = document.getElementById('bagForm');
    let formData = new FormData(form)
    console.log('formdata = ', formData)
//    need to build up the bag object to be sent
    let formobj = {name: formData.get('name')};



    if(!formobj.name){
      console.log('no name input found');
    }
    dispatch(addItemClass(formobj))
    console.log('need to handle form submission', formobj)
  }
  render() {

    let input = {value:''}

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
            ref={node => {
              input = node
            }}
            />
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
