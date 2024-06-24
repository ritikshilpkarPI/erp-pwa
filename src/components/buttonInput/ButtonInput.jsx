import React from 'react'

const Buttonnput = (props) => {

    const{className, title, onClick} = props

  return (
    <button className={className} onClick={onClick} >{title}</button>
  )
}

export default Buttonnput