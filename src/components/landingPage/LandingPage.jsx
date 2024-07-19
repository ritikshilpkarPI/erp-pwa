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
    const { globalState, dispatch } = useAppContext();
    const navigate = useNavigate();
    const [itemsList, setItemsList] = useState([]);
    const [cartList, setCartList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchItems = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SIGNUP_URL}/items`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setItemsList(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching items:", error);
            setIsLoading(false);
        }
    };

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
        setCartList(prevCart => {
            const existingItemIndex = prevCart.findIndex(item => item.ID === ID && item.priceCategory === priceCategory);
            if (existingItemIndex !== -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].count = count;
                if (updatedCart[existingItemIndex].count <= 0) {
                    updatedCart.splice(existingItemIndex, 1);
                }
                return updatedCart;
            } else if (count > 0) {
                return [...prevCart, { ID, name, prize, sold_by, priceCategory, count }];
            } else {
                return prevCart;
            }
        });
    }, []);

    useEffect(() => {
        fetchItems();
    }, []);
    useEffect(()=>{
        console.log(globalState?.cartItems);
    })

    useEffect(() => {
        if (cartList && dispatch) {
            dispatch({ type: "ADD_ITEM_TO_CART", payload: cartList });
        }
    }, [cartList, dispatch]);

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
                <NavigationMenu onClick={clickAddProduct} />
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
                            initialCount={cartList.find(cartItem => cartItem.ID === item._id && cartItem.priceCategory === "price_per_unit")?.count || 0}
                        />
                    ))
                )}
                {cartList.length > 0 && (
                    <SumTotalizerFooter cartList={cartList}
                    onClick = {clickHandler}
                    />
                )}
            </div>
            <NavigationFooter />
        </div>
    );
};

export default LandingPage;
