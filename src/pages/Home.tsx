import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home : React.FC= () => {
    const navigate = useNavigate()
  return (
    <>
    <h1>ERP PWA APP</h1>
     <p onClick={()=> navigate('/create-category')}>Create Category</p>
     <p onClick={()=> navigate('/receipts')}>Receipts</p>
     <p onClick={()=> navigate('/tickets')}>Tickets</p>
    </>
  )
}

export default Home