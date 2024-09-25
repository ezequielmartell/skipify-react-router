// ComponentTwo.js
import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Context } from '../utils/Context';
import { isResponseOk } from '../utils/Utils';
import Cookies from "universal-cookie"
// import { cookies } from '../utils/Auth';


const url = import.meta.env.VITE_APP_URL
const cookies = new Cookies();

function LoginPage() {
    const { password, setPassword } = useContext(Context);
    const { email, setEmail } = useContext(Context);
    const { error, setError } = useContext(Context);
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function login(e) {
        e.preventDefault();
        fetch(`${url}/api/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "X-CSRFToken": cookies.get("csrftoken"),
            },
            // credentials: "same-origin",
            credentials: "include",
            body: JSON.stringify({ email: email, password: password }),
        })
            // .then((res) => res.json())
            .then(isResponseOk)
            .then((data) => {
                console.log(data);
                setIsAuthenticated(true)
                setEmail('')
                setPassword('')
                // cookies.set("csrftoken", data.csrfToken, { path: "/" });
                setError('')
                // Send them back to the page they tried to visit when they were
                // redirected to the login page. Use { replace: true } so we don't create
                // another entry in the history stack for the login page.  This means that
                // when they get to the protected page and click the back button, they
                // won't end up back on the login page, which is also really nice for the
                // user experience.
                navigate(from, { replace: true });
            })
            .catch((err) => {
                setError(err.toString());
                console.log(err);
            })
    }
    console.log("Login Page")
    return (
        <div>
            <h2>Spotify Artist Boycotting Service</h2>
            <h3>Login</h3>
            <h4>Login Status: {String(isAuthenticated)}. Enter your email and password to login</h4>

            <div className="form-group">
                <form onSubmit={login}>
                    <div>
                        <label htmlFor="email">Email:&nbsp;</label>
                        <input type="text" className="form-control" id="email" name="email" value={email} onChange={handleEmail} />
                    </div>
                    <div>
                        <label htmlFor="username">Password:&nbsp;&nbsp;</label>
                        <input type="password" className="form-control" id="password" name="password" value={password} onChange={handlePassword} />
                        {error &&
                            <div>
                                <small className="text-danger">
                                    {error}
                                </small>
                            </div>
                        }
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <button className="btn btn-danger" onClick={() => window.open("/signup/", '_self')}>Register</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
