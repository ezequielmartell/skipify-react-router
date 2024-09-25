import { useEffect, useContext } from "react";
import { useLocation, Navigate, useNavigate, Link } from "react-router-dom";

import Cookies from "universal-cookie"
const cookies = new Cookies();

import { isResponseOk, spotifyAuth } from '../utils/Utils';
import { Context } from '../utils/Context';
import LogoutComponent from '../utils/Logout';
// import { getSession } from '../utils/Auth';


const url = import.meta.env.VITE_APP_URL

function Home() {
  const { boycottState, setBoycottState } = useContext(Context);
  const { badArtistsArray, setBadArtistsArray } = useContext(Context);
  const { newArtist, setNewArtists } = useContext(Context);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  
  let navigate = useNavigate();

  const badArtistsList = badArtistsArray.map(artist => <li>{artist} <button onClick={(e) => removeArtist(e, artist)}>remove</button></li>);

  function handleNewArtist(e) {
    setNewArtists(e.target.value);
  }
  async function fetchArtists() {
    await fetch(`${url}/api/artists/`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      // credentials: "same-origin"
      credentials: "include",
    })
      .then(isResponseOk)
      .then((data) => {
        console.log(data)
        let array = data.artists
        if (array) {
          array.sort()
          setBadArtistsArray(array)
        }
      })
  }

  async function removeArtist(e, item) {
    e.preventDefault();
    await fetch(`${url}/api/artists/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      // credentials: "same-origin"
      credentials: "include",
      body: JSON.stringify({ remove: item }),
    })
      .then(isResponseOk)
    fetchArtists()
  }

  function appendArtist(e) {
    // const { badArtistsArray, setBadArtistsArray } = useContext(Context);
    e.preventDefault();
    if (!badArtistsArray.includes(newArtist)) {
      fetch(`${url}/api/artists/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": cookies.get("csrftoken"),
        },
        // credentials: "same-origin"
        credentials: "include",
        body: JSON.stringify({ append: newArtist }),
      })
        .then(isResponseOk)
      fetchArtists()
    }
  }
  async function getBoycottState() {
    await fetch(`${url}/api/boycott/`, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      // credentials: "same-origin"
      credentials: "include",
    })
      .then(isResponseOk)
      .then((data) => {
        console.log(data);
        setBoycottState(data.boycott)
      });
  }

  function handleBoycott(e, toggle) {
    // const { boycottState, setBoycottState } = useContext(Context);

    fetch(`${url}/api/boycott/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      // credentials: "same-origin"
      credentials: "include",
      body: JSON.stringify({ boycott: toggle }),
    })
      .then(isResponseOk)
      .then((data) => {
        console.log(data);
        setBoycottState(data.boycott)
      });

  }
  function logout() {
    fetch(`${url}/api/logout`, {
      credentials: "include",
    })
      .then(isResponseOk)
      .then((data) => {
        console.log(data);
        setIsAuthenticated(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }


  useEffect(() => { getBoycottState() }, [boycottState])
  useEffect(() => { fetchArtists() }, badArtistsArray)
  return (<div>
    <h1>Spotify Artist Boycotting Service Home</h1>
    <label>
      Service Enabled: {String(boycottState)}&nbsp;
      <button onClick={(e) => handleBoycott(e, !boycottState)}>Toggle</button>
    </label>
    {/* <button onClick={navigate(spotifyAuth())}>Authorize Spotify</button> */}
    <Link to={spotifyAuth()}>Authorize</Link>
    {/* <button onClick={logout}>Log out</button> */}
    <LogoutComponent />
    <div>
      <div>
        <form onSubmit={appendArtist}>
          <div>
            <label htmlFor="username">Start Skipping another artist? </label>
            <input type="text" id="username" onChange={handleNewArtist} />
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div>
        <p>Artists we're boycotting: </p>
        <ul>{badArtistsList}</ul>
      </div>
    </div>
  </div>)
};

export default Home;
