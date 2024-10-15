
import {  useContext } from "react";
import { appendArtist } from '../utils/Utils';
import { Context } from '../utils/Context';

function CurrentArtistComponent({artists}) {
    const { badArtistsArray, setBadArtistsArray } = useContext(Context);

    const artistsList = (
    artists.map((artist, i) =>
        <li key={i}>{artist.name}
            <button onClick={(e) => appendArtist(e, artist.name, badArtistsArray, setBadArtistsArray)}>Block</button>
        </li>));

  return (
    <div>
      <small>Currently Playing Artists</small>
        <ul>{artistsList}</ul>
    </div>
  );
}

export default CurrentArtistComponent;