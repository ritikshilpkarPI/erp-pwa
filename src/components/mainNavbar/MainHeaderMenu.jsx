import React, { useState, useEffect, useCallback } from "react";
import "./MainNav.css";
import SearchIcon from "../../icons/SearchIcon";
import BarCodeIcon from "../../icons/BarCodeIcon";
import ListIcon from "../../icons/ListIcon";
import SearchInput from "../../pages/searchInput/SearchInput";
import CloseIcon from "../../icons/CloseIcon";
import { AppStateContext, useAppContext } from "../../appState/appStateContext";

const MainHeaderMenu = () => {
  const { dispatch, globalState } = useAppContext(AppStateContext);
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const API = `${process.env.REACT_APP_SIGNUP_URL ?? 'http://localhost:8000/api/v1'}`;
  
  const handleSearch = () => {
    setOpenSearchBox(!openSearchBox);
  };

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(
        `${API}/categories`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setOptions(data);

      dispatch({ type: "SET_LOADING" });
    } catch (error) {
      console.error("Error fetching categories:", error);
      dispatch({ type: "SET_LOADING" });
    }
  }, [API, dispatch]);

  const fetchItems = useCallback(
    async (categoryId = null, query = "") => {
      try {
        const url = `${API}/items`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category_id: categoryId,
            search_query: query,
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch({ type: "SET_ITEMS", payload: data });
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    },
    [API, dispatch]
  );

  useEffect(() => {    
      fetchCategories();
      
  }, [fetchCategories]);

  useEffect(() => {
    if (globalState?.items?.length === 0) {
      fetchItems();
    }
  }, [fetchItems, globalState.items]);

  const handleOptionChange = (e) => {
    const categoryId = e.target.value;
    fetchItems(categoryId, searchQuery);
  };

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  const handleSearchInputChange = debounce((e) => {
    const query = e.target.value;
    setSearchQuery(query);
    console.log(query);
    fetchItems(null, query);
  }, 500);

  return (
    <div className="main-header-menu">
      {openSearchBox ? (
        <SearchInput
          className="menu-header-search"
          isOpen={openSearchBox}
          onChange={handleSearchInputChange}
        />
      ) : (
        <select
          className="main-header-menu-select"
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
