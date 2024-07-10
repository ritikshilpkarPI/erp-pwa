import { RiArrowLeftSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "./CustomerScreen.css";
import SearchIcon from "../../icons/SearchIcon";
import { useContext, useEffect, useState } from "react";
import { AppStateContext } from "../../appState/appStateContext";
import { Player } from "@lottiefiles/react-lottie-player";
import noDataAnimation from "../../animation/noDataAnimation.json";

const CustomerScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const { globalState, dispatch } = useContext(AppStateContext);
  const API = `${
    process.env.REACT_APP_SIGNUP_URL ?? "http://localhost:5467/api/v1"
  }/customers`;

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        dispatch({ type: "SET_CUSTOMERS_LIST", payload: res });
      })
      .catch((error) => console.error("Error fetching customer data:", error));
  }, [dispatch, API]);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/placeorder");
  };
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCustomers(globalState.customers);
    } else {
      const filtered = globalState.customers?.filter((customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCustomers(filtered);
    }
  }, [searchQuery, globalState.customers]);
  const selectedCustomerFunction = (customerId) => {
    const selectedCustomer = globalState.customers.find(
      (customer) => customer._id === customerId
    );
    dispatch({ type: "SELECTED_CUSTOMER", payload: selectedCustomer });
    navigate("/placeorder");
  };
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="customer-screen-container">
      <div className="customer-header">
        <div className="customer-header-top">
          <RiArrowLeftSLine
            className="arrow-icon icon"
            onClick={handleBackClick}
          />
          <h1 className="customer-heading">Customer</h1>
        </div>
        <div className="customer-header-bottom">
          <div className="customer-input">
            <input
              className="search-input"
              type="text"
              placeholder="Search for a name, a contact, or an email"
              onChange={handleChange}
            />
            <SearchIcon />
          </div>
        </div>
      </div>
      <div className="customer-content">
        {filteredCustomers?.length > 0 ? (
          filteredCustomers.map((customer) => (
            <div
              key={customer._id}
              className="customer-content-div"
              onClick={() => selectedCustomerFunction(customer._id)}
            >
              <label
                className="customer-content-heading"
                htmlFor={customer._id}
              >
                {customer.name}
              </label>
              <input
                type="radio"
                name="customer"
                id={customer._id}
                value={customer._id}
                checked={globalState.selectedCustomer?._id === customer._id}
              />
            </div>
          ))
        ) : (
          <div className="no-data-animation">
            <Player
              autoplay
              loop
              src={noDataAnimation}
              style={{
                height: "300px",
                width: "300px",
                position: "absolute",
                top: "50%",
                left: "50%",

                transform: "translate(-50%, -50%)",
              }}
            />
            <p>No data</p>
          </div>
        )}
      </div>
      {Boolean(globalState?.customers) && (
        <div
          className="customer-bottom"
          onClick={() => navigate("/addcustomer")}
        >
          <div className="customer-bottom-button">Add a new customer</div>
        </div>
      )}
    </div>
  );
};

export default CustomerScreen;
