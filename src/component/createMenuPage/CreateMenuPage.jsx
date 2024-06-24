import React from 'react'
import '../createMenuPage/CreateMenuPage.css'
import MainNav from '../mainNavbar/MainNav'
import MenuPageBody from './MenuPageBody'
import CreateBottomNav from './CreateBottomNav'

const CreateMenuPage = () => {
  
  return (
    <div className='create-menu-page'>
        <MainNav/>
        <MenuPageBody/>
        <CreateBottomNav />
    </div>
  )
}

export default CreateMenuPage