import React from 'react'

export default props => {
  const { children, href, ...rest } = props
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  )
}
