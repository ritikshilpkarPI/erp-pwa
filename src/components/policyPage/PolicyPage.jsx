// src/PolicyPage.js
import React from 'react';
import './PolicyPage.css'; // Import the CSS file for styling
import backButtonicon from '../../image/BackIcon.svg';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../navigationHeader/NavigationHeader';



const PolicyPage = () => {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(-1);
    };
    return (
        <div className="policy-container">
            <NavigationHeader
                title="Policy"
                titleClassName="policy-header-categorys"
                NavigationHeaderImage={backButtonicon}
                NavigationHeaderImageClassName="back-button-image-icon"
                onClick={clickHandler}
            />

            <div className='policy-text-container'>

                <section className="policy-section">
                    <h2>Terms and Conditions</h2>
                    <p>
                        This app is for business purposes. Clients can log into the app and add a list of our items and categories.
                        They can select the products they need and add them to their cart. They can also modify the cart,
                        including changing the total price. Additionally, a customer can download the app and use it to manage
                        their orders, which can be sent via email or WhatsApp.
                    </p>
                    <p>
                        By using this app, you agree to adhere to our terms and conditions. Any misuse of the app, including
                        but not limited to, fraudulent activities, unauthorized modifications, and data breaches, may result in
                        the termination of your account and potential legal actions.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>Privacy Policy</h2>
                    <p>
                        We are committed to protecting your privacy. Your personal information, including your name, contact details,
                        and order history, will be used solely for the purpose of managing your orders and improving our services.
                        We do not share your personal information with third parties without your consent, except as required by law.
                    </p>
                    <p>
                        Our app uses secure protocols to ensure the safety of your data. However, we recommend that you take appropriate
                        measures to safeguard your personal information while using our app.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>Order Management Policy</h2>
                    <p>
                        Customers can manage their orders through the app. Orders can be added to the cart, modified, and finalized
                        before being sent via email or WhatsApp. It is the customer's responsibility to ensure the accuracy of the
                        order details before submission.
                    </p>
                    <p>
                        Once an order is submitted, it cannot be canceled or modified through the app. If you need to make changes to
                        an order after submission, please contact our customer support team for assistance.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PolicyPage;
