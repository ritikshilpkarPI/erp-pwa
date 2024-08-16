import React, { useEffect, useState } from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';
import SumTotalizerFooter from '../sumTotalizerFooter/SumTotalizerFooter';
import NavigationHeader from '../navigationHeader/NavigationHeader';
import NavigationMenu from '../navigationMenu/NavigationMenu';
import HamburgerIcon from '../../image/HamburgerIcon.svg';
import { useAppContext } from '../../appState/appStateContext';
import NavigationFooter from '../navigationFooter/NavigationFooter';
import LoadingCircle from '../loadinCircule/LoadingCircle';
import ItemCard from '../itemCard/ItemCard';

const LandingPage = () => {
    const navigate = useNavigate();
    const { globalState, dispatch } = useAppContext();
    const [itemList, setItemList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchItem = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SIGNUP_URL}/items`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            dispatch({ type: "SET_ITEMS", payload: data });
            setItemList(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching items:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchItem();
        // eslint-disable-next-line
    }, []);

    const addToCart = (_id, name, count, price, pricePer) => {
        const itemIndex = globalState?.cartItems.findIndex(item => item._id === _id && item.pricePer === pricePer);
        const updatedCart = [...globalState?.cartItems];

        if (itemIndex !== -1) {
            updatedCart[itemIndex].count = count;
            if (updatedCart[itemIndex].count <= 0) {
                updatedCart.splice(itemIndex, 1);
            }
        } else if (count > 0) {
            updatedCart.push({ _id, name, count, price, pricePer });
        }

        dispatch({ type: "ADD_ITEM_TO_CART", payload: updatedCart });


    };

    const clickHandler = () => {
        navigate("/placeorder");
    };

    const handleHamburger = () => {
        dispatch({ type: 'TOGGLE_DRAWER' });
    };

    const clickAddProduct = () => {
        navigate("/addproduct");
    };

    return (

        <div className='landing-page-container'>
            <div className='landing-page-header-container'>
                <NavigationHeader
                    title="Items"
                    titleClassName="navigation-header-items"
                    NavigationHeaderImage={HamburgerIcon}
                    NavigationHeaderImageClassName="back-button-image-full"
                    onClick={handleHamburger}
                />
                <NavigationMenu onClick={clickAddProduct} setItemsList={setItemList} />
            </div>
            <div className='landing-page-item-card-container'>
                {isLoading
                    ? (<LoadingCircle />)
                    : (itemList.map(item => {
                        const cartItem = globalState?.cartItems.find(cartItem => cartItem._id === item._id);
                        return (
                            <ItemCard
                                key={item._id}
                                _id={item._id}
                                name={item.name}
                                img_url={item.img_url}
                                price_per_carton={item.price_per_carton}
                                price_per_dozen={item.price_per_dozen}
                                price_per_unit={item.price_per_unit}
                                addToCart={addToCart}
                                count={cartItem?.count}
                                _pricePer={cartItem?.pricePer}
                            />
                        );
                    })
                    )
                }
                {globalState?.cartItems.length > 0 && (
                    <SumTotalizerFooter
                        cartList={globalState?.cartItems}
                        onClick={clickHandler}


                    />
                )}
            </div>
            <NavigationFooter />
        </div>
    );
};

export default LandingPage;
