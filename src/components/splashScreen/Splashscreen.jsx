import './SplashScreen.css';
import splashImage from '../../image/SplashImage.svg';
import ButtonInput from '../buttonInput/ButtonInput';
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
    
    const navigate = useNavigate();
     
    const signUpNavigateFunc = () => {
        navigate('/signup'); 
    };
    
    const signInNavigateFunc = () => {
        navigate('/login'); 
    };

    return (
        <div className='splash-screen-container'>
                <div className='app-name-container'>
                    <h1 className='app-name'>Invoicify</h1>
                </div>
            <div className='splash-intro'>
                <div className='splash-image-container'>
                    <img src={splashImage} alt="Splash" />
                </div>
                <div className='splash-text-container'>
                    <p className='splash-text'>Easy Management for your Store.</p>
                </div>
               
            </div>


            <div className='splash-button-container'>
                <ButtonInput
                    className='splash-Sign-up-button'
                    title='Create a new account'
                    onClick={signUpNavigateFunc}
                />
                <ButtonInput
                    className='splash-Sign-in-button'
                    title='Log In'
                    onClick={signInNavigateFunc}
                />
            </div>
        </div>
    );
};

export default SplashScreen;
