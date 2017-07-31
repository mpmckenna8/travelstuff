import React from 'react'
import PropTypes from 'prop-types'

const PackingItem = ({ onClick, packed, text, quantity }) => (
  <li
    className="packingItem"
    onClick={onClick}
    style={{
      textDecoration: packed  ? 'line-through' : 'none'
    }}
  >

    <span>{text}</span>
    <span> {quantity}</span>
  </li>
)


PackingItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  packed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  quantity: PropTypes.number
}

export default PackingItem
