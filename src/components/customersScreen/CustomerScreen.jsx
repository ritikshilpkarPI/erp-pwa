import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import './CustomerScreen.css';
import SearchIcon from '../../icons/SearchIcon';
import { useEffect, useState } from 'react';

const CustomerScreen = () => {
    const [customerList, setCustomerList] = useState([]);
    const API = 'http://localhost:8000/api/v1/customers';

    useEffect(() => {
        fetch(API)
            .then((res) => res.json())
            .then((res) => setCustomerList(res))
            .catch((error) => console.error('Error fetching customer data:', error));
    }, []); 

    useEffect(() => {
        console.log(customerList);
    }, [customerList]);

    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
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
                {customerList.map((customer) => (
                    <div key={customer.id} className="customer-content-div">
                        <h1 className="customer-content-heading">{customer.name}</h1>
                        <RiArrowRightSLine className="arrow-icon icon2" />
                    </div>
                ))}
            </div>
            <div className="customer-bottom" onClick={()=>navigate(-1)}>
                <div className="customer-bottom-button">Add a new client</div>
            </div>
        </div>
    );
};

export default CustomerScreen;
