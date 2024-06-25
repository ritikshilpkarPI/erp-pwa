import { Route, Routes } from "react-router-dom";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Splash from "../pages/Splash";

import PlaceOrder from "../pages/PlaceOrder";
import { AddProductForm } from "../pages/AddProduct";

const unProtectedRouteMap = Object.freeze({
  "/": <Splash />,
  "/login": <Login />,
  "/contact": <Contact />,
  "/placeorder": <PlaceOrder />,
  "/addProduct": <AddProductForm/>
})


export const UnProtectedRoute = () => {
  return <>
    <Routes>
      {
        Object.entries(unProtectedRouteMap)?.map(([route, component]) => {
          return <Route key={route} path={route} element={component} />
        })
      }
    </Routes>
  </>
}