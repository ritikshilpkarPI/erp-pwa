import React, { useState } from 'react';
import './LoginPage.css';
import LoginSignupHead from '../loginSignupHead/LoginSignupHead';
import ButtonInput from '../buttonInput/ButtonInput';
import TextInput from '../textInput/TextInput';

const LoginPage = () => {

    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');

    const htmlErrow = '>'



    const loginUserFormFunc = (event) => {
        event.preventDefault();
    };

    return (
        <div className='login-page-container'>
            <LoginSignupHead />

            <div className='login-form-container' >

                <form className='login-form' onSubmit={loginUserFormFunc} action="">
                    <TextInput
                        className='login-user-id-input'
                        type='text'
                        labelTitle='Email or Phone Number'
                        placeholder='Email or Phone Number'
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                    />

                    <TextInput
                        className='login-user-password-input'
                        type='password'
                        labelTitle='Password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <ButtonInput
                        type='submit'
                        className='login-submit-button-input'
                        title='Submit'
                    />
                </form>
                <div className='login-page-information-container'>
                    <p className='login-page-information'><span>Use the cash register code that can be created by the owner in</span><span>Manage Store -{htmlErrow} Cashier Code</span></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
