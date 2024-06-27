import { useState, useEffect } from "react";
import "./MainNav.css";
import SearchIcon from "../../icons/SearchIcon";
import BarCodeIcon from "../../icons/BarCodeIcon";
import ListIcon from "../../icons/ListIcon";
import SearchInput from "../../pages/searchInput/SearchInput";
import CloseIcon from "../../icons/CloseIcon";

const MainHeaderMenu = () => {
  const [openSearchBox, setOpenSeacrhBox] = useState(false);
  const [options, setOptions] = useState([]);
  const [ setSelectedOption] = useState(null);
  const [ setSelectedOptionData] = useState(null);

  const handleSearch = () => {
    setOpenSeacrhBox(!openSearchBox);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/categories");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOptionChange = async (id) => {
    setSelectedOption(id);
    try {
      const response = await fetch(`http://localhost:8000/api/v1/items/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSelectedOptionData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="main-header-menu">
      {openSearchBox ? (
        <SearchInput className="menu-header-search" isOpen={openSearchBox} />
      ) : (
        <select
          className="main-header-menu-select"
          onChange={(e) => handleOptionChange(e.target.value)}
        >
          <option value="">All products</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.category_name}
            </option>
          ))}
        </select>
      )}

      <div className="search-icon-outer">
        <div onClick={handleSearch}>
          {openSearchBox ? <CloseIcon /> : <SearchIcon />}
        </div>
      </div>
      <div className="search-icon-outer">
        <BarCodeIcon />
      </div>
      <div className="search-icon-outer">
        <ListIcon />
      </div>

      {/* {selectedOptionData && (
        <div className="selected-option-data">
          <h2>Selected Option Data</h2>
          <pre>{JSON.stringify(selectedOptionData, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
};

export default MainHeaderMenu;
