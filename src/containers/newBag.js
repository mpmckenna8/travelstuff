// make a new bag containers
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom'


import { addItemClass } from '../actions/collectionactions'
import {setReturnHome} from '../actions/useracts'


import AddExistingBagList from './addExistingBagList';

class AddBag extends Component {


  formsub(e) {
    //  console.log(this, e)
    e.preventDefault()
    console.log('this', this)
    let dispatch = this.props.dispatch;
    let form = document.getElementById('bagForm');
    let formData = new FormData(form)
    //  console.log('formdata = ', formData.keys())
      /*
      for(let i of formData.keys()) {
        console.log('formkey: ', i)
      }
      */
  //    need to build up the bag object to be sent
      let formobj = {name: formData.get('name'),
                      weight_capacity: formData.get('weightCap'),
                      description:formData.get('description')};
      if(!formobj.name){
        console.log('no name input found');
      }

      dispatch(addItemClass(formobj));
      dispatch(setReturnHome(true));

      console.log('need to handle form submission', formobj)
  }
  render() {

    let input = {value:''}
//    let weightCap = {value:10.0}
  //  let description = {value:'a baggy'}

    return (
      <div>

        {this.props.user.returnHome ? (
           <Redirect to="/home" />
         ): (
           <span></span>)
         }

        <h3>Add a new bag</h3>
        <div>
          <h4>Choose from an existing bag type or create a new collection type below.</h4>
          <AddExistingBagList></AddExistingBagList>
        </div>
        <form onSubmit={this.formsub.bind(this)}
              id="bagForm"
              name="bagform">
        <div className="bagformdiv">
          <div className="baglabeldiv">

          <label className="bagformlabel">Name:</label>
          </div>
          <div className="baginputdiv">

            <input
              className="itemInName baginput"
              name="name"
              />
          </div>
        </div>
          <br/>
            <div className="bagformdiv">
              <div className="baglabeldiv">

                <label className="bagformlabel">description:</label>
              </div>
            <div className="baginputdiv">
              <input
                className="itemInputDescription baginput"
                name="description"
              />
            </div>

            </div>
              <br />
            <div className="bagformdiv">
              <div className="baglabeldiv">
                <label className="bagformlabel">Weight Capacity:</label>
              </div>
              <div className="baginputdiv">

                <input
                  className="weight_cap baginput"
                  name = 'weightCap'
                  type="number"
                  step=".5"
                  defaultValue="10"
                  />
              </div>
          </div>
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
