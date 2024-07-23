import React, { useState, useEffect } from 'react';
import './NavigationMenu.css';
import Search from '../../icons/Search';
import SearchClose from '../../icons/SearchClose';
import AddIcon from '../../icons/AddIcon';
import { useAppContext } from '../../appState/appStateContext';

const NavigationMenu = ({ onClick, setItemsList }) => {
    const { globalState } = useAppContext();
    const [categories, setCategories] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [categoryFilteredItems, setCategoryFilteredItems] = useState([]);
    const [fullItemsList, setFullItemsList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        const items = globalState?.items || [];
        setFullItemsList(items);
        setCategoryFilteredItems(items);
        setItemsList(items);
    }, [globalState?.items, setItemsList]);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SIGNUP_URL}/categories`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleSearchClick = () => {
        setIsSearchOpen(prevState => {
            if (prevState) {
                // When closing search, reset to the filtered items based on the current category
                setItemsList(categoryFilteredItems);
            } else {
                // Clear search term when opening search
                setSearchTerm('');
                setItemsList(categoryFilteredItems);
            }
            return !prevState;
        });
    };

    const handleSearchChange = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchTerm(searchValue);

        const filteredItems = (selectedCategory ? categoryFilteredItems : fullItemsList).filter(item =>
            item.name.toLowerCase().startsWith(searchValue)
        );
        setItemsList(filteredItems);
    };

    const handleOptionChange = (event) => {
        const selected = event.target.value.toLowerCase();
        setSelectedCategory(selected);

        if (selected === "") {
            // If "All products" is selected, show all items
            setCategoryFilteredItems(fullItemsList);
            setItemsList(fullItemsList);
        } else {
            // Filter items based on the selected category
            const filteredItems = fullItemsList.filter(item =>
                item.category.toLowerCase() === selected
            );
            setCategoryFilteredItems(filteredItems);
            setItemsList(filteredItems);
        }
    };

    return (
        <div className='navigation-menu-container'>
            <div className='navigation-menu-search-select-container'>
                {isSearchOpen ? (
                    <input
                        className='navigation-menu-search'
                        type="search"
                        placeholder='Search'
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                ) : (
                    <select
                        className="navigation-menu-select"
                        onChange={handleOptionChange}
                        value={selectedCategory}
                    >
                        <option value="">All products</option>
                        {categories.map((option, index) => (
                            <option key={option._id || index} value={option.category_name.toLowerCase()}>
                                {option.category_name}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            <div className='navigation-menu-button-container'>
                <div className='navigation-menu-search-button' onClick={handleSearchClick}>
                    {isSearchOpen ? <SearchClose /> : <Search />}
                </div>
                <div className='navigation-menu-add-button-container' onClick={onClick}>
                    <button className='navigation-menu-add-button'>
                        <AddIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NavigationMenu;
