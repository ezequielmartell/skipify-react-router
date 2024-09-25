import { useLocation, Navigate, useNavigate } from "react-router-dom";
// import Cookies from "universal-cookie"
import { useEffect, useContext } from "react";

import { isResponseOk } from './Utils';
import { Context } from './Context';

const url = import.meta.env.VITE_APP_URL
const credentials = import.meta.env.VITE_APP_CREDENTIALS

export function RequireAuth({ children }) {
    let location = useLocation();
    let navigate = useNavigate();
    // let from = location.state?.from?.pathname || "/";
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const { loading, setLoading } = useContext(Context);


    useEffect(() => { getSession() }, [])

    async function getSession() {
        // const { isAuthenticated, setIsAuthenticated } = useContext(Context);
        // console.log("getSession");

        await fetch(`${url}/api/session/`, {
            credentials: "include",
        })
            .then(isResponseOk)
            .then((data) => {
                // console.log(data);
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

    // getSession()

    if (!isAuthenticated) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
    // return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
}
