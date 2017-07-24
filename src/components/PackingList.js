
import React from 'react'
import PropTypes from 'prop-types'
import PackingItem from './PackingItem'

const PackingList = ({ packingItems, onTodoClick }) => (
  <ul>
    {packingItems.map(packingItem =>
      <PackingItem
        key={packingItem.id}
        {...packingItem}
        onClick={() => onTodoClick(packingItem.id)}
      />
    )}
  </ul>
)

PackingList.propTypes = {
  packingItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired
}

export default PackingList
