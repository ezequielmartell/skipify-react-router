import { useContext, useEffect } from "react";
import { Context } from '../utils/Context';

import { isResponseOk } from '../utils/Utils';

import Cookies from "universal-cookie"
const cookies = new Cookies();

const url = import.meta.env.VITE_APP_URL


function SkipAnotherArtistComponent() {
  const { newArtist, setNewArtists } = useContext(Context);

    function handleNewArtist(e) {
        setNewArtists(e.target.value);
      }

    function appendArtist() {
        // const { badArtistsArray, setBadArtistsArray } = useContext(Context);
        // e.preventDefault();
        if (!badArtistsArray.includes(newArtist)) {
          fetch(`${url}/api/artists/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": cookies.get("csrftoken"),
            },
            credentials: import.meta.env.PROD ? "same-origin" : "include",
            body: JSON.stringify({ append: newArtist }),
          })
            .then(isResponseOk)
          fetchArtists()
        }
      }

      return (
<div>
        <form onSubmit={()=>appendArtist}>
          <div>
            <label >Start Skipping another artist? </label>
            <input type="text" id="artist" onChange={handleNewArtist} />
            <button type="submit">StartSkipping!</button>
          </div>
        </form>
      </div>
      )

}

export default SkipAnotherArtistComponent;