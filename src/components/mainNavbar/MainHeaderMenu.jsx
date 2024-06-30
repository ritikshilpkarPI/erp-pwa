import { useState, useEffect, useCallback } from 'react';
import './MainNav.css';
import SearchIcon from '../../icons/SearchIcon';
import BarCodeIcon from '../../icons/BarCodeIcon';
import ListIcon from '../../icons/ListIcon';
import SearchInput from '../../pages/searchInput/SearchInput';
import CloseIcon from '../../icons/CloseIcon';
import {  useAppContext } from '../../appState/appStateContext';

const MainHeaderMenu = () => {
  const { dispatch, globalState } = useAppContext();
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    setOpenSearchBox(!openSearchBox);
  };

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SIGNUP_URL}/categories`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      dispatch({ type: 'SET_LOADING' });
    }
  }, [dispatch]);

  const fetchItems = useCallback(
    async (categoryId = null, query = '') => {
      try {
        const url = `${process.env.REACT_APP_SIGNUP_URL}/items?category_id=${categoryId || ''}&search_query=${query}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        dispatch({ type: 'SET_ITEMS', payload: data });
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (!globalState.items.length) {
      fetchItems();
    }
  }, [fetchItems, globalState.items.length]);

  const handleOptionChange = (e) => {
    const categoryId = e.target.value;
    console.log(categoryId);
    fetchItems(categoryId, searchQuery);
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchItems(null, query);
  };

  return (
    <div className="main-header-menu">
      {openSearchBox ? (
        <SearchInput
          className="menu-header-search"
          isOpen={openSearchBox}
          onChange={handleSearchInputChange}
        />
      ) : (
        <select className="main-header-menu-select" onChange={handleOptionChange}>
          <option value="">All products</option>
          {options.map((option, index) => (
            <option key={option._id || index} value={option._id}>
              {option.category_name}
            </option>
          ))}
        </select>
      )}
      <div className="search-icon-outer" onClick={handleSearch}>
        {openSearchBox ? <CloseIcon /> : <SearchIcon />}
      </div>
      <div className="search-icon-outer">
        <BarCodeIcon />
      </div>
      <div className="search-icon-outer">
        <ListIcon />
      </div>
    </div>
  );
};

export default MainHeaderMenu;
