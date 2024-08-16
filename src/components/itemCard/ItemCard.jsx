import React, { useState } from 'react';
import './ItemCard.css';
import Minus from '../../icons/Minus';
import Plus from '../../icons/Plus';

const ItemCard = ({
    _id,                  
    name,
    img_url,  
    price_per_carton,
    price_per_dozen,
    price_per_unit,
    addToCart,
    count,
    _pricePer
}) => {
    const [pricePer, setPricePer] = useState(_pricePer || 'price_per_unit');
    const [itemCount, setItemCount] = useState(count || 0);

    const getPrice = (pricePer) => {
        switch (pricePer) {
            case 'price_per_unit':
                return price_per_unit;
            case 'price_per_dozen':
                return price_per_dozen;
            case 'price_per_carton':
                return price_per_carton;
            default:
                return 0;
        }
    };

    const handleAddClick = () => {
        const newCount = itemCount + 1;
        setItemCount(newCount);
        const price = getPrice(pricePer);
        addToCart(_id, name, newCount, price, pricePer);
    };

    const handlePriceSelect = (e) => {
        const selectedPricePer = e.target.value;
        const price = getPrice(selectedPricePer);
        setPricePer(selectedPricePer);
        addToCart(_id, name, itemCount, price, selectedPricePer);
    };

    const handleSubClick = () => {
        const newCount = Math.max(itemCount - 1, 0);
        setItemCount(newCount);
        const price = getPrice(pricePer);
        addToCart(_id, name, newCount, price, pricePer);
    };

    const handleInputChange = (e) => {
        const newCount = parseInt(e.target.value) || 0;
        setItemCount(newCount);
        const price = getPrice(pricePer);
        addToCart(_id, name, newCount, price, pricePer);
    };

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
                        <select 
                            onChange={handlePriceSelect} 
                            className="item-card-select-dropdown" 
                            value={pricePer}
                        >
                            <option value="price_per_unit">Unit</option>
                            <option value="price_per_dozen">Dozen</option>
                            <option value="price_per_carton">Carton</option>
                        </select>
                    </div>
                    <div className='item-card-select-button-input-container'>
                        {itemCount <= 0 ? (
                            <button className='add-item-count' onClick={handleAddClick}>
                                <Plus />
                            </button>
                        ) : (
                            <>
                                <button className='subtract-item-count' onClick={handleSubClick}>
                                    <Minus />
                                </button>
                                <input 
                                    type="number" 
                                    value={itemCount} 
                                    onChange={handleInputChange} 
                                    className='display-item-count-input' 
                                />
                                <button className='add-item-count' onClick={handleAddClick}>
                                    <Plus />
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div className="item-card-price-container">
                    <h3 className="item-card-price">රු {getPrice(pricePer)}</h3>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
