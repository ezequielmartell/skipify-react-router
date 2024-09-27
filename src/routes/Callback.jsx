import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { codeAuth } from '../utils/Utils';


function callback() {
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const queryParameters = new URLSearchParams(window.location.search)
    const code = queryParameters.get("code")
    console.log("Verifying code")
    console.log(code)
    codeAuth(code)
    return <Navigate to="/" state={{ from: location }} replace />
}

export default callback;