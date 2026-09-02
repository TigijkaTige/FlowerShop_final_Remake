import { useSelector } from "react-redux";
import { Navigate } from "react-router";

//компонент-обертка для компонентов, которые будут доступны только аутентифицированным пользователям
function ProtectedRoute({ children }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (isAuthenticated) {
        return children;
    } else {
        return <Navigate to="/login" replace />;
    }
}

export default ProtectedRoute;
