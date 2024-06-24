import React from 'react'
import './CreateMenuPage.css'
import CartIcon from '../icons/CartIcon'

const TotalBar = () => {
  return (
    <div className='total-bar'>
        <div className="total-bar-left">
        <CartIcon/>
        <h4 className='total-bar-left-h4'>8 elements</h4>
        </div>
        <div className="total-bar-right">
        <h4 className='total-bar-left-h4'>Total : INR 200.00</h4>
        </div>
    </div>
  )
}

export default TotalBar