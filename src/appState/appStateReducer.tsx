import { decodeJwtToken } from "../utils/getUserFromToken";

export const appGlobalState: any = {
  items: [],
  bills: {},
  cartItems: [],
  customers: [],
  categories: [],
  pricingPerQuantity: "",
  selectedCustomer: {},
  currentTransaction: {},
  transactionHistory: [],
  chequeList: [],
  isOpen: false,
  loggedInUser: decodeJwtToken(localStorage.getItem("token")) ?? null,
  isLoggedIn: Boolean(decodeJwtToken(localStorage.getItem("token"))),
  isLoading: false,
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
      const newTransactionHistory = action?.payload ?? [];
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
    case "CLEAR_ITEMS":
      return { ...state, items: [] };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "LOGOUT":
      localStorage.removeItem("token");
      document.cookie = '';
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

    case "SET_CATEGORIES_LIST":
      const newCategories = action?.payload ?? [];
      return { ...state, categories: newCategories };

    case "SELECTED_CUSTOMER":
      const newCustomer = action.payload ?? {};
      return { ...state, selectedCustomer: newCustomer };

    case "PRICING_PER_QUANTITY":
      const newPricingPerQuantity = action.payload ?? {};
      return { ...state, pricingPerQuantity: newPricingPerQuantity };

    case "CURRENT_TRANSACTION":
      const newTransaction = action.payload ?? {};
      return { ...state, currentTransaction: newTransaction };

    case "SET_USER":
      const loggedInUser =
        decodeJwtToken(localStorage.getItem("token")) ?? null;
      return { ...state, loggedInUser, isLoggedIn: Boolean(loggedInUser) };

    case "UPDATE_CART_ITEMS":
      return {
        ...state,
        cartItems: action.payload,
      };
    case "SET_CHEQUE_LIST":
      const updateChequeList = action.payload ?? {};
      return { ...state, chequeList: updateChequeList };

    case "ADD_CHEQUE_LIST":
      const newChequeList = [...state.chequeList];
      newChequeList.push(action.payload);
      return { ...state, chequeList: newChequeList };



    default:
      return state;
  }
};
