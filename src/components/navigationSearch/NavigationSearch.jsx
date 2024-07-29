import React, { useEffect, useState } from 'react';
import './NavigationSearch.css';
import Plus from "../../icons/Plus";
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../appState/appStateContext';

const NavigationSearch = ({ setCategoryList }) => {
  const { globalState } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery === '') {
      setCategoryList(globalState.categories || []);
    } else {
      setCategoryList(
        globalState.categories.filter(category =>
          category.category_name.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, globalState.categories, setCategoryList]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clickHandler = () => {
    navigate('/addCategory');
  };

  return (
    <div className='navigation-search-container'>
      <div className='navigation-search-input-container'>
        <input
          className='navigation-search-input'
          type="search"
          placeholder='Search category'
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className='navigation-search-add-button-container'>
        <button className='navigation-search-add-button' type="button" onClick={clickHandler}>
          <Plus />
        </button>
      </div>
    </div>
  );
};

export default NavigationSearch;
