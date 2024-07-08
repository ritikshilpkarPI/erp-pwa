import React, { useContext, useMemo } from 'react';
import './PlaceOrderScreen.css';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
// import DeleteIcon from '../../icons/DeleteIcon';
import { useNavigate } from 'react-router-dom';
import { AppStateContext } from '../../appState/appStateContext';

const PlaceOrderScreen = () => {
    const { globalState } = useContext(AppStateContext);
    const navigate = useNavigate();

    const handleClickBack = () => {
        navigate("/cart");
    };

    const handleClickCustomer = () => {
        navigate('/customers');

    };
    const handleClickPayment = () => {
        navigate('/payment');

    };

    const totalPrice = useMemo(() => {
        return globalState.cartItems.reduce((total, item) => total + (item.price_per_unit * item.count), 0).toFixed(2);
    }, [globalState.cartItems]);

    return (
        <div className="placeorder-screen-container">
            <div className='placeorder-head'>
                <RiArrowLeftSLine className="arrow-icon icon" onClick={handleClickBack} />
                <h1 className='placeorder-heading'>Order Details</h1>
            </div>
            <hr />
            <div className='placeorder-head-bottom'>
                <h1 className='placeorder-head-bottom-heading'>{globalState.setCustomer?.name || "Customer"}</h1>
                <RiArrowRightSLine className="arrow-icon icon2" onClick={handleClickCustomer} />
            </div>
            <div className='placeorder-buttons'>
                <button>Take-away</button>
                <button>Delivery</button>
                <button>Eat-in</button>
            </div>
            <div className='placeorder-content'>
                <div className='placeorder-list-content'>
                    {globalState?.cartItems?.map((cartItem, index) => (
                        <div className='placeorder-content-div' key={index}>
                            <button>{cartItem.count}</button>
                            <div className='placeorder-menu'>{cartItem.name}</div>
                            <div className='placeorder-price'>රු{cartItem.price_per_unit}</div>
                        </div>
                    ))}
                </div>
                <div className='placeorder-diskon'>
                    <h1>Discount</h1>
                    <RiArrowRightSLine className="arrow-icon icon3" />
                </div>
                <div className='placeorder-total'>
                    <h1>Subtotal</h1>
                    <h1>රු{totalPrice}</h1>
                </div>
                {/* <div className='placeorder-delete'>
                    <DeleteIcon />
                    <p>Delete the order</p>
                </div> */}
            </div>
            <div className='placeorder-bottom'>
                <div className='placeorder-total'>
                    <h1>Subtotal</h1>
                    <h1>රු{totalPrice}</h1>
                </div>
                <div className='placeorder-bottom-button' onClick={handleClickPayment}>Place an order</div>
            </div>
        </div>
    );
};

export default PlaceOrderScreen;
