import { RiArrowLeftSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import './CustomerScreen.css';
import SearchIcon from '../../icons/SearchIcon';
import { useContext, useEffect } from 'react';
import { AppStateContext } from '../../appState/appStateContext';

const CustomerScreen = () => {
    const { globalState, dispatch } = useContext(AppStateContext);
    const API = `${process.env.REACT_APP_SIGNUP_URL ?? 'http://localhost:8000/api/v1'}/customers`;


    useEffect(() => {
        fetch(API)
            .then((res) => res.json())
            .then((res) => {
                dispatch({ type: 'SET_CUSTOMERS_LIST', payload: res });
            })
            .catch((error) => console.error('Error fetching customer data:', error));
    }, [dispatch, API]);

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    const SelectedCustomerFuns = (customerId) => {
        const selectedCustomer = globalState.customers.find(customer => customer._id === customerId);
        dispatch({ type: 'SET_CUSTOMER', payload: selectedCustomer });
    };


    return (
        <div className="customer-screen-container">
            <div className="customer-header">
                <div className="customer-header-top">
                    <RiArrowLeftSLine className="arrow-icon icon" onClick={handleBackClick} />
                    <h1 className="customer-heading">Customer</h1>
                </div>
                <div className="customer-header-bottom">
                    <div className="customer-input">
                        <input
                            className="search-input"
                            type="text"
                            placeholder="Search for a name, a contact, or an email"
                        />
                        <SearchIcon />
                    </div>
                </div>
            </div>
            <div className="customer-content">
                {globalState?.customers?.map((customer) => (
                    <div
                        key={customer._id}
                        className="customer-content-div"
                        onClick={() => SelectedCustomerFuns(customer._id)}
                    >
                        <label
                            className="customer-content-heading"
                            htmlFor={customer._id}
                        >
                            {customer.name}
                        </label>
                        <input
                            type="radio"
                            name="customer"
                            id={customer._id}
                            value={customer._id}
                            checked={globalState.setCustomer?._id === customer._id}
                        />
                    </div>
                ))}
            </div>
            <div className="customer-bottom" onClick={() => navigate('/addcustomer')}>
                <div className="customer-bottom-button">Add a new client</div>
            </div>
        </div>
    );
};

export default CustomerScreen;
