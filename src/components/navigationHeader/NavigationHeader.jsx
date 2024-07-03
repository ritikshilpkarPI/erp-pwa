import React from 'react'
import './NavigationHeader.css'
import NavigationButton from '../navigationButton/NavigationButton'


const NavigationHeader = (props) => {

    const { title, titleClassName, NavigationHeaderImage, NavigationHeaderImageClassName, onClick} = props

    


    return (
        <div className='navigation-header-container addproduct'>

            <NavigationButton
                onClick={onClick}
                NavigationHeaderImage={NavigationHeaderImage}
                NavigationHeaderImageClassName={NavigationHeaderImageClassName}
            />
            <h3 className={titleClassName}>{title}</h3>

            <div className='dummy-div'></div>


        </div>
    )
}

export default NavigationHeader