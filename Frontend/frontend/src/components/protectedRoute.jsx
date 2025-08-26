import { Navigate } from "react-router-dom";
import  useAuth  from "../auth/useAuth.jsx";

const ProtectedRoute = ({ children,roles }) => {
    const { user } = useAuth();
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    
    if(roles && roles.length > 0 && !roles.includes(user.role)){
        return <Navigate to="/unauthorized" replace />;
    }
    
    return children;
};
export default ProtectedRoute;