import React from 'react'
import PropTypes from 'prop-types'

const Link = ({ active, children, onClick, requestItems }) => {

  if(children ==="Refresh"){
    return (
      <a href="#" onclick={e => {
          e.preventDefault();
          requestItems('all')
        }}
        >
        {children}
      </a>
    )
  }
  if (active) {
    return <span>{children}</span>
  }

  return (
    // eslint-disable-next-line
    <a href="#"
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  )
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  requestItems: PropTypes.func.isRequired
}

export default Link
