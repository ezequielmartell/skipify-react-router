
import { useEffect, useContext, useState } from "react";

import { isResponseOk, getAccessToken, pollSpotifyPlayer } from '../utils/Utils';
import CurrentArtistComponent from "./componentCurrentArtists";
import { Context } from '../utils/Context';

import Cookies from "universal-cookie"
const cookies = new Cookies();


function PlayerComponent() {
    const { accessToken, setAccessToken } = useContext(Context);
    const [isPlaying, setIsPlaying] = useState(false);
    // const [currentSong, setCurrentSong] = useState('');
    const [currentArtists, setCurrentArtists] = useState(['']);
    const [currentSongName, setCurrentSongName] = useState('');
    const [currentAlbumArt, setCurrentAlbumArt] = useState('');

    // current_artists = [artist.get('name') for artist in currentSong.get('item').get('artists')]

    useEffect(() => { getAccessToken(setAccessToken) }, [])
    // need to loop this next line every 3 sec
    useEffect(() => { pollSpotifyPlayer(accessToken, setCurrentAlbumArt, setCurrentArtists, setCurrentSongName, setIsPlaying) }, [accessToken])
    // console.log(currentArtists)
    return ( isPlaying ?
        <div >
            <img src={currentAlbumArt} alt="album art" />
            <p>Now Playing: {currentSongName}</p>
        <CurrentArtistComponent artists={currentArtists} />
        </div> : <div>Not Playing</div>
    )
}


export default PlayerComponent;