import { Navigate } from "react-router-dom";
import * as Token from "../util/Token";

const AdminRoute = ({ children }) => {
    const role = Token.getUserRole();

    if (role === "ADMIN" || role === "STAFF") {
        return children;
    } else {
        return <Navigate to="/error" replace />;
    }
};

export default AdminRoute;
