import queryString from 'query-string';
import Cookies from "universal-cookie"
const cookies = new Cookies();

const url = import.meta.env.VITE_APP_URL
const fronturl = import.meta.env.VITE_APP_FRONT_URL
const credentials = import.meta.env.VITE_APP_CREDENTIALS

export function isResponseOk(response) {
    // console.log(response)
    if (response.status >= 200 && response.status <= 299) {
        return response.json();
    } else {
        return response.json().then((errorData) => {
            const error = new Error(errorData.message || "An error occurred");
            return Promise.reject(error);
        });
    }
}

export function codeAuth(code) {
    fetch(`${url}/api/callback/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": cookies.get("csrftoken"),
        },
        credentials: credentials,
        body: JSON.stringify({ code: code }),
    }).then(isResponseOk)
        .then((data) => {
            console.log(data);
        });
}

export function spotifyAuth() {
    // var state = generateRandomString(16);
    // res.cookie(stateKey, state);
    // your application requests authorization
    var client_id = import.meta.env.VITE_APP_CLIENT_ID;
    var scope = import.meta.env.VITE_APP_SCOPE;
    var redirect_uri = `${fronturl}/callback`;
    var result = 'https://accounts.spotify.com/authorize?' +
        queryString.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            // state: state
        });
    return result;
};