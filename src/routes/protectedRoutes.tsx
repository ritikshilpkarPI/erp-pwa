import { Route, Routes } from "react-router-dom";
import About from "../pages/About";
// import CreateCategory from "../components/createCategory/CreateCategory";
import Splash from "../pages/Splash";
const protectedRouteMap = Object.freeze({
  
  "/about": <About />,
  "/Splash":<Splash/>

  // "/create-category":<CreateCategory/>
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