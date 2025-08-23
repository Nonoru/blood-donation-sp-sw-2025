import { Navigate } from "react-router-dom";
import * as Token from "../../../util/Token";

const AdminRoute = ({ children }) => {
    const role = Token.getUserRole();

    if (role === "ADMIN") {
        return children;
    } else {
        return <Navigate to="/admin/for-bidden" replace />;
    }
};

export default AdminRoute;
