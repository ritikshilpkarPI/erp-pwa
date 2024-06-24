import { Route, Routes } from "react-router-dom";
import About from "../pages/About";

const protectedRouteMap = Object.freeze({
  
  "/about": <About />
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