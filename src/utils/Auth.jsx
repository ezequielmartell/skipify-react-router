import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";

import { isResponseOk } from './Utils';
import { Context } from './Context';

const url = import.meta.env.VITE_APP_URL

export function RequireAuth({ children }) {
    let location = useLocation();
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const { loading, setLoading } = useContext(Context);

    useEffect(() => { getSession() }, [])

    async function getSession() {
        await fetch(`${url}/api/session/`, {
            credentials: import.meta.env.PROD ? "same-origin" : "include",
        })
            .then(isResponseOk)
            .then((data) => {
                setIsAuthenticated(data.isAuthenticated);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err)
            });
    };

    if (loading) {
        // Render a loading state while checking authentication
        return <div>Loading...</div>;
    }
    if (!isAuthenticated) {
        // Redirect them to the /login page, but send 
        // them where they came from after they login.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
