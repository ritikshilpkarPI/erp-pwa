import React from 'react'
import NewInvoice from '../components/invoice/Invoice'
import { useLocation, useNavigate } from "react-router-dom";
import NavigationHeader from '../components/navigationHeader/NavigationHeader';
import backIconImage from "../image/BackIcon.svg";

const InvoicePrivate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
    };
    const data = location?.state;
    const transactionId = location?.state?.transaction._id;
    return (
        <div>
            <NavigationHeader
                title="Invoice"
                titleClassName="navigation-invoice-login"
                NavigationHeaderImage={backIconImage}
                NavigationHeaderImageClassName="back-button-image-full"
                onClick={handleBackClick}
            />
            <NewInvoice
                data={data}
                transactionId={transactionId}
                printerWidth="58mm"
            />

        </div>
    )
}

export default InvoicePrivate