import { useContext, useEffect } from "react";
import { Context } from '../utils/Context';

import { isResponseOk, appendArtist } from '../utils/Utils';
// import { appendArtist } from '../utils/appendArtist';

import Cookies from "universal-cookie"
const cookies = new Cookies();

const url = import.meta.env.VITE_APP_URL


function SkipAnotherArtistComponent() {
  const { newArtist, setNewArtists } = useContext(Context);
  const { badArtistsArray, setBadArtistsArray } = useContext(Context);

  function handleNewArtist(e) {
    setNewArtists(e.target.value);
  }

  return (
    <div>
      <form>
        {/* <form onSubmit={()=>appendArtist}> */}
        <div>
          <label >Start Skipping another artist? </label>
          <input type="text" id="artist" onChange={handleNewArtist} />
          {/* <button type="submit">StartSkipping!</button> */}
          <button onClick={(e) => appendArtist(e, newArtist, badArtistsArray, setBadArtistsArray)}>StartSkipping!</button>

        </div>
      </form>
    </div>
  )

}

export default SkipAnotherArtistComponent;