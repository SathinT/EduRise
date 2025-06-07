import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
        return <Navigate to="/login" />;
    }

    // Check if the user's role is allowed
    if (allowedRoles.includes(user.role)) {
        return children;
    } else {
        return <Navigate to="/" />;
    }
};

export default PrivateRoute;
