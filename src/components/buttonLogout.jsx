import { useContext } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import { isResponseOk } from '../utils/Utils';
import { Context } from '../utils/Context';

const url = import.meta.env.VITE_APP_URL

function LogoutComponent() {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    function logout() {
        fetch(`${url}/api/logout`, {
            credentials: import.meta.env.PROD ? "same-origin" : "include",
        })
            .then(isResponseOk)
            .then((data) => {
                console.log(data);
                setIsAuthenticated(false)
                cookies.remove("csrftoken", { path: "/" });
                cookies.remove("sessionid", { path: "/" });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <button onClick={logout}>Logout</button>
    )
}

export default LogoutComponent;