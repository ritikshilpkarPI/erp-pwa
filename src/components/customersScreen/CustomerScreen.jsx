import { RiArrowLeftSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import './CustomerScreen.css';
import SearchIcon from '../../icons/SearchIcon';
import { useContext, useEffect, useState } from 'react';
import { AppStateContext } from '../../appState/appStateContext'

const CustomerScreen = () => {
    const { globalState, dispatch } = useContext(AppStateContext);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const API = `${process.env.REACT_APP_SIGNUP_URL}/customers`;

    useEffect(() => {
        fetch(API)
            .then((res) => res.json())
            .then((res) => {
                dispatch({ type: 'SET_CUSTOMER_LIST', payload: res });
            })
            .catch((error) => console.error('Error fetching customer data:', error));
    }, [dispatch]);
    

    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
    };

    const handleOptionChange = (event) => {
        setSelectedCustomer(event.target.value);
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
                {globalState?.customer?.map((customer, index) => (
                    <div key={index} className="customer-content-div">
                        <h1 className="customer-content-heading">{customer.name}</h1>
                        <input
                            type="radio"
                            name="customer"
                            value={customer._id}
                            checked={selectedCustomer === customer._id}
                            onChange={handleOptionChange}
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
