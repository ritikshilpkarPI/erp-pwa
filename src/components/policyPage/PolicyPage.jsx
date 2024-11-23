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
                    <h2>Privacy Policy</h2>
                    <p>
                        Effective Date: 02/08/2024 <br />
                        Last Updated: 07/11/2024 
                    </p>
                    <p>
                        Invoicify is committed to protecting your privacy.
                        This Privacy Policy explains how we collect, use, and disclose your information when you use our app.
                    </p>
                    <p>
                        1. Information We Collect <br />
                        We may collect the following information: <br />
                        Personal Information: Name, contact details, and order history for managing your orders. <br />
                        Usage Data: Information about your interactions with the app, such as cart activities and order submissions.
                    </p>
                    <p>
                        2. How We Use Your Information <br />
                        We use your information to: <br />
                        Manage and process your orders. <br />
                        Improve app functionality and user experience. <br />
                        Communicate order-related updates via email or WhatsApp.
                    </p>

                    <p>
                        3. Sharing Your Information <br />
                        We do not share your personal information with third parties without your consent, except: <br />
                        Legal Requirements: To comply with legal obligations. <br />
                        Service Providers: To facilitate app features like email or WhatsApp integrations.
                    </p>
                    <p>
                        4. Security <br />
                        We use secure protocols to protect your data. However, users are encouraged to take additional measures to ensure the safety of their personal information while using the app.
                    </p>
                    <p>
                        5. Order Management <br />
                        Customers can manage their orders through the app. Orders can be added, modified, and finalized before being sent via email or WhatsApp. Once submitted, orders cannot be modified within the app. For changes, please contact our support team.
                    </p>
                    <p>
                        6. Changes to This Policy <br />
                        We may update this Privacy Policy periodically. Any changes will be posted on this page.
                    </p>
                    <p>
                        7. Contact Us <br />
                        If you have any questions about this Privacy Policy, please contact us at:
                        Email: contact@priyaminnovations.com

                    </p>
                </section>

                <section className="policy-section">
                    <h2>Terms and Conditions</h2>
                    <p>By using Invoicify, you agree to the following terms and conditions:</p>

                    <p>
                        1. Usage of the App <br />
                        The app is designed for business purposes, allowing clients to manage items, categories, and orders efficiently.
                        Customers can add products to their cart, modify the cart (including total price changes), and finalize orders.
                    </p>
                    <p>
                        2. User Responsibilities <br />
                        Ensure the accuracy of order details before submission.
                        Misuse of the app, including fraudulent activities or unauthorized modifications, may result in account termination and legal action.
                    </p>
                    <p>
                        3. Order Policy <br />
                        Once an order is submitted, it cannot be canceled or modified through the app. For changes, contact customer support. <br />
                        Orders can be sent via email or WhatsApp as per customer preferences.
                    </p>
                    <p>
                        4. Termination <br />
                        We reserve the right to terminate accounts involved in activities that violate these terms.
                    </p>
                    <p>
                        5. Changes to Terms <br />
                        We may update these terms periodically. Continued use of the app signifies your acceptance of the updated terms.
                    </p>
                    <p>
                        6. Contact Us <br />
                        For questions or concerns regarding these terms, contact us at:
                        Email: contact@priyaminnovations.com
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
