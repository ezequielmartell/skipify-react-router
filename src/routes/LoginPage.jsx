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
            <h2>Spotify Artist Boycotting Service</h2>
            <h3>Login</h3>
            <h4>Please log in to continue.</h4>

            <div>
                <form>
                    <div>
                        <label htmlFor="email">Email:&nbsp;</label>
                        <input type="text" id="email" name="email" value={email} onChange={handleEmail} />
                    </div>
                    <div>
                        <label>Password:&nbsp;&nbsp;</label>
                        <input type="password" id="password" name="password" value={password} onChange={handlePassword} />
                        {error &&
                            <div>
                                <small>
                                    {error}
                                </small>
                            </div>
                        }
                    </div>
                    <button onClick={(e) => login(e, email, password, setIsAuthenticated, setEmail, setPassword, setError, from, navigate)}>Login</button>
                    <button onClick={(e) => signup(e, email, password, setIsAuthenticated, setEmail, setPassword, setError, from, navigate)}>SignUp</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
