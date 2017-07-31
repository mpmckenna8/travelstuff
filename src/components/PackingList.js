
import React from 'react'
import PropTypes from 'prop-types'
import PackingItem from './PackingItem'


const PackingList = ({ packingItems, onTodoClick }) => {
  console.log(packingItems)
  return (
  <ul>
    {packingItems.map(packingItem =>  {
      console.log('packitem', packingItem)
      return  (<PackingItem
          key={packingItem.id}
          {...packingItem}
          onClick={() => onTodoClick(packingItem.id)}
        />)
        }
      )}
    </ul>
)}



PackingList.propTypes = {
  packingItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    packed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    quantity: PropTypes.number
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired
}


export default PackingList
