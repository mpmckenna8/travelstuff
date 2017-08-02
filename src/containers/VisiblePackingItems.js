import { connect } from 'react-redux'
import { toggleTodo, requestItems } from '../actions'
import PackingList from '../components/PackingList'

const getVisibleItems = (packingItems, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return packingItems
    case 'SHOW_PACKED':
      return packingItems.packingItems.filter(t => t.packed)
    case 'SHOW_ACTIVE':
      return packingItems.packingItems.filter(t => !t.packed)
    case "REQUEST_ITEMS":
      console.log('need to request new packing items dont want this called in here')
    //  dispatch(requestItems('all'))
      return packingItems;
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}


const mapStateToProps = state => {
  return {
    bleep:'bloop',
    packingItems: getVisibleItems(state.packingItems, state.visibilityFilter)
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    },
    requestItems: typeItem => {
      dispatch(requestItems(typeItem))
    }
  }
}

const VisiblePackingItems = connect(
  mapStateToProps,
  mapDispatchToProps
)(PackingList)

export default VisiblePackingItems
