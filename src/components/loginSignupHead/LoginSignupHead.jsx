import React from 'react'

import './LoginSignupHead.css'
import BackButton from '../backButton/BackButton'

import { useNavigate } from "react-router-dom";

const LoginSignupHead = () => {

    const navigate = useNavigate();

    const backFunc = () => {
        navigate('/splash');
    }


    return (
        <div className='login-signup-head'>

            <BackButton
                onClick={backFunc}
            />
            <div className='login-signup-title-container'>
                <h3 className='login-signup-title'>Log in</h3>
            </div>

            <div className='dummy-div'></div>


        </div>
    )
}

export default LoginSignupHead