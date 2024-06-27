import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "../pages/About";
import ReceiptsPage from "../components/receiptsPage/ReceiptsPage";
import Ticket from "../components/ticket/Ticket";
import Splash from "../pages/Splash";
import CreateMenuPage from "../components/createMenuPage/CreateMenuPage";
import { TransactionHistory } from "../components/transactionHistory/TransactionHistory";
import AddCustomers from "../pages/AddCustomers";

const protectedRouteMap = Object.freeze({

  "/about": <About />,
  "/receipts": <ReceiptsPage />,
  "/tickets": <Ticket />,
  "/Splash": <Splash />,
  "/cart": <CreateMenuPage />,
  "/history": <TransactionHistory />,
  "/addcustomer":<AddCustomers/>
})


export const ProtectedRoute = () => {
  const isLoggedIn = true;
  return <>
    <Routes>
      {
        Object.entries(protectedRouteMap)?.map(([route, component]) => {
          return <Route key={route} path={route} element={isLoggedIn ? component : <></>} />
        })
      }
    </Routes>
  </>
}