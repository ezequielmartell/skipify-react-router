import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Context } from '../utils/Context';
import { signup, login } from '../utils/Utils';

const url = import.meta.env.VITE_APP_URL

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

    return (
        <div>
            <h1>Spotify Artist Boycotting Service</h1>
            <h2>Login</h2>
            <h3>Please log in to continue.</h3>
            <h4>Otherwise, sign up below </h4>
            <form>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="text" name="email" value={email} onChange={handleEmail} />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={handlePassword} />
                </div>

                {error &&
                    <div>
                        <small>
                            {error}
                        </small>
                    </div>
                }
                <div className="button-group">
                    <button onClick={(e) => login(e, email, password, setIsAuthenticated, setEmail, setPassword, setError, from, navigate)}>Login</button>
                    <button onClick={(e) => signup(e, email, password, setIsAuthenticated, setEmail, setPassword, setError, from, navigate)}>SignUp</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;
