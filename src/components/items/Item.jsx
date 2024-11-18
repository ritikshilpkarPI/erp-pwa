import React from 'react'
import './Item.css'

const Items = (props) => {
  const { itemName, amount, index } = props
  return (
    <div key={index} className='item-container' >
      <div className='item-photo-container'>
        <div className='item-photo'></div>
      </div>
      <div className='item-name-container'>
        <h3 className='item-name'>{itemName}</h3>
        <h3 className='item-amount'>Rs{amount}</h3>
      </div>
      
    </div>
  )
}

export default Items