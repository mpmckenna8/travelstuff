// a container for a single item to view info and edit
import React, { Component } from 'react'
import { connect } from 'react-redux'
//import {Link } from 'react-router-dom'
import '../style.css'
import { editItem } from '../actions/actions'
import { Link } from 'react-router-dom'

class SingleItem extends Component {
  viewMode(currentItem) {

    let infodivs = document.getElementsByClassName('itemDeets');

  //  let descdiv = infodivs.getElementsByClassName('description')


    for( let o of infodivs) {
  //    console.log(o.className)
      if((o.className).includes('description')){
          cancelEdit(o, currentItem.description)
        }
      else if(o.className.includes('category')) {
          cancelEdit(o, currentItem.category)
      }
      else if(o.className.includes('value')) {
          cancelEdit(o, currentItem.value)
      }
      else if(o.className.includes('weight')) {
        cancelEdit(o, currentItem.weight)
      }
        else {
          let toinfo = o.querySelector('span');
          let texttemp = toinfo.querySelector('input').value

          toinfo.innerHTML = "<p>" + texttemp + '</p>'
        }

      }


  }
  saveChanges(inputDivs, currentItem) {

    let savingItem = currentItem;

    savingItem.quantityChanged = false;

    for( let o of inputDivs) {
      if(o.className.includes('description') ) {
        savingItem.description = o.querySelector('input').value;
      }
      else if(o.className.includes('value')){
        savingItem.value = o.querySelector('input').value;
      }
      else if(o.className.includes('category')){
        savingItem.category = o.querySelector('input').value;
      }
      else if(o.className.includes('category')){
        savingItem.category = o.querySelector('input').value;
      }

      else if(o.className.includes('weight')){
        savingItem.weight = o.querySelector('input').value;
      }
      else if(o.className.includes('quantity')) {
        savingItem.quantity = o.querySelector('input').value;
        if( savingItem.quanity !== currentItem.quantity ) {
          savingItem.quantityChanged = true;
        }
      }

    }

    console.log('item to be saved now', savingItem)
    this.props.dispatch(editItem(savingItem, this.props.selectedItemClass.onCollection))
    this.props.history.push('../');
  }


  editMode(editBool, currentItem) {
    //  console.log('need to make things editable more', this);
      let infodivs = document.getElementsByClassName('itemDeets');

      for( let o of infodivs) {
        let toinput = o.querySelector('span')
        let texttemp = toinput.innerText
        toinput.innerHTML = '<input type="text" value="' + texttemp + '" >'
      }

  //    document.getElementById('canceler').className = "editViewing";
      for (let b of document.getElementsByClassName('itemViewing') ){
        b.className = 'editViewing'
        console.log(b)

      }

      let editsaveButton = document.getElementById('editsave')

      editsaveButton.innerText = "Save"

      editsaveButton.onclick = () => {
          console.log('really need to update the current item in like redux land')
          editsaveButton.style = {display:"none"}
          this.saveChanges(infodivs, currentItem)
          this.viewMode(currentItem);
        }

  }
  componentDidMount() {

    document.getElementById('canceler').className = "itemViewing"

  }

  render() {

    let editModeBool = false;
    console.log('idnumber passed in from uri', this.props.match.params.idnum)
    const urlid = parseInt(this.props.match.params.idnum, 10)
    let currentCollection = this.props.selectedItemClass.onCollection;
    console.log('current collection is', this.props)
    let currentItem = this.props.user_items.items.find(function(d){
    //  console.log(d)
      return ( parseInt(d.p_id, 10) === parseInt(urlid, 10) )
    });

    if( !currentItem ){
      currentItem = {
        name:'not here yet ',
        description:'',
        value:0.00,
        weight:0.00,
        p_id: 0.00
      }
    }

    let clickcount = 1;
    //document.getElementById('canceler').className
    console.log('currentItem = ', currentItem)
    console.log('this.props = ', this.props)
    let userbags = this.props.collections.bags;

    let inbags = [];

    for( let bag of userbags ) {
      //console.log(bag)
      for( let bagitem of bag.items ) {
      //  console.log('bagItem = ', bagitem)
        if( bagitem.name === currentItem.name) {
          console.log('item in bag, bag', bag)
          var bageditem = { bag_name: bag.name, bagID: bag.up_id, quantity: bagitem.quantity };
          inbags.push(bageditem);
        }
      }
    }

    return (
      <div className="singleItemDiv">
      <div id="itemContainDiv">
      <ItemView currentItem={currentItem} clickcount={clickcount} inbags={inbags} />
      </div>
        <button id="editsave" onClick={() => {
            if(editModeBool){
                  console.log('dont do edit mode');
                  editModeBool = false;
            }
            else {
              this.editMode(editModeBool, currentItem)
              editModeBool = true;
            }
          }
        } >Edit</button>
        <button id="canceler" onClick= {() => {
          this.viewMode(currentItem)
          //let linkforbutton = (<Link to={thispagelink}></Link>)
          }}>Cancel</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(SingleItem);

function cancelEdit(catdiv, value) {
  catdiv.querySelector('span').innerHTML = '<p>' + value + '</p>'
}



function ItemView({currentItem, clickcount, inbags}) {

  console.log(currentItem, 'item to get rendered', inbags )
  return (
    <div>
  <h2 className="itemHeader">{currentItem.name}</h2>


    <div className="itemDeets quantity" >
      <h4>Quantity:  </h4>
      <span><p>{currentItem.quantity}</p></span>
    </div>


  <div className="itemDeets description" >
    <h4>Description:</h4>
    <span>
      <p>{currentItem.description}</p>
    </span>

  </div>
  <div className="itemDeets category">
    <h4>Category:</h4>
    <span>
    <p>{currentItem.category}</p>
    </span>
  </div>
  <div className="itemDeets value">
    <h4>Value:</h4>
    <span>
    <p>{currentItem.value}</p>
    </span>

  </div>
  <div className="itemDeets weight">
    <h4>Weight:</h4>
    <span>
      <p>{currentItem.weight}</p>
    </span>
  </div>

  <div className="itemBags">
  <h4>In bags</h4>
    {
      inbags.map( (itemBag, index) => {

        return (
          <div className="itemBag" key={ "bagsitem" + index }>
            <Link to={"/userbag/" + itemBag.bagID} ><div className="itemBagName">
            {itemBag.bag_name}
              </div></Link>
              <div className="ItemBagQuantity"> quantity: {itemBag.quantity}
              </div>
            </div>
        )
      })
    }
  </div>
  </div>
)

}
