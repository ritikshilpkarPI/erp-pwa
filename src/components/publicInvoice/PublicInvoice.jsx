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
        <div className="public-invoice"  >
            <NavigationHeader
                title="Invoice"
                titleClassName="navigation-header-payment"
            />

            {isLoading
                ? <div style={{ height: "80svh", width: "100%", display: 'flex', alignItems: "center", justifyContent: 'center' }}>
                    <LoadingCircle />
                </div>

                : <div className="public-invoice-container">
                    <div className="public-invoice-header">
                        <h2 className="public-invoice-header-h2">INVOICE</h2>
                        <div className="public-invoice-header-body">
                            <div className="public-invoice-header-left">
                                <p className="public-invoice-header-left-p"><strong>Business Name:</strong> {invoice.employee?.business_name || 'N/A'}</p>
                                <p className="public-invoice-header-left-p"><strong>Address:</strong> {invoice.employee?.address || 'N/A'}</p>
                                <p className="public-invoice-header-left-p"><strong>Number:</strong> {invoice.employee?.phone_number || 'N/A'}</p>
                            </div>
                            <div className="public-invoice-header-right">
                                <p className="public-invoice-header-right-p"><strong>{invoice.customer?.name ?"Customer Name:" : "Type"}</strong> {invoice.customer?.name || 'Cash'}</p>
                                <p className="public-invoice-header-right-p"><strong>Total Amount:</strong> {invoice.totalAmount || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="public-invoice-body">
                        <table className="public-invoice-body-table">
                            <thead className="public-invoice-body-table-thead">
                                <tr className="public-invoice-body-table-thead-tr">
                                    <th className="public-invoice-body-table-thead-tr-th">SR NO.</th>
                                    <th className="public-invoice-body-table-thead-tr-th">NAME</th>
                                    <th className="public-invoice-body-table-thead-tr-th">RATE (Rs.)</th>
                                    <th className="public-invoice-body-table-thead-tr-th">QTY</th>
                                    <th className="public-invoice-body-table-thead-tr-th">VALUE (Rs.)</th>
                                </tr>
                            </thead>
                            <tbody className="public-invoice-body-table-tbody">
                                {invoice.resolvedItems.length > 0 ? (
                                    invoice.resolvedItems.map((item, index) => (
                                        <tr className="public-invoice-body-table-tbody-tr" key={index}>
                                            <td className="public-invoice-body-table-tbody-tr-td">{index + 1}</td>
                                            <td className="public-invoice-body-table-tbody-tr-td">{item._name}</td>
                                            <td className="public-invoice-body-table-tbody-tr-td">{item._prize}</td>
                                            <td className="public-invoice-body-table-tbody-tr-td">{item._count}</td>
                                            <td className="public-invoice-body-table-tbody-tr-td">{item._prize * item._count}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">No items found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="public-invoice-body-bottom">
                            <div className="public-invoice-body-bottom-left">
                                <p className="public-invoice-body-bottom-left-p"><strong>Total Items: {invoice.totalQuantity || 'N/A'}</strong></p>
                                <p className="public-invoice-body-bottom-left-p"><strong>SUB TOTAL: {invoice.totalAmount || 'N/A'}</strong></p>
                            </div>
                            <div className="public-invoice-body-bottom-right">
                                <p  className="public-invoice-body-bottom-right-p"><strong>Order Time:</strong> {new Date(invoice.date_of_sale).toLocaleTimeString() || 'N/A'}</p>
                                <p  className="public-invoice-body-bottom-right-p"><strong>Order Date:</strong> {new Date(invoice.date_of_sale).toLocaleDateString() || 'N/A'}</p>
                            </div>
                        </div>


                    </div>
                </div>

            }

        </div>

    );
};

export default PublicInvoice;
