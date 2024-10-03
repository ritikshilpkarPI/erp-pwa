import "./PublicInvoice.css"
import React, { useEffect, useState } from 'react';
import NavigationHeader from '../navigationHeader/NavigationHeader';
import { useParams } from 'react-router-dom';
import LoadingCircle from '../loadinCircule/LoadingCircle';

const PublicInvoice = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);


    const [invoice, setInvoice] = useState({
        resolvedItems: [],
        customer: {},
        employee: {},
        totalAmount: 0,
        totalQuantity: 0,
        date_of_sale: new Date()
    });

    const fetchTransaction = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SIGNUP_URL}/share-invoice`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setInvoice(data);

        } catch (error) {
            console.error("Error fetching transaction:", error);
        }
        finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchTransaction(id);
        // eslint-disable-next-line
    }, [id]);

    useEffect(() => {
        console.log(invoice);
    }, [invoice]);

    return (
        <div className="PublicInvoice"  >
            <NavigationHeader
                title="Invoice"
                titleClassName="navigation-header-payment"
            />

            {isLoading
                ? <div style={{ height: "80svh", width: "100%", display: 'flex', alignItems: "center", justifyContent: 'center' }}>
                    <LoadingCircle />
                </div>

                : <div className="invoice-container">
                    <div className="invoice-header">
                        <h2>BILL INVOICE</h2>
                        <div className="invoice-header-body">
                            <div className="invoice-header-left">
                                <p><strong>Customer Name:</strong> {invoice.customer?.name || 'N/A'}</p>
                                <p><strong>Total Amount:</strong> {invoice.totalAmount || 'N/A'}</p>
                                <p><strong>Total Items:</strong> {invoice.totalQuantity || 'N/A'}</p>
                            </div>
                            <div className="invoice-header-right">
                                <p><strong>Business Name:</strong> {invoice.employee?.business_name || 'N/A'}</p>
                                <p><strong>Address:</strong> {invoice.employee?.address || 'N/A'}</p>
                                <p><strong>Number:</strong> {invoice.employee?.phone_number || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="invoice-body">
                        <table>
                            <thead>
                                <tr>
                                    <th>SR NO.</th>
                                    <th>NAME</th>
                                    <th>RATE (Rs.)</th>
                                    <th>QTY</th>
                                    <th>VALUE (Rs.)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoice.resolvedItems.length > 0 ? (
                                    invoice.resolvedItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item._name}</td>
                                            <td>{item._prize}</td>
                                            <td>{item._count}</td>
                                            <td>{item._prize * item._count}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">No items found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <p style={{fontSize:'18px'}}><strong>SUB TOTAL:</strong> {invoice.totalAmount || 'N/A'}</p>
                        <p style={{fontSize:'12px'}} className='date-time'><strong>Order Time:</strong> {new Date(invoice.date_of_sale).toLocaleTimeString() || 'N/A'}</p>
                        <p style={{fontSize:'12px'}} className='date-time'><strong>Order Date:</strong> {new Date(invoice.date_of_sale).toLocaleDateString() || 'N/A'}</p>
                    </div>
                </div>

            }

        </div>

    );
};

export default PublicInvoice;
