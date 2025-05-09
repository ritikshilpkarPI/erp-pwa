import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "../pages/About";
import ReceiptsPage from "../components/receiptsPage/ReceiptsPage";
import Ticket from "../components/ticket/Ticket";
import Splash from "../pages/Splash";
import CreateMenuPage from "../components/createMenuPage/CreateMenuPage";
import { TransactionHistory } from "../components/transactionHistory/TransactionHistory";
import SideMenu from "../components/sideMenu/SideMenu";
import AddCustomers from "../pages/AddCustomers";

import PaymentPage from "../components/paymentPage/PaymentPage";
import { AddProductForm } from "../pages/AddProduct";
import { TransactionSuccessful } from "../pages/TransactionSuccessful";
import InvoicePrivate from "../pages/InvoicePrivate";
import Landing from "../pages/Landing";
import AddCategory from "../pages/AddCategory";
import Category from "../pages/Category";
// import PolicyPage from "../components/policyPage/PolicyPage";
import PlaceOrder from "../pages/PlaceOrder";
import Customers from "../pages/Customers";

const protectedRouteMap = Object.freeze({
  "/about": <About />,
  "/receipts": <ReceiptsPage />,
  "/tickets": <Ticket />,
  "/Splash": <Splash />,
  "/cart": <CreateMenuPage />,
  "/history": <TransactionHistory />,
  "/addcustomer": <AddCustomers />,
  "/payment": <PaymentPage />,
  "/addproduct": <AddProductForm />,
  "/transactionSuccessfull": <TransactionSuccessful />,
  "/invoice": <InvoicePrivate />,
  "/landing": <Landing />,
  "/addCategory": <AddCategory />,
  "/category": <Category />,
  // "/privacy-policy":<PolicyPage/>,
  "/placeorder": <PlaceOrder />,
  "/customers": <Customers />,
});

export const ProtectedRoute = () => {
  
  const isLoggedIn = true;

 
  

  return (
    <>
      <SideMenu />
      <Routes>
        {Object.entries(protectedRouteMap).map(([route, component]) => {
          return (
            <Route
              key={route}
              path={route}
              element={isLoggedIn ? component : <></>}
            />
          );
        })}
      </Routes>
    </>
  );
};
