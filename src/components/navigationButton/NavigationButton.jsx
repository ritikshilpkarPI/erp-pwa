import React from 'react'
import './NavigationButton.css'


const NavigationButton = (props) => {
    const {onClick, NavigationHeaderImage, NavigationHeaderImageClassName} = props
    return (
        <div className='navigation-button-container' onClick={onClick}>
            <img className={NavigationHeaderImageClassName} src={NavigationHeaderImage} alt="" />
        </div>
    )
}

export default NavigationButton;