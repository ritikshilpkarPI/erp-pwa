import { Route, Routes } from "react-router-dom";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Splash from "../pages/Splash";
import Signup from "../pages/Signup";

import EmailVerification from "../components/emailVerification/EmailVerification";
import OtpVerification from "../components/otpVerification/OtpVerification";
import ChangePassword from "../components/changePassword/ChangePassword";
import InvoicePublic from "../pages/InvoicePublic";

const unProtectedRouteMap = Object.freeze({
  "/": <Splash />,
  "/login": <Login />,
  "/signup": <Signup />,
  "/contact": <Contact />,
  "/forgotpassword": <EmailVerification />,
  "/otpverification": <OtpVerification />,
  "/emailverification": <EmailVerification />,
  "/changepassword": <ChangePassword />,
  "/invoice-public/:id" :<InvoicePublic/>
})


export const UnProtectedRoute = () => {
  return (
    <>
      <Routes>
        {Object.entries(unProtectedRouteMap)?.map(([route, component]) => {
          return <Route key={route} path={route} element={component} />;
        })}
      </Routes>
    </>
  );
};
