import React from 'react'
import './CreateMenuPage.css'
import CreateListTile from './CreateListTile'

const MenuPageBody = () => {
  return (
    <div className='menu-page-body'>
      <CreateListTile/>
      <CreateListTile/>
    </div>
  )
}

export default MenuPageBody