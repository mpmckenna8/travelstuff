import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import PackingList from '../components/PackingList'

const getVisibleTodos = (packingItems, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return packingItems
    case 'SHOW_PACKED':
      return packingItems.filter(t => t.packed)
    case 'SHOW_ACTIVE':
      return packingItems.filter(t => !t.packed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = state => {
  return {
    packingItems: getVisibleTodos(state.packingItems, state.visibilityFilter)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisiblePackingItems = connect(
  mapStateToProps,
  mapDispatchToProps
)(PackingList)

export default VisiblePackingItems
