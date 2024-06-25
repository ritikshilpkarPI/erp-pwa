import React from 'react'
import backButton from '../image/BackButton.svg'
import './BackButton.css'

const BackButton = (props) => {
    const {onClick} = props
    return (
        <div className='back-button-container' onClick={onClick}>
            <img className='back-button' src={backButton} alt="" />
        </div>
    )
}

export default BackButton