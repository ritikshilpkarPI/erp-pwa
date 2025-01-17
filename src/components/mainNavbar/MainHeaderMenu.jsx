import { useState, useEffect, useCallback, useRef } from "react";
import "./MainNav.css";
import SearchIcon from "../../icons/SearchIcon";
import SearchInput from "../../pages/searchInput/SearchInput";
import CloseIcon from "../../icons/CloseIcon";
import { useAppContext } from "../../appState/appStateContext";
import AddIcon from "../../icons/AddIcon";
import { useNavigate } from "react-router-dom";

const MainHeaderMenu = () => {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const debounceRef = useRef(null);

  const debounce = (func, delay) => {
    return (...args) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const API = process.env.REACT_APP_BASE_URL;

  const fetchCategories = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API}/categories`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, [API]);

  const fetchItems = useCallback(
    async (categoryId = null, query = "") => {
      dispatch({ type: "SET_LOADING", payload: true });

      try {

        const url = `${API}/items?category_id=${categoryId || ""
          }&search_query=${query}`;
        const token = localStorage.getItem('token');
        const response = await fetch(url, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`
          },
          credentials: "include"
        });

        if (!response.ok) {
          if (response.status === 404) {
            const data = await response.json();
            if (data.message === "No items found") {
              dispatch({ type: "CLEAR_ITEMS" });
              dispatch({ type: "SET_MESSAGE", payload: "No items found" });
            }
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } else {
          const data = await response.json();
          dispatch({ type: "SET_ITEMS", payload: data });
          dispatch({ type: "SET_MESSAGE", payload: "" });
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        dispatch({ type: "SET_MESSAGE", payload: "Error fetching items" });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    [API, dispatch]
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

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debounce(fetchItems, 400)(null, query);
  };

  const handleSearch = () => {
    setOpenSearchBox(!openSearchBox);
    if (openSearchBox) {
      fetchItems();
    }
  };

  return (
    <div className="main-header-menu">
      {openSearchBox ? (
        <SearchInput
          className="menu-header-search"
          isOpen={openSearchBox}
          onChange={handleSearchInputChange}
          value={searchQuery}
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
      <div className="search-icon-outer search-icon-outer1">
        <AddIcon
          onClick={() => {
            navigate("/addproduct");
          }}
        />
      </div>
    </div>
  );
};

export default MainHeaderMenu;
