import React, { useState, useEffect } from 'react';
import './NavigationMenu.css';
import Search from '../../icons/Search';
import SearchClose from '../../icons/SearchClose'
import AddIcon from '../../icons/AddIcon';

const NavigationMenu = ({ onClick, API }) => {
    const [options, setOptions] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SIGNUP_URL}/categories`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setOptions(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSearchClick = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleOptionChange = (event) => {
        // Handle the change event for the select input here
        console.log("Selected category ID:", event.target.value);
    };

    return (
        <div className='navigation-menu-container'>
            <div className='navigation-menu-search-select-container'>
                {isSearchOpen ? (
                        <input className='navigation-menu-search' type="search" placeholder='Search' />
                ) : (
                        <select
                            className="navigation-menu-select"
                            onChange={handleOptionChange}
                        >
                            <option value="">All products</option>
                            {options.map((option, index) => (
                                <option key={option._id || index} value={option._id}>
                                    {option.category_name}
                                </option>
                            ))}
                        </select>
                )}
            </div>
            <div className='navigation-menu-button-container'>
                <div className='navigation-menu-search-button' onClick={handleSearchClick}>
                   
                    {isSearchOpen? (<SearchClose/> ):(<Search />)

                        
                    }
                </div>
                <div className='navigation-menu-add-button-container' onClick={onClick}>
                    <div className='navigation-menu-add-button'>
                        <AddIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavigationMenu;
