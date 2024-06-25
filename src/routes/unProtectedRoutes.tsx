import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Login from "../pages/Login";

const unProtectedRouteMap = Object.freeze({
  "/": <Home />,
  "/login": <Login />,
  "/contact": <Contact />,
  // "/splash":<Splash/>
  
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