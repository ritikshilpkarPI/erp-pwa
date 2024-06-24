import { BrowserRouter } from "react-router-dom"
import { ProtectedRoute } from "./protectedRoutes"
import { UnProtectedRoute } from "./unProtectedRoutes"

export const RouteList = () => {
    return <>
        <BrowserRouter>
            <UnProtectedRoute />
            <ProtectedRoute />
        </BrowserRouter>
    </>
}