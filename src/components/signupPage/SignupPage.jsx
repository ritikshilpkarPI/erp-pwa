import React, { useState } from 'react'
import './SignupPage.css';

import NavigationHeader from '../navigationHeader/NavigationHeader';
import backButtonImage from '../../image/BackButton.svg'
import ButtonInput from '../buttonInput/ButtonInput';
import TextInput from '../textInput/TextInput';

import { useNavigate } from 'react-router-dom';


const SignupPage = () => {

    const [newEmail, setNewEmail] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState();
    const [newPassword, setNewPassword] = useState('');




    const navigate = useNavigate();


    const backFunc = () => {
        navigate(-1);
    }


    return (
        <div className='signup-page-container'>

            <NavigationHeader
                title='Sign up'
                titleClassName='navigation-header-signup'
                NavigationHeaderImage={backButtonImage}
                NavigationHeaderImageClassName='back-button-image-full'
                onClick={backFunc}
            />

            <div className='signup-form-container'>

                <form action="" className='signup-form'>
                    <TextInput
                        className='signup-user-email-input'
                        type='email'
                        labelTitle='Email'
                        placeholder='Email'
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />

                    <TextInput
                        className='signup-user-phone-number-input'
                        type='number'
                        labelTitle='Phone Number'
                        placeholder='Phone Number'
                        value={newPhoneNumber}
                        onChange={(e) => setNewPhoneNumber(e.target.value)}
                    />

                    <TextInput
                        className='signup-user-password-input'
                        type='password'
                        labelTitle='Password'
                        placeholder='Password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <ButtonInput
                        type='submit'
                        className='signup-submit-button-input'
                        title='Submit'
                        onClick={() => navigate('/cart')}
                    />

                </form>

            </div>



        </div>
    )
}

export default SignupPage