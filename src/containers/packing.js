import React from 'react'
import PropTypes from 'prop-types'

const Pack_Item = ({ onClick, packed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDeoration: packed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
)

Pack_Item.propTypes = {
  onClick: PropTypes.func.isRequired,
  packed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Pack_Item
