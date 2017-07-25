import React from 'react'
import PropTypes from 'prop-types'

const PackingItem = ({ onClick, packed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: packed  ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
)


PackingItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  packed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default PackingItem
