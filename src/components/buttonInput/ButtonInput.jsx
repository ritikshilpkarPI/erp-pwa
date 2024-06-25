import React from 'react'

const ButtonInput = (props) => {

    const{className, title, onClick , type} = props

  return (
    <button type={type} className={className} onClick={onClick} >{title}</button>
  )
}

export default ButtonInput