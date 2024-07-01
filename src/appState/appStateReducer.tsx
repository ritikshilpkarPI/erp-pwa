import { decodeJwtToken } from "../utils/getUserFromToken";

export const appGlobalState: any = {
  items: [],
  bills: {},
  cartItems: [],
  customers: [],
  setCustomer: {},
  transactionHistory: [],
  isOpen: false,
  loggedInUser: decodeJwtToken(localStorage.getItem("token")) ?? null,
  isLoggedIn: Boolean(decodeJwtToken(localStorage.getItem("token"))),
  isLoading: false,
  totalCartPrice: 0

};
// import this in every component to access global state
export const appStateReducer = (state: any, action: any) => {
  switch (action.type) {
    case "TOGGLE_DRAWER":
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    case "ADD_ITEM_TO_CART":
      const newCartItems = [...action.payload];
      return { ...state, cartItems: newCartItems };

    case "SET_TRANSACTION_HISTORY":
      const newTransactionHistory = action?.payload ?? []
      return { ...state, transactionHistory: newTransactionHistory };

    case "ADD_ITEM_TO_BILL":
      const newItems = [...state.items];
      newItems.push(action.payload);
      return { ...state, items: newItems };
    case "REMOVE_ITEM_FROM_BILL":
      return { ...state };

    case "SET_ITEMS":
      return {
        ...state,
        items: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        loggedInUser: null,
        isLoggedIn: false,
        isOpen: false,
        cartItems: [],
      };

    case "SET_CUSTOMERS_LIST":
      const newCustomers = action?.payload ?? [];
      return { ...state, customers: newCustomers };

    case "SET_CUSTOMER":
      const newCustomer = action.payload ?? {};
      return { ...state, setCustomer: newCustomer };

    case "SET_USER":
      const loggedInUser =
        decodeJwtToken(localStorage.getItem("token")) ?? null;
      return { ...state, loggedInUser, isLoggedIn: Boolean(loggedInUser) };

    case "SET_TOTAL_CART_PRICE":
      return { ...state, totalCartPrice: action.payload }

    default:
      return state;
  }
};
