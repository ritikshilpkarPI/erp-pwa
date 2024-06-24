import { Route, Routes } from "react-router-dom";
import About from "../pages/About";
import CreateCategory from "../components/createCategory/CreateCategory";
import ReceiptsPage from "../component/receiptsPage/ReceiptsPage";
import Ticket from "../components/ticket/Ticket";

const protectedRouteMap = Object.freeze({
  
  "/about": <About />,
  "/create-category":<CreateCategory/>,
  "/receipts": <ReceiptsPage/>,
  "/tickets": <Ticket/>
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