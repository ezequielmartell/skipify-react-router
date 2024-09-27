import { useContext, useEffect } from "react";
import { Context } from '../utils/Context';

import { removeArtist, fetchArtists } from '../utils/Utils';

function BoycottListComponent() {
    const { badArtistsArray, setBadArtistsArray } = useContext(Context);
    const badArtistsList = (
        badArtistsArray.map((artist, i) =>
            <li key={i}>{artist}
                <button onClick={(e) => removeArtist(e, artist, setBadArtistsArray)}>remove</button>
            </li>));

    useEffect(() => { fetchArtists(setBadArtistsArray) }, [])

    return (
        <div>
            <p>Artists we're boycotting: </p>
            <ul>{badArtistsList}</ul>
        </div>
    )
}

export default BoycottListComponent;