import React from 'react'
import './BackButton.css'


const BackButton = (props) => {
    const {onClick,backButton} = props
    return (
        <div className='back-button-container' onClick={onClick}>
            <img className='back-button' src={backButton} alt="" />
        </div>
    )
}

export default BackButton;