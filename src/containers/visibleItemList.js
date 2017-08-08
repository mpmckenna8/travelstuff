import React, {Component} from 'react'
import { connect } from 'react-redux'

// visible itemlist to go here interacting with reducer
class VisibleItemList  extends Component  {
  componentDidMount() {
  //const {selectedItemClass } = this.props
    console.log('mounted visible item list, thisprops = ', this.props)
  //  dispatch(addItem('blah',this.props.selectedItemClass ))

  }

  render() {

//    console.log('rerendering maybe list changed')
    let itemarray = this.props.itemsByType[this.props.selectedItemClass]
  //  console.log('itemarray', itemarray)
    return (
      <div>
        <ul>
           {itemarray.items.map( (item,i) => (
              <li key={i}>{item.name}</li>
            ))}

            </ul>
      </div>

    )
  }
}


const mapStateToProps = state => {
  return state;

}

export default connect(mapStateToProps)(VisibleItemList)


//    {itemarray.map(item => (
//      <p>item.name</p>
//    ))}
