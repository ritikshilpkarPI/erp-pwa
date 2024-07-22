import React, { useState, useEffect, useCallback } from 'react';
import './ItemCard.css';
import Minus from '../../icons/Minus';
import Plus from '../../icons/Plus';

const ItemCard = ({ ID, name, price_per_carton, price_per_dozen, price_per_unit, img_url, prize, addToCart, initialCount }) => {
    const [priceCategory, setPriceCategory] = useState("price_per_unit");
    const [itemCount, setItemCount] = useState(initialCount || 0);

    const selectHandler = (event) => {
        setPriceCategory(event.target.value);
        // Reset item count when selecting a new price category
        setItemCount(0);
    };

    const getPrice = useCallback(() => {
        switch (priceCategory) {
            case "price_per_unit":
                return { prize: price_per_unit, sold_by: 'Unit' };
            case "price_per_dozen":
                return { prize: price_per_dozen, sold_by: 'Dozen' };
            case "price_per_carton":
                return { prize: price_per_carton, sold_by: 'Carton' };
            default:
                return { prize, sold_by: 'unit' }; // Default case to handle unknown priceCategory
        }
    }, [priceCategory, price_per_carton, price_per_dozen, price_per_unit, prize]);

    const handleAddClick = () => {
        const newCount = itemCount + 1;
        setItemCount(newCount);
        addToCart(ID, name, getPrice(), priceCategory, newCount);
    };

    const handleSubtractClick = () => {
        const newCount = itemCount > 0 ? itemCount - 1 : 0;
        setItemCount(newCount);
        addToCart(ID, name, getPrice(), priceCategory, newCount);
    };

    useEffect(() => {
        addToCart(ID, name, getPrice(), priceCategory, itemCount);
    }, [ID, name, getPrice, priceCategory, itemCount, addToCart]);

    return (
        <div className='item-card-container'>
            <div className='item-card-image-container'>
                <img className='item-card-image' src={img_url} alt={name} />
            </div>
            <div className='item-card-text-container'>
                <div className='item-card-name-container'>
                    <h3 className='item-card-name'>{name}</h3>
                </div>
                <div className='item-card-select-dropdown-and-button-container'>
                    <div className='item-card-select-dropdown-container'>
                        <select onChange={selectHandler} className="item-card-select-dropdown" value={priceCategory}>
                            <option value="price_per_unit">Unit</option>
                            <option value="price_per_dozen">Dozen</option>
                            <option value="price_per_carton">Carton</option>
                        </select>
                    </div>
                    <div className='item-card-select-button-container'>
                        {itemCount === 0 ? (
                            <button className='add-item-count' onClick={handleAddClick}>
                                <Plus />
                            </button>
                        ) : (
                            <>
                                <button className='subtract-item-count' onClick={handleSubtractClick}>
                                    <Minus />
                                </button>
                                <h3 className='display-item-count'>{itemCount}</h3>
                                <button className='add-item-count' onClick={handleAddClick}>
                                    <Plus />
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div className="item-card-price-container">
                    <h3 className="item-card-price">රු {getPrice().prize}</h3>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
