import React from 'react'
import "./MainNav.css";
import HamburgerIcon from '../icons/HamburgerIcon';

const MainHeader = () => {
  return (
    <div className='main-header'>
        <HamburgerIcon/>
        <h1 className='main-header-h1'>Caissier</h1>
    </div>
  )
}

export default MainHeader