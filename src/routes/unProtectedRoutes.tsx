import { Route, Routes } from "react-router-dom";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Splash from "../pages/Splash";
import Signup from "../pages/Signup";
import AddCategory from "../pages/AddCategory";
import PlaceOrder from "../pages/PlaceOrder";
import Customers from "../pages/Customers";
import { AddProductForm } from "../pages/AddProduct";

const unProtectedRouteMap = Object.freeze({
  "/": <Splash />,
  "/login": <Login />,
  "/signup": <Signup/>,
  "/contact": <Contact />,
  "/placeorder": <PlaceOrder />,
  "/customers":<Customers />,
  "/addProduct": <AddProductForm/>,
 "/addCategory": <AddCategory/>
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