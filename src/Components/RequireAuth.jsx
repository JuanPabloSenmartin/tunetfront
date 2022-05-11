import {Navigate, useLocation} from "react-router";
import {useTokenManager} from '../tokenManager'

export function RequireAuth({children}) {
    const auth = useTokenManager();
    const token = auth.getToken();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return children;
}