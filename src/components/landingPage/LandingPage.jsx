import React, { useEffect, useState, useCallback } from 'react';
import './LandingPage.css';
import NavigationHeader from '../navigationHeader/NavigationHeader';
import NavigationMenu from '../navigationMenu/NavigationMenu';
import HamburgerIcon from '../../image/HamburgerIcon.svg';
import ItemCard from '../itemCard/ItemCard';
import NavigationFooter from '../navigationFooter/NavigationFooter';
import { useAppContext } from '../../appState/appStateContext';
import { useNavigate } from 'react-router-dom';
import LoadingCircle from '../loadinCircule/LoadingCircle';
import SumTotalizerFooter from '../sumTotalizerFooter/SumTotalizerFooter';

const LandingPage = () => {
    const navigate = useNavigate();
    const { globalState, dispatch } = useAppContext();
    const [itemsList, setItemsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchItems = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SIGNUP_URL}/items`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            dispatch({ type: "SET_ITEMS", payload: data });
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching items:", error);
            setIsLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    useEffect(() => {
        setItemsList(globalState?.items || []);
    }, [globalState?.items]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        dispatch({ type: "SET_CART_ITEMS", payload: storedCart });
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(globalState.cartItems));
    }, [globalState.cartItems]);

    const handleHamburger = () => {
        dispatch({ type: 'TOGGLE_DRAWER' });
    };

    const clickAddProduct = () => {
        navigate("/addproduct");
    };

    const clickHandler = () => {
        navigate("/placeorder");
    };

    const addToCart = useCallback((ID, name, { prize, sold_by }, priceCategory, count) => {
        const updatedCart = globalState.cartItems.slice();
        const existingItemIndex = updatedCart.findIndex(item => item.ID === ID && item.priceCategory === priceCategory);

        if (existingItemIndex !== -1) {
            updatedCart[existingItemIndex].count = count;
            if (updatedCart[existingItemIndex].count <= 0) {
                updatedCart.splice(existingItemIndex, 1);
            }
        } else if (count > 0) {
            updatedCart.push({ ID, name, prize, sold_by, priceCategory, count });
        }

        dispatch({ type: "ADD_ITEM_TO_CART", payload: updatedCart });
    }, [globalState.cartItems, dispatch]);

    const getInitialCount = (itemId, priceCategory) => {
        const item = globalState.cartItems.find(cartItem => cartItem.ID === itemId && cartItem.priceCategory === priceCategory);
        return item ? item.count : 0;
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
                <NavigationMenu onClick={clickAddProduct} setItemsList={setItemsList} />
            </div>
            <div className='landing-page-item-card-container'>
                {isLoading ? (
                    <LoadingCircle />
                ) : (
                    itemsList.map((item) => (
                        <ItemCard
                            key={item._id}
                            ID={item._id}
                            name={item.name}
                            price_per_carton={item.price_per_carton}
                            price_per_dozen={item.price_per_dozen}
                            price_per_unit={item.price_per_unit}
                            img_url={item.img_url}
                            prize={item.prize}
                            addToCart={addToCart}
                            initialUnitCount={getInitialCount(item._id, "price_per_unit")}
                            initialDozenCount={getInitialCount(item._id, "price_per_dozen")}
                            initialCartonCount={getInitialCount(item._id, "price_per_carton")}
                        />
                    ))
                )}
                {globalState.cartItems.length > 0 && (
                    <SumTotalizerFooter
                        cartList={globalState.cartItems}
                        onClick={clickHandler}
                    />
                )}
            </div>
            <NavigationFooter />
        </div>
    );
};

export default LandingPage;
