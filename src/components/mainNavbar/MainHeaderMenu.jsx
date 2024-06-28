import { useState, useEffect, useCallback } from "react";
import "./MainNav.css";
import SearchIcon from "../../icons/SearchIcon";
import BarCodeIcon from "../../icons/BarCodeIcon";
import ListIcon from "../../icons/ListIcon";
import SearchInput from "../../pages/searchInput/SearchInput";
import CloseIcon from "../../icons/CloseIcon";
import { AppStateContext, useAppContext } from "../../appState/appStateContext";

const MainHeaderMenu = () => {
  const { dispatch } = useAppContext(AppStateContext);
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    setOpenSearchBox(!openSearchBox);
  };

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SIGNUP_URL}/categories`
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
  }, [dispatch]);

  const fetchItems = useCallback(
    async (categoryId = null, query = "") => {
      try {
        const url = `${process.env.REACT_APP_SIGNUP_URL}/items`;
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
    [dispatch]
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

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
